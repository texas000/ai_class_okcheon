"use client";

// "use client": 입력, 클릭, 상태 변경처럼 브라우저에서 동작하는 React 화면입니다.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CHAT_CONFIG, STARTER_PROMPTS } from "../lib/chat-config.js";
import { readEventStream } from "../lib/event-stream.js";
import PracticeGuide from "./practice-guide.js";
import { COURSE_SESSIONS } from "../lib/practice-guide.js";
import Icon from "./icon.js";
import RestaurantSources from "./restaurant-sources.js";

export default function Chat({ restaurantSummary, initialSession = null }) {
  // 1. useState는 화면이 기억할 값입니다. 값이 바뀌면 React가 화면을 갱신합니다.
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState(initialSession ? "guide" : "chat");
  const [copiedId, setCopiedId] = useState(null);

  // useRef는 HTML 요소 또는 요청 상태를 기억합니다. 바뀌어도 화면을 다시 그리지 않습니다.
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const requestRef = useRef(null);
  const copyTimerRef = useRef(null);

  // 새 답변이 생기면 마지막 메시지로 스크롤합니다.
  useEffect(() => {
    if (view === "chat" && messages.length > 0)
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, view]);

  useEffect(
    () => () => {
      requestRef.current?.abort();
      clearTimeout(copyTimerRef.current);
    },
    [],
  );

  // 2. 전송 → 우리 서버(/api/chat) → 답변 조각을 받을 때마다 화면 갱신.
  async function sendMessage(text = input) {
    const question = text.trim();
    if (!question || requestRef.current) return;
    if (question.length > CHAT_CONFIG.maxInputLength) {
      setError("질문은 최대 2,000자까지 입력할 수 있어요.");
      return;
    }
    const previousMessages = messages;
    const nextMessages = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: question },
    ];
    const controller = new AbortController();
    const replyId = crypto.randomUUID();
    let reply = "";
    let sourceData = {};
    requestRef.current = controller;
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);
    setView("chat");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // 화면에는 모든 대화를 남기고, AI에는 최근 대화만 전달합니다.
          messages: nextMessages
            // 중단된 답변과 그 질문은 다음 요청의 대화 기록에서 제외합니다.
            .filter((message) => !message.incomplete)
            .slice(-CHAT_CONFIG.maxHistoryMessages)
            .map(({ role, content }) => ({ role, content })),
        }),
        signal: AbortSignal.any([
          controller.signal,
          // 서버의 240초 제한보다 여유를 두어 오류 안내까지 받습니다.
          AbortSignal.timeout(250_000),
        ]),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "답변을 받지 못했어요. 다시 시도해 주세요.",
        );
      }
      if (
        !response.body ||
        !response.headers.get("Content-Type")?.includes("text/event-stream")
      ) {
        throw new Error("스트리밍 답변을 받지 못했어요. 다시 시도해 주세요.");
      }
      let completed = false;
      // for await는 스트림이 도착할 때마다 실행됩니다. 전체 답변을 기다리지 않습니다.
      for await (const event of readEventStream(response.body)) {
        const data = JSON.parse(event);
        if (data.error) throw new Error(data.error);
        // 서버가 먼저 보낸 CSV 참고 자료를 답변과 함께 보관합니다.
        if (Array.isArray(data.sources) && data.sourceInfo) {
          sourceData = { sources: data.sources, sourceInfo: data.sourceInfo };
          continue;
        }
        if (data.done) {
          completed = true;
          break;
        }
        if (typeof data.delta !== "string") continue;
        reply += data.delta;
        setMessages([
          ...nextMessages,
          { id: replyId, role: "assistant", content: reply, ...sourceData },
        ]);
      }
      if (!completed || !reply.trim())
        throw new Error(
          "답변이 끝나기 전에 연결이 끊겼어요. 다시 시도해 주세요.",
        );
    } catch (cause) {
      if (controller.signal.aborted) return;
      // 일부라도 받은 답변은 화면에 남기고 '응답 중단'으로 표시합니다.
      // 실패한 질문은 입력창으로 돌려주므로 전송을 다시 눌러 재시도할 수 있습니다.
      setMessages(
        reply
          ? [
              ...previousMessages,
              { ...nextMessages.at(-1), incomplete: true },
              {
                id: replyId,
                role: "assistant",
                content: reply,
                incomplete: true,
                ...sourceData,
              },
            ]
          : previousMessages,
      );
      setInput(question);
      setError(
        cause.name === "TimeoutError"
          ? "응답이 늦어지고 있어요. 잠시 후 다시 시도해 주세요."
          : cause.message,
      );
    } finally {
      requestRef.current = null;
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function newChat() {
    if (requestRef.current) return;
    setMessages([]);
    setInput("");
    setError("");
    setView("chat");
    inputRef.current?.focus();
  }

  async function copyReply(message) {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(message.id);
      clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setError("복사할 수 없어요. 답변을 직접 선택해서 복사해 주세요.");
    }
  }

  return (
    <div className={`app-shell${view === "guide" ? " guide-mode" : ""}`}>
      <a className="skip-link" href="#main-content">
        본문으로 이동
      </a>
      <aside className="sidebar" aria-label="수업 메뉴">
        <Link className="brand" href="/" aria-label="AI Class 홈">
          <span className="brand-mark">
            <Icon name="sparkles" size={23} />
          </span>
          <span>
            {CHAT_CONFIG.name}
            <small>처음 만나는 AI, 함께 만드는 내일</small>
          </span>
        </Link>
        <button className="new-chat" onClick={newChat} disabled={isLoading}>
          <Icon name="plus" size={18} />새 대화 시작하기
          <span className="shortcut">＋</span>
        </button>
        <div className="nav-label">나의 작업 공간</div>
        <nav className="main-nav">
          <button
            className={view === "chat" ? "nav-item active" : "nav-item"}
            onClick={() => setView("chat")}
            aria-current={view === "chat" ? "page" : undefined}
          >
            <Icon name="chat" />
            AI와 대화하기{view === "chat" && <span className="active-dot" />}
          </button>
          <Link
            href={`/guide/${initialSession || 1}`}
            className={view === "guide" ? "nav-item active" : "nav-item"}
            onClick={() => setView("guide")}
            aria-current={view === "guide" ? "page" : undefined}
          >
            <Icon name="book" />
            실습 가이드<span className="tiny-badge">8회차</span>
          </Link>
        </nav>
        <div className="sidebar-course">
          <div className="course-nav-label">회차별 수업</div>
          <nav className="course-nav" aria-label="회차 선택">
            {COURSE_SESSIONS.map((session) => (
              <Link
                key={session.number}
                href={`/guide/${session.number}`}
                aria-label={`${session.number}회차 ${session.label}`}
                className={`course-link${view === "guide" && initialSession === session.number ? " selected" : ""}`}
                aria-current={view === "guide" && initialSession === session.number ? "page" : undefined}
                onClick={() => setView("guide")}
              >
                <span>{session.number}회차</span>
                <strong>{session.label}</strong>
              </Link>
            ))}
          </nav>
        </div>
        {messages.length > 0 && (
          <div className="session">
            <div className="nav-label">진행 중인 대화</div>
            <button onClick={() => setView("chat")}>
              <Icon name="chat" size={15} />
              <span>{messages[0].content}</span>
            </button>
          </div>
        )}
        <div className="sidebar-bottom">
          <div className="class-note">
            <span className="note-icon">
              <Icon name="bulb" size={20} />
            </span>
            <h3>정답보다, 좋은 질문.</h3>
            <p>
              궁금한 것을 자유롭게 물어보세요.
              <br />
              모든 시작은 작은 질문 하나예요.
            </p>
          </div>
          <a
            className="resource-link"
            href="https://build.nvidia.com/z-ai/glm-5-3-flash"
            target="_blank"
            rel="noreferrer"
          >
            NVIDIA 모델 둘러보기
            <Icon name="external" size={14} />
          </a>
          <div className="profile">
            <span className="profile-avatar">나</span>
            <div>
              <strong>오늘의 메이커</strong>
              <small>AI Class · 실습 공간</small>
            </div>
            <span className="profile-dot" />
          </div>
        </div>
      </aside>

      <main className="main-panel" id="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            AI Class<span>/</span>
            <strong>{view === "chat" ? "AI와 대화하기" : "실습 가이드"}</strong>
          </div>
          <div className="provider-badge">
            <span />
            Powered by NVIDIA
          </div>
        </header>
        {view === "guide" ? (
          <PracticeGuide
            sessionNumber={initialSession || 1}
            restaurantSummary={restaurantSummary}
            isLoading={isLoading}
            onPrompt={sendMessage}
            onChat={() => setView("chat")}
          />
        ) : (
          <>
            <div className="chat-scroll">
              {messages.length === 0 ? (
                <div className="welcome">
                  <div className="welcome-symbol">
                    <Icon name="sparkles" size={37} />
                    <span className="orbit orbit-one" />
                    <span className="orbit orbit-two" />
                  </div>
                  <span className="eyebrow">HELLO, NEW MAKER</span>
                  <h1>{CHAT_CONFIG.greeting}</h1>
                  <p className="welcome-description">
                    {CHAT_CONFIG.description}
                  </p>
                  <div className="dataset-summary">
                    <Icon name="book" size={14} />
                    <span>
                      옥천 업소 {restaurantSummary.total.toLocaleString()}개 ·{" "}
                      {restaurantSummary.dates.join(", ")} 기준
                    </span>
                  </div>
                  <div className="starter-grid">
                    {STARTER_PROMPTS.map((starter) => (
                      <button
                        className="starter-card"
                        key={starter.title}
                        onClick={() => sendMessage(starter.prompt)}
                        disabled={isLoading}
                      >
                        <span className={`starter-icon ${starter.icon}`}>
                          <Icon name={starter.icon} size={21} />
                        </span>
                        <strong>{starter.title}</strong>
                        <span className="starter-description">
                          {starter.description}
                        </span>
                        <Icon name="chevron" className="card-arrow" size={17} />
                      </button>
                    ))}
                  </div>
                  <div className="welcome-tip">
                    <Icon name="bulb" size={15} />
                    <span>잘 모르겠다면, 위의 질문 카드로 시작해 보세요.</span>
                  </div>
                </div>
              ) : (
                <div
                  className="messages"
                  role="log"
                  aria-label="대화 내용"
                  aria-live="polite"
                  aria-relevant="additions"
                  aria-busy={isLoading}
                >
                  {messages.map((message) => (
                    <article
                      className={`message ${message.role}`}
                      key={message.id}
                      aria-label={
                        message.role === "user" ? "나의 질문" : "AI 답변"
                      }
                    >
                      <div className="message-avatar">
                        {message.role === "assistant" ? (
                          <Icon name="sparkles" size={18} />
                        ) : (
                          "나"
                        )}
                      </div>
                      <div className="message-body">
                        <div className="message-author">
                          {message.role === "assistant"
                            ? CHAT_CONFIG.name
                            : "나"}
                          {message.role === "assistant" && (
                            <span>
                              {message.incomplete
                                ? "응답 중단"
                                : isLoading &&
                                    message.id === messages.at(-1)?.id
                                  ? "답변 작성 중"
                                  : "AI 도우미"}
                            </span>
                          )}
                        </div>
                        {message.role === "assistant" ? (
                          <div className="markdown">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ children, href, title }) => (
                                  <a
                                    href={href}
                                    title={title}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {children}
                                  </a>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="user-content">{message.content}</p>
                        )}
                        {message.role === "assistant" && (
                          <RestaurantSources
                            sources={message.sources || []}
                            info={message.sourceInfo}
                          />
                        )}
                        {message.role === "assistant" &&
                          !(
                            isLoading && message.id === messages.at(-1)?.id
                          ) && (
                            <button
                              className="copy-button"
                              onClick={() => copyReply(message)}
                              aria-label="AI 답변 복사"
                            >
                              <Icon
                                name={
                                  copiedId === message.id ? "check" : "copy"
                                }
                                size={14}
                              />
                              {copiedId === message.id
                                ? "복사했어요"
                                : "답변 복사"}
                            </button>
                          )}
                      </div>
                    </article>
                  ))}
                  {isLoading && messages.at(-1)?.role === "user" && (
                    <div className="message assistant">
                      <div className="message-avatar">
                        <Icon name="sparkles" size={18} />
                      </div>
                      <div className="loading-response" role="status">
                        <span className="thinking-dots">
                          <i />
                          <i />
                          <i />
                        </span>
                        생각을 모으고 있어요
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="composer-area">
              {error && (
                <div className="error-notice" role="alert">
                  <strong>잠깐 확인해 주세요</strong>
                  <p>{error}</p>
                </div>
              )}
              {/* 3. form은 질문 입력과 전송을 담당합니다. Enter 전송 / Shift+Enter 줄바꿈. */}
              <form
                className="composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <label className="sr-only" htmlFor="question">
                  AI에게 보낼 질문
                </label>
                <textarea
                  id="question"
                  ref={inputRef}
                  placeholder="옥천읍에는 어떤 식당이 있는지 물어보세요."
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={CHAT_CONFIG.maxInputLength}
                  rows={2}
                  readOnly={isLoading}
                  onKeyDown={(event) => {
                    // 한국어 조합 중 Enter가 눌리면 전송하지 않습니다.
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing &&
                      event.keyCode !== 229
                    ) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <div className="composer-bottom">
                  <span>
                    <Icon name="sparkles" size={14} />
                    {CHAT_CONFIG.subtitle}
                  </span>
                  <div>
                    <span className="character-count">
                      {input.length.toLocaleString()} / 2,000
                    </span>
                    <button
                      className="send-button"
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      aria-label={
                        isLoading ? "AI가 답변 중입니다" : "질문 보내기"
                      }
                    >
                      <Icon name="arrow" size={19} />
                    </button>
                  </div>
                </div>
              </form>
              <div className="composer-footer">
                <span>
                  AI의 답변은 틀릴 수 있어요. 중요한 내용은 한 번 더 확인해
                  주세요.
                </span>
                <span className="keyboard-tip">
                  Enter 전송<span>·</span>Shift + Enter 줄바꿈
                </span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
