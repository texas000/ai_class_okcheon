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
      <text x="97" y="191" textAnchor="middle">여러 분야의 책과 글</text>
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
      {[{word:"오늘",id:"101"},{word:"점심",id:"203"},{word:"으로",id:"87"}].map((token, index) => <g key={token.word}><rect x={44 + index * 115} y="129" width="101" height="46" rx="8" fill={["#e8d3b5", "#dce5d8", "#dce4ed"][index]} /><text x={94 + index * 115} y="158" textAnchor="middle" className="scene-strong">{token.word}</text><text x={94 + index * 115} y="200" textAnchor="middle">번호 {token.id}</text></g>)}
    </>,
    pretrain: <>
      <path d="M35 53Q117 30 207 55Q297 30 385 53V182Q297 159 207 185Q117 159 35 182Z" fill="#fffdf8" stroke="#c6b394" strokeWidth="3" />
      <path d="M207 55v130" stroke="#c6b394" strokeWidth="2" />
      <text x="120" y="91" textAnchor="middle">오늘의 이야기</text>
      <text x="120" y="127" textAnchor="middle" className="scene-strong">오늘 점심으로</text>
      <rect x="229" y="79" width="134" height="72" rx="8" fill="#e6d7bd" />
      <text x="296" y="109" textAnchor="middle">다음 말은?</text>
      <text x="296" y="135" textAnchor="middle" className="scene-strong">___</text>
      <text x="210" y="220" textAnchor="middle">예상한 말과 책 속의 말을 비교해요</text>
    </>,
    feedback: <>
      <path d="M30 45Q115 26 205 48Q295 26 390 45V184Q295 165 205 188Q115 165 30 184Z" fill="#fffdf8" stroke="#c6b394" strokeWidth="3" />
      <path d="M205 48v140" stroke="#c6b394" strokeWidth="2" />
      <text x="210" y="22" textAnchor="middle">선생님과 읽는 좋은 답변 모음</text>
      <text x="119" y="78" textAnchor="middle">부탁: 줄거리를 짧게!</text>
      <path d="M53 105h126m-126 16h126m-126 16h126m-126 16h95" stroke="#d7c8b2" strokeWidth="6" strokeLinecap="round" />
      <text x="119" y="212" textAnchor="middle">너무 길게 쓴 답</text>
      <rect x="224" y="82" width="147" height="70" rx="8" fill="#e0e7da" />
      <text x="297" y="111" textAnchor="middle">친구들이 힘을 모아</text>
      <text x="297" y="134" textAnchor="middle">길 잃은 곰을 도와줘요.</text>
      <text x="297" y="212" textAnchor="middle">부탁에 맞게 짧게 쓴 답 ✓</text>
    </>,
    evaluate: <>
      <rect x="30" y="42" width="140" height="150" rx="9" fill="#759886" />
      <path d="M46 42v150" stroke="#537b68" strokeWidth="4" />
      <text x="107" y="83" textAnchor="middle" fill="white" className="scene-strong">처음 보는 책</text>
      <path d="M73 111h65m-65 17h65m-65 17h45" stroke="#ffffff90" strokeWidth="5" strokeLinecap="round" />
      {arrow}
      <rect x="247" y="45" width="150" height="145" rx="10" fill="#fff" stroke="#d3c9b6" />
      <text x="322" y="75" textAnchor="middle" className="scene-strong">함께 확인해요</text>
      {["내용이 맞나요?", "부탁대로 썼나요?", "모르면 모른다고?"].map((label, index) => <text key={label} x="263" y={108 + index * 29}>{label}</text>)}
      <text x="210" y="225" textAnchor="middle">잘하는 점과 더 연습할 점을 찾아요</text>
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
      <p>책 속 문장: 오늘 점심으로 <strong>김밥을</strong> 먹었어요.</p>
      <div className="prediction-sentence">오늘 점심으로 <span>{guess || "___"}</span></div>
      <div className="prediction-options" aria-label="다음 조각 선택">
        {["김밥을", "도서관을", "달렸어요"].map((word) => <button key={word} aria-pressed={guess === word} onClick={() => setGuess(word)}>{word}</button>)}
      </div>
      <p className="prediction-feedback" role="status">
        {guess ? guess === "김밥을" ? "책에 쓰인 말과 같아요! AI도 다음 말을 예상하고 원래 글과 비교하는 연습을 해요." : "이 책에는 ‘김밥을’이라고 쓰여 있어요. 다른 말도 가능하지만, 이번에는 책에 쓰인 말과 비교해보는 거예요." : "다음 말을 골라 책 속 문장과 비교해보세요."}
      </p>
      <small>이어 쓰기를 이해하기 위한 놀이예요. 버튼을 누른다고 실제 AI가 새로 배우지는 않아요.</small>
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
        <div><span className="journey-kicker">비유로 이해하는 LLM</span><h3>글쓰기 연습생이 배우는 학교</h3><p>도서관에서 책을 고르고, 이어 쓰고, 좋은 답변을 배워요.<br />다섯 장면을 눌러 AI가 어떻게 배우는지 살펴보세요.</p></div>
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
          <span className="journey-kicker">AI는 이렇게 배워요</span><h4>{stage.technical}</h4>
          <p>{stage.detail}</p>{stage.extra && <p>{stage.extra}</p>}
          <div className="journey-glossary"><strong>{stage.term}</strong><p>{stage.definition}</p></div>
          <div className="journey-remember"><Icon name="bulb" size={17} /><p>{stage.remember}</p></div>
          {stage.id === "pretrain" && <PredictionExercise />}
        </div>
      </div>
      <footer className="journey-footer"><span>{selected + 1} / {LLM_JOURNEY.length} 단계</span><div><button disabled={selected === 0} onClick={() => setSelected(selected - 1)}>← 이전</button><button disabled={selected === LLM_JOURNEY.length - 1} onClick={() => setSelected(selected + 1)}>다음 단계 →</button></div></footer>
      <p className="journey-caption">도서관과 연습생은 이해를 돕는 비유예요. AI가 사람처럼 책을 읽고 생각하는 것은 아니에요. 실제로는 컴퓨터가 많은 계산을 하며 배우고, 배우는 방법은 AI마다 다를 수 있어요.</p>
    </div>
  );
}
