"use client";

import { useState } from "react";

export default function LessonWorksheet({ id, title, fields }) {
  const [participantName, setParticipantName] = useState("");
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("");

  function content() {
    return `${title}\n\n작성자\n${participantName || "(작성 전)"}\n\n${fields.map((field) => `${field.label}\n${answers[field.key] || "(작성 전)"}`).join("\n\n")}\n`;
  }

  function download() {
    const url = URL.createObjectURL(new Blob([content()], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${id}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("활동지 파일을 내려받았어요. 브라우저의 다운로드 목록을 확인하세요.");
  }

  function submit(event) {
    event.preventDefault();
    if (!participantName.trim()) {
      setStatus("작성자 이름을 입력해 주세요.");
      return;
    }
    if (!fields.some((field) => answers[field.key]?.trim())) {
      setStatus("활동지 내용을 한 칸 이상 작성해 주세요.");
      return;
    }
    const subject = `[AI 수업 활동지] ${title} - ${participantName.trim()}`;
    const mailto = `mailto:texas000@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content())}`;
    setStatus("기본 메일 앱을 열었어요. 메일 내용을 확인한 뒤 메일 앱에서 보내기를 눌러주세요.");
    window.location.href = mailto;
  }

  return <form className="lesson-worksheet" onSubmit={submit}>
    <div className="worksheet-header"><h3>{title}</h3><button type="button" onClick={download}>활동지 내려받기 ↓</button></div>
    <p>제출 버튼을 누르면 작성 내용이 담긴 새 메일이 열려요. API 키나 비밀번호 같은 비밀 정보는 적지 마세요.</p>
    <label className="worksheet-name" htmlFor={`${id}-participant-name`}><span>작성자 이름</span><input id={`${id}-participant-name`} name="participantName" value={participantName} maxLength={60} autoComplete="name" placeholder="이름을 입력하세요" onChange={(event) => setParticipantName(event.target.value)} /></label>
    <div className="worksheet-fields">{fields.map((field) => <label key={field.key} htmlFor={`${id}-${field.key}`}><span>{field.label}</span><textarea id={`${id}-${field.key}`} value={answers[field.key] || ""} maxLength={2000} placeholder={field.example} rows={3} onChange={(event) => setAnswers((previous) => ({ ...previous, [field.key]: event.target.value }))} /></label>)}</div>
    <div className="worksheet-actions"><button type="submit">메일 앱으로 제출하기 →</button><span>받는 사람: texas000@naver.com · 메일 앱에서 보내기를 한 번 더 눌러야 해요.</span></div>
    <p className="worksheet-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
