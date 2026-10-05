"use client";

import { useState } from "react";
import Icon from "./icon.js";

const THEMES = [
  { name: "따뜻한 주황", accent: "#c56742", hover: "#ad5431", soft: "#f4e9e1" },
  { name: "차분한 초록", accent: "#54765b", hover: "#405d46", soft: "#eaf0e7" },
  { name: "맑은 파랑", accent: "#466f9b", hover: "#345578", soft: "#e9eff6" },
];

// props: 부모가 전달한 표시 정보. state: 이 화면이 기억하는 이름·색상·클릭 횟수입니다.
function Preview({ name, greeting, theme, count, onClick }) {
  return <div className="screen-preview" style={{ "--demo-accent": theme.accent, "--demo-soft": theme.soft }}>
    <div className="preview-top"><Icon name="chat" size={19} /><strong>{name || "나의 챗봇"}</strong><span>화면 체험</span></div>
    <div className="preview-body"><span className="preview-avatar"><Icon name="sparkles" size={23} /></span><h4>{greeting || "어떤 도움이 필요하세요?"}</h4><p>입력한 문구가 props로 전달되면 이 화면이 다시 그려져요.</p><button type="button" onClick={onClick}>전송 버튼 체험 · {count}번 클릭</button><p className="preview-status" role="status">{count ? `state가 ${count}로 바뀌어 버튼과 이 문장이 갱신됐어요.` : "버튼을 누르면 state 변화가 보여요. AI 요청은 보내지 않아요."}</p></div>
  </div>;
}

export default function ScreenPlayground() {
  const [name, setName] = useState("옥천 식당 도우미");
  const [greeting, setGreeting] = useState("옥천의 어떤 식당이 궁금하세요?");
  const [themeIndex, setThemeIndex] = useState(0);
  const [count, setCount] = useState(0);
  const theme = THEMES[themeIndex];
  return <div className="screen-playground">
    <div className="playground-layout"><div className="playground-controls"><span className="eyebrow">나의 화면 실험실</span><h3>입력하고, 눌러보고, 색을 골라요</h3><label htmlFor="demo-name">챗봇 이름<input id="demo-name" maxLength={40} value={name} onChange={(event) => setName(event.target.value)} /></label><label htmlFor="demo-greeting">첫 인사<input id="demo-greeting" maxLength={120} value={greeting} onChange={(event) => setGreeting(event.target.value)} /></label><fieldset><legend>강조 색상</legend><div className="theme-choices">{THEMES.map((item, index) => <button key={item.name} type="button" aria-pressed={index === themeIndex} onClick={() => setThemeIndex(index)}><span style={{ background: item.accent }} />{item.name}</button>)}</div></fieldset><p>이 체험은 실제 앱 파일을 수정하지 않아요. 아래 변경안을 내 GitLab 프로젝트에 적용하면 배포 화면도 바뀝니다.</p></div><Preview name={name} greeting={greeting} theme={theme} count={count} onClick={() => setCount((previous) => previous + 1)} /></div>
    <div className="playground-code"><div><span className="code-file">lib/chat-config.js · 기존 객체 안의 두 항목 수정</span><pre><code>{`name: ${JSON.stringify(name)},\ngreeting: ${JSON.stringify(greeting)},`}</code></pre></div><div><span className="code-file">app/globals.css · 기존 :root 안의 색상 수정</span><pre><code>{`--accent: ${theme.accent};\n--accent-hover: ${theme.hover};\n--accent-soft: ${theme.soft};`}</code></pre></div></div>
    <p className="course-note">다른 기존 설정은 유지해요. 입력한 변경안과 클릭 횟수는 새로고침·회차 이동·채팅 전환 시 초기화돼요. GitLab에 적용할 문구는 먼저 기록하세요.</p>
  </div>;
}
