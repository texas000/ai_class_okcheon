"use client";

import { useState } from "react";

// 활동지는 브라우저에서만 작성합니다. 내려받기 버튼을 누르면 텍스트 파일로 보관할 수 있어요.
// 다른 회차로 이동하거나 새로고침하면 초기화되므로 서버나 계정에 자동 저장된다고 안내하지 마세요.
export default function LessonWorksheet({ id, title, fields }) {
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("");
  function download() {
    const content = `${title}\n\n${fields.map((field) => `${field.label}\n${answers[field.key] || "(작성 전)"}`).join("\n\n")}\n`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${id}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("활동지 파일 내려받기를 요청했어요. 브라우저의 다운로드 목록을 확인하세요.");
  }
  return <div className="lesson-worksheet">
    <div className="worksheet-header"><h3>{title}</h3><button type="button" onClick={download}>활동지 내려받기 ↓</button></div>
    <p>이 화면에서 작성하거나 메모장에 옮겨 적어요. 새로고침·회차 이동·채팅 전환 시 작성 내용이 초기화되므로 먼저 내려받으세요.</p>
    <div className="worksheet-fields">{fields.map((field) => <label key={field.key} htmlFor={`${id}-${field.key}`}><span>{field.label}</span><textarea id={`${id}-${field.key}`} value={answers[field.key] || ""} placeholder={field.example} rows={3} onChange={(event) => setAnswers((previous) => ({ ...previous, [field.key]: event.target.value }))} /></label>)}</div>
    <p className="worksheet-status" role="status">{status}</p>
  </div>;
}
