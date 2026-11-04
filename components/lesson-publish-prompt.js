"use client";

import { useState } from "react";

export default function LessonPublishPrompt({ title, buttonLabel, prompt }) {
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("복사했어요. 내 앱 폴더를 연 AI 코딩 도구에 붙여 넣어 주세요.");
    } catch {
      setStatus("자동 복사가 되지 않아요. 아래 내용을 직접 선택해서 복사해 주세요.");
    }
  }

  return <div className="lesson-code-example publish-prompt">
    <span className="code-file">{title}</span>
    <button className="lesson-action" type="button" onClick={copy}>{buttonLabel}</button>
    <p className="course-note" role="status">{status}</p>
    <pre><code>{prompt}</code></pre>
  </div>;
}
