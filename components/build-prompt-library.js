"use client";

import { useEffect, useState } from "react";

const PROMPTS_URL = "/materials/build-prompts.md";

function parseBuildPrompts(markdown) {
  const prompts = [];
  const pattern = /^## (\d+)\. (.+?)\r?\n[\s\S]*?```text\r?\n([\s\S]*?)\r?\n```/gm;
  let match;

  while ((match = pattern.exec(markdown)) !== null) {
    prompts.push({
      number: Number(match[1]),
      title: match[2].trim(),
      prompt: match[3].trim(),
    });
  }

  return prompts;
}

export default function BuildPromptLibrary({ promptsUrl = PROMPTS_URL, sourceLabel = "build-prompts.md 원본 전체 보기 ↗" }) {
  const [prompts, setPrompts] = useState([]);
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPrompts() {
      try {
        const response = await fetch(promptsUrl);
        if (!response.ok) throw new Error("프롬프트 파일을 불러오지 못했습니다.");
        const items = parseBuildPrompts(await response.text());
        if (items.length === 0) throw new Error("앱별 프롬프트를 찾지 못했습니다.");
        if (!cancelled) setPrompts(items);
      } catch {
        if (!cancelled) setError("프롬프트를 불러오지 못했어요. 아래 원본 자료 링크를 열어주세요.");
      }
    }

    loadPrompts();
    return () => { cancelled = true; };
  }, [promptsUrl]);

  async function copyPrompt(item) {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopiedNumber(item.number);
      window.setTimeout(() => setCopiedNumber(null), 2000);
    } catch {
      setError("자동 복사가 되지 않아요. 프롬프트를 직접 선택해 복사해 주세요.");
    }
  }

  return <div className="build-prompt-library">
    {prompts.length === 0 && !error && <p className="course-note">앱별 프롬프트를 불러오는 중이에요…</p>}
    {error && <p className="course-note" role="status">{error}</p>}
    {prompts.map((item) => (
      <details className="build-prompt-item" key={item.number}>
        <summary><span>{item.number}</span><strong>{item.title}</strong><small>열어서 복사하기</small></summary>
        <div className="build-prompt-body">
          <button className="lesson-action" type="button" onClick={() => copyPrompt(item)}>
            {copiedNumber === item.number ? "복사했어요 ✓" : "프롬프트 전체 복사"}
          </button>
          <pre><code>{item.prompt}</code></pre>
        </div>
      </details>
    ))}
    <p><a href={promptsUrl} target="_blank" rel="noreferrer">{sourceLabel}</a></p>
  </div>;
}
