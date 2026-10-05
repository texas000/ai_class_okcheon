import {
  AI_OPTIONS,
  DEFAULT_MODEL,
  MODEL_OPTIONS,
  SYSTEM_PROMPT,
} from "../../../lib/ai-config.js";
import { CHAT_CONFIG } from "../../../lib/chat-config.js";
import { readEventStream } from "../../../lib/event-stream.js";
import {
  loadRestaurants,
  restaurantContext,
  searchRestaurants,
} from "../../../lib/restaurants.js";

// 이 파일은 서버에서 실행됩니다. 브라우저에는 API 키가 전달되지 않습니다.
export const runtime = "nodejs";
// 긴 스트리밍 답변도 받을 수 있도록 Vercel 함수는 최대 300초까지 실행합니다.
// NVIDIA 요청은 240초에 종료합니다. Vercel의 기본 Fluid compute를 사용하세요.
export const maxDuration = 300;

function error(message, status) {
  return Response.json({ error: message }, { status });
}

export async function POST(request) {
  // 1. 브라우저가 보낸 JSON(데이터를 주고받는 형식)을 읽습니다.
  let body;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 100_000) {
      return error("대화가 너무 깁니다. 새 대화를 시작해 주세요.", 413);
    }
    body = JSON.parse(raw);
  } catch {
    return error("질문 형식이 올바르지 않습니다.", 400);
  }

  // 2. 잘못된 요청을 검사합니다. 사용자는 system 역할을 보낼 수 없습니다.
  const messages = body?.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > CHAT_CONFIG.maxHistoryMessages
  ) {
    return error("대화는 1~20개의 메시지로 보내 주세요.", 400);
  }
  const invalid = messages.some(
    (message) =>
      !message ||
      !["user", "assistant"].includes(message.role) ||
      typeof message.content !== "string" ||
      !message.content.trim() ||
      message.content.length >
        (message.role === "user" ? CHAT_CONFIG.maxInputLength : 12_000),
  );
  if (invalid || messages.at(-1).role !== "user") {
    return error(
      "질문을 확인해 주세요. 질문은 최대 2,000자까지 입력할 수 있습니다.",
      400,
    );
  }

  // 3. 서버의 환경변수에서 키를 읽습니다. .env.local 또는 Vercel에 설정하세요.
  const apiKey = process.env.NVIDIA_API_KEY?.trim();
  if (!apiKey || apiKey === "여기에_NVIDIA_API_키를_입력하세요") {
    return error(
      "NVIDIA API 키가 설정되지 않았습니다. .env.local 또는 Vercel 환경변수에 NVIDIA_API_KEY를 추가해 주세요.",
      503,
    );
  }

  // 4. CSV에서 질문에 관련된 업소를 검색합니다. 일반 AI 질문에는 자료를 추가하지 않습니다.
  let restaurantResult;
  try {
    restaurantResult = searchRestaurants(await loadRestaurants(), messages);
  } catch {
    return error(
      "옥천 식당 CSV를 읽지 못했습니다. 파일 위치, UTF-8 인코딩과 필수 컬럼을 확인해 주세요.",
      503,
    );
  }
  const upstreamAbort = new AbortController();
  const model = process.env.NVIDIA_MODEL?.trim() || DEFAULT_MODEL;
  try {
    // 5. 서버가 NVIDIA에 요청합니다. fetch는 다른 서버와 통신하는 함수입니다.
    // stream: true로 설정하면 생성된 답변 조각이 즉시 도착합니다.
    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT + restaurantContext(restaurantResult),
            },
            ...messages.map(({ role, content }) => ({ role, content })),
          ],
          ...AI_OPTIONS,
          ...MODEL_OPTIONS[model],
          stream: true,
        }),
        signal: AbortSignal.any([
          AbortSignal.timeout(240_000),
          request.signal,
          upstreamAbort.signal,
        ]),
        cache: "no-store",
      },
    );

    // NVIDIA 오류 원문 대신 초보자도 이해할 수 있는 안내만 반환합니다.
    if (!response.ok) {
      if ([401, 403].includes(response.status))
        return error("NVIDIA API 키 또는 모델 접근 권한을 확인해 주세요.", 502);
      if (response.status === 429)
        return error(
          "요청이 많거나 NVIDIA 사용 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.",
          429,
        );
      if ([400, 404].includes(response.status))
        return error(
          "NVIDIA_MODEL 값과 해당 모델의 API 지원 여부를 확인해 주세요.",
          502,
        );
      return error(
        "NVIDIA 서버에서 답변을 받지 못했습니다. 잠시 후 다시 시도해 주세요.",
        502,
      );
    }

    if (
      !response.body ||
      !response.headers.get("Content-Type")?.includes("text/event-stream")
    ) {
      return error(
        "AI 스트림을 읽지 못했습니다. 모델의 스트리밍 지원 여부를 확인해 주세요.",
        502,
      );
    }

    // 6. 검색 출처를 먼저 보내고 NVIDIA의 delta.content(새 답변 조각)를 전달합니다.
    // reasoning_content 등 모델의 내부 추론과 다른 메타데이터는 전달하지 않습니다.
    const encoder = new TextEncoder();
    let cancelled = false;
    const stream = new ReadableStream({
      async start(controller) {
        let reply = "";
        const send = (data) => {
          if (!cancelled)
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
            );
        };
        try {
          if (restaurantResult)
            send({
              sources: restaurantResult.sources,
              sourceInfo: restaurantResult.info,
            });
          for await (const event of readEventStream(response.body)) {
            if (event === "[DONE]") {
              if (!reply.trim()) throw new Error("empty reply");
              send({ done: true });
              return;
            }
            const data = JSON.parse(event);
            if (data.error) throw new Error("upstream error");
            const delta = data?.choices?.[0]?.delta?.content;
            if (delta === undefined || delta === null || delta === "") continue;
            if (
              typeof delta !== "string" ||
              reply.length + delta.length > 12_000
            ) {
              throw new Error("invalid reply");
            }
            reply += delta;
            send({ delta });
          }
          // 완료 신호 없이 연결이 끊기면 정상 답변으로 취급하지 않습니다.
          throw new Error("incomplete stream");
        } catch (cause) {
          send({
            error:
              cause?.name === "TimeoutError" || cause?.name === "AbortError"
                ? "응답 시간이 길어졌습니다. 질문을 짧게 하거나 잠시 후 다시 시도해 주세요."
                : "AI 답변이 중단되었습니다. 잠시 후 다시 시도해 주세요.",
          });
        } finally {
          if (!cancelled) controller.close();
        }
      },
      // 사용자가 페이지를 닫으면 NVIDIA 요청도 함께 중단합니다.
      cancel() {
        cancelled = true;
        upstreamAbort.abort();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (cause) {
    if (cause?.name === "TimeoutError" || cause?.name === "AbortError") {
      return error(
        "응답 시간이 길어졌습니다. 질문을 짧게 하거나 잠시 후 다시 시도해 주세요.",
        504,
      );
    }
    return error(
      "AI 연결에 실패했습니다. 네트워크 상태를 확인하고 다시 시도해 주세요.",
      502,
    );
  }
}
