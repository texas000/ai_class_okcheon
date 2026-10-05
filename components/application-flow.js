"use client";

import { useState } from "react";
import { APPLICATION_FLOW } from "../lib/lesson-plans.js";
import Icon from "./icon.js";

export default function ApplicationFlow() {
  const [index, setIndex] = useState(0);
  const step = APPLICATION_FLOW[index];
  return <div className="application-flow">
    <div className="app-flow-intro"><span className="eyebrow">질문 한 번의 여행</span><h3>“풍미당 주소 알려줘”가 답변이 되기까지</h3><p>단계를 눌러 누가 어떤 일을 하는지 살펴보세요. 실제 요청을 보내지 않는 설명용 모형이에요.</p></div>
    <nav className="app-flow-nav" aria-label="애플리케이션 동작 단계">{APPLICATION_FLOW.map((item, position) => <button key={item.label} type="button" aria-pressed={position === index} aria-controls="app-flow-detail" onClick={() => setIndex(position)}><span><Icon name={item.icon} size={22} /></span><small>0{position + 1}</small><strong>{item.label}</strong></button>)}</nav>
    <div id="app-flow-detail" className="app-flow-detail" aria-live="polite">
      <div className="app-flow-scene"><span className="flow-place">{step.place}</span><div className="flow-symbol"><Icon name={step.icon} size={48} /></div><div className="app-flow-io"><span>들어오는 것</span><strong>{step.input}</strong><span className="flow-down" aria-hidden="true">↓</span><span>나가는 것</span><strong>{step.output}</strong></div></div>
      <div className="app-flow-explanation"><span className="eyebrow">STEP 0{index + 1}</span><h4>{step.title}</h4><p>{step.text}</p><aside>{step.note}</aside><span className="flow-file">나중에 살펴볼 파일 · <code>{step.file}</code></span></div>
    </div>
    <div className="app-flow-footer"><span>{index + 1} / {APPLICATION_FLOW.length} 단계</span><div><button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>← 이전 단계</button><button type="button" disabled={index === APPLICATION_FLOW.length - 1} onClick={() => setIndex(index + 1)}>다음 단계 →</button></div></div>
  </div>;
}
