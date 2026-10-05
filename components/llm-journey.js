"use client";

import { useState } from "react";
import { LLM_JOURNEY } from "../lib/llm-journey.js";
import Icon from "./icon.js";

// 외부 이미지 없이 SVG로 그립니다. 색상·도형은 여기에서 수정할 수 있어요.
function StageIllustration({ stage }) {
  const arrow = <path d="M195 106h28m-7-6 7 6-7 6" fill="none" stroke="#aa977e" strokeWidth="2" />;
  const drawing = {
    data: <>
      <rect x="25" y="40" width="143" height="132" rx="10" fill="#e4d7bd" />
      {[0, 1, 2, 3, 4].map((book) => <g key={book}><rect x={37 + book * 24} y={65 + book % 2 * 10} width="18" height={80 - book % 2 * 10} rx="3" fill={["#b46545", "#759886", "#d3ac66", "#708ca4", "#c08b78"][book]} /><path d={`M${42 + book * 24} 90h8`} stroke="#ffffff90" strokeWidth="2" /></g>)}
      <path d="M32 150h129" stroke="#aa9472" strokeWidth="5" />
      <text x="97" y="191" textAnchor="middle">문서 · 코드 · 책</text>
      {arrow}
      <rect x="247" y="49" width="130" height="113" rx="10" fill="#fff" stroke="#d2cdbf" />
      <path d="M267 72h69m-69 17h87m-87 17h49" stroke="#ded9cd" strokeWidth="5" strokeLinecap="round" />
      <circle cx="346" cy="145" r="24" fill="#789b7e" /><path d="m335 145 7 7 14-15" fill="none" stroke="white" strokeWidth="3" />
      <text x="310" y="191" textAnchor="middle">고르고 정리하기</text>
    </>,
    tokens: <>
      <rect x="31" y="25" width="358" height="52" rx="10" fill="#fff" stroke="#d9cfbd" />
      <text x="210" y="57" textAnchor="middle" className="scene-strong">오늘 점심으로</text>
      <path d="M210 88v25m-6-6 6 6 6-6" fill="none" stroke="#aa977e" strokeWidth="2" />
      {[{word:"오늘",id:"101"},{word:"점심",id:"203"},{word:"으로",id:"87"}].map((token, index) => <g key={token.word}><rect x={44 + index * 115} y="129" width="101" height="46" rx="8" fill={["#e8d3b5", "#dce5d8", "#dce4ed"][index]} /><text x={94 + index * 115} y="158" textAnchor="middle" className="scene-strong">{token.word}</text><text x={94 + index * 115} y="200" textAnchor="middle">ID {token.id}</text></g>)}
    </>,
    pretrain: <>
      {[55, 105, 155].flatMap((y) => [65, 115, 165].map((next) => <path key={`${y}-${next}`} d={`M105 ${y} 198 ${next}`} stroke="#c5bca9" />))}
      {[65, 115, 165].map((y) => <path key={y} d={`M212 ${y} 302 105`} stroke="#b89370" strokeWidth="2" />)}
      {[55, 105, 155].map((y) => <circle key={y} cx="97" cy={y} r="12" fill="#d7b893" stroke="#b99870" />)}
      {[65, 115, 165].map((y) => <circle key={y} cx="205" cy={y} r="13" fill="#b6c7b0" stroke="#819477" />)}
      <circle cx="313" cy="105" r="17" fill="#bb7050" />
      <text x="97" y="193" textAnchor="middle">문맥</text><text x="205" y="205" textAnchor="middle">모델의 계산</text><text x="325" y="157" textAnchor="middle">다음 토큰</text>
      <path d="M315 34Q206-8 97 29m4-7-4 7 8 2" fill="none" stroke="#aa977e" strokeWidth="2" strokeDasharray="5 5" /><text x="212" y="22" textAnchor="middle" fontSize="11">오차를 줄이도록 가중치 조정</text>
    </>,
    feedback: <>
      <rect x="31" y="33" width="350" height="62" rx="12" fill="#efe3d5" />
      <text x="52" y="58" fontSize="11">질문</text><text x="52" y="80" className="scene-strong">이 가게는 몇 시까지 열어요?</text>
      <rect x="50" y="110" width="318" height="77" rx="12" fill="#fff" stroke="#a6b69b" />
      <text x="68" y="137" fontSize="11">더 도움이 되는 답변 예시</text><text x="68" y="161">자료에 없어 직접 확인이 필요해요.</text>
      <circle cx="356" cy="179" r="21" fill="#789b7e" /><path d="m346 179 7 7 13-14" fill="none" stroke="white" strokeWidth="3" />
    </>,
    evaluate: <>
      <rect x="82" y="24" width="247" height="180" rx="12" fill="#fff" stroke="#d3c9b6" />
      <rect x="158" y="16" width="94" height="23" rx="6" fill="#b8a789" />
      {["새로운 질문", "지시를 잘 따르나요?", "틀린 내용은 없나요?"].map((label, index) => <g key={label}><rect x="105" y={60 + index * 46} width="22" height="22" rx="5" fill={index === 2 ? "#ecd9bf" : "#e0e7da"} /><text x="116" y={76 + index * 46} textAnchor="middle">{index === 2 ? "?" : "✓"}</text><text x="142" y={76 + index * 46}>{label}</text></g>)}
      <text x="207" y="228" textAnchor="middle" fontSize="11">확인 → 부족한 부분 개선 → 다시 확인</text>
    </>,
    serve: <>
      <rect x="20" y="65" width="104" height="88" rx="10" fill="#fff" stroke="#d1c9b9" /><rect x="34" y="79" width="76" height="48" rx="5" fill="#e1e8dd" /><text x="72" y="108" textAnchor="middle">내 앱</text><path d="M50 140h44" stroke="#d1c9b9" strokeWidth="3" />
      <path d="M131 103h22m-6-6 6 6-6 6" fill="none" stroke="#aa977e" strokeWidth="2" />
      <rect x="164" y="54" width="120" height="108" rx="14" fill="#bb7050" /><text x="224" y="94" textAnchor="middle" fill="white">학습된 모델</text><text x="224" y="124" textAnchor="middle" fill="white">NVIDIA API</text>
      <path d="M291 103h22m-6-6 6 6-6 6" fill="none" stroke="#aa977e" strokeWidth="2" />
      <rect x="322" y="66" width="77" height="86" rx="10" fill="#e0e7da" /><text x="360" y="108" textAnchor="middle">답변</text>
      <text x="211" y="192" textAnchor="middle">질문과 CSV 자료를 보내면</text><text x="211" y="212" textAnchor="middle">답변이 토큰 단위로 생성돼요</text>
    </>,
  };
  return <svg className="journey-illustration" viewBox="0 0 420 240" role="img" aria-label={`${stage.label} 비유 그림`}><title>{stage.title}</title>{drawing[stage.id]}</svg>;
}

// 실제 모델을 호출하지 않는 체험입니다. 원래 예문의 다음 조각과 선택을 비교해요.
function PredictionExercise() {
  const [guess, setGuess] = useState(null);
  return (
    <div className="prediction-exercise">
      <span className="journey-kicker">작은 이어쓰기 체험</span>
      <p>훈련 예문: 오늘 점심으로 <strong>김밥을</strong> 먹었어요.</p>
      <div className="prediction-sentence">오늘 점심으로 <span>{guess || "___"}</span></div>
      <div className="prediction-options" aria-label="다음 조각 선택">
        {["김밥을", "도서관을", "달렸어요"].map((word) => <button key={word} aria-pressed={guess === word} onClick={() => setGuess(word)}>{word}</button>)}
      </div>
      <p className="prediction-feedback" role="status">
        {guess ? guess === "김밥을" ? "예문의 다음 조각과 같아요! 실제 학습에서는 정답 토큰에 준 확률을 바탕으로 오차를 계산해요." : "원래 예문의 다음 조각은 ‘김밥을’이에요. 모델은 이런 비교로 계산한 오차를 줄이도록 가중치를 조정해요." : "다음 조각을 골라 예문과 비교해보세요."}
      </p>
      <small>단어 단위로 단순화한 체험이에요. 실제 토큰화와 모델 학습을 실행하는 것은 아니에요.</small>
    </div>
  );
}

export default function LlmJourney() {
  // 단계를 클릭하면 같은 자리에 해당 비유 그림과 상세 설명을 보여줍니다.
  const [selected, setSelected] = useState(0);
  const stage = LLM_JOURNEY[selected];
  return (
    <div className="llm-journey">
      <header className="journey-intro">
        <div className="journey-emblem"><Icon name="pen" size={25} /></div>
        <div><span className="journey-kicker">비유로 이해하는 LLM</span><h3>글쓰기 연습생이 배우는 학교</h3><p>교재를 고르고, 이어 쓰기를 연습하고, 피드백을 받아요.<br />아래 단계를 눌러 비유와 실제 기술을 함께 살펴보세요.</p></div>
      </header>
      <nav className="journey-stages" aria-label="LLM 제작 단계 선택">
        {LLM_JOURNEY.map((item, index) => (
          <button key={item.id} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-controls="journey-detail">
            <span className="journey-node"><Icon name={item.icon} size={21} /></span>
            <span className="journey-stage-index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </nav>
      <div className="journey-detail" id="journey-detail">
        <div className="journey-scene">
          <span className="journey-scene-tag">{stage.tag}</span>
          <StageIllustration stage={stage} />
          <h4>{stage.title}</h4><p>{stage.analogy}</p>
          <div className="journey-flow"><div><span>들어오는 것</span><strong>{stage.input}</strong></div><Icon name="chevron" size={16} /><div><span>나오는 것</span><strong>{stage.output}</strong></div></div>
        </div>
        <div className="journey-explanation">
          <span className="journey-kicker">실제 모델에서는</span><h4>{stage.technical}</h4>
          <p>{stage.detail}</p>{stage.extra && <p>{stage.extra}</p>}
          <div className="journey-glossary"><strong>{stage.term}</strong><p>{stage.definition}</p></div>
          <div className="journey-remember"><Icon name="bulb" size={17} /><p>{stage.remember}</p></div>
          {stage.id === "pretrain" && <PredictionExercise />}
        </div>
      </div>
      <footer className="journey-footer"><span>{selected + 1} / {LLM_JOURNEY.length} 단계</span><div><button disabled={selected === 0} onClick={() => setSelected(selected - 1)}>← 이전</button><button disabled={selected === LLM_JOURNEY.length - 1} onClick={() => setSelected(selected + 1)}>다음 단계 →</button></div></footer>
      <p className="journey-caption">‘학교’는 학습 과정을 설명하기 위한 비유예요. 모델은 사람이 아니라 숫자를 계산하는 프로그램이며, 이 흐름은 생성형 대화 모델의 대표적인 예시예요.</p>
    </div>
  );
}
