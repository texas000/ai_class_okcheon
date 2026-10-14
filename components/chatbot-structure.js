"use client";

import { useState } from "react";

const STEPS = [
  { icon: "💬", title: "질문 입력", place: "내 브라우저", detail: "‘풍미당 주소 알려줘’라고 입력해요. 화면이 질문과 이전 대화를 우리 서버에 보내요.", input: "풍미당 주소 알려줘", output: "우리 서버에 보낼 대화 메시지" },
  { icon: "🔎", title: "식당 검색", place: "우리 서버 + CSV", detail: "우리 서버의 검색 코드가 옥천 식당 CSV에서 이름·지역·업태 등 질문에 맞는 행을 찾아요. 이 단계는 LLM을 부르기 전에 실행돼요.", input: "질문 + 옥천 식당 CSV", output: "풍미당 행의 주소·영업 상태·갱신 시점 등" },
  { icon: "📋", title: "참고 자료 묶기", place: "우리 서버", detail: "검색한 행과 검색 건수를 글로 정리해요. 질문, 이전 대화, ‘자료에 없는 내용은 추측하지 마’ 같은 규칙과 함께 모델에 보낼 준비를 해요.", input: "검색 결과 + 질문 + 대화 + 규칙", output: "LLM이 이번에 읽을 context(문맥·참고 자료)" },
  { icon: "✨", title: "LLM 답변 생성", place: "NVIDIA API", detail: "이미 학습된 LLM이 전달받은 질문과 참고 자료를 읽고 답변 문장을 만들어요. 모델이 직접 우리 CSV를 열거나 인터넷에서 식당을 찾는 구조는 아니에요.", input: "질문·대화 + 답변 규칙 + 식당 context", output: "차례로 생성되는 답변 조각" },
  { icon: "🖥️", title: "답변과 근거 표시", place: "서버 → 내 브라우저", detail: "우리 서버가 답변 조각을 중계하고 화면이 이어 붙여요. 참고한 CSV 자료는 서버가 검색한 결과로 따로 제공하므로, 답변의 주소와 원본을 비교할 수 있어요.", input: "LLM 답변 조각 + 서버의 검색 자료", output: "답변과 ‘참고한 CSV 자료’" },
];

export default function ChatbotStructure() {
  const [selected, setSelected] = useState(0);
  const step = STEPS[selected];
  return <div className="chatbot-structure">
    <header><span className="eyebrow">질문 한 번의 여행</span><h3>“풍미당 주소 알려줘”를 보내면?</h3><p>아래 그림을 왼쪽부터 따라가요. 각 단계를 누르면 그곳에서 하는 일을 볼 수 있어요.</p></header>
    <ol className="chatbot-flow" aria-label="질문에서 답변까지 다섯 단계">
      {STEPS.map((item, index) => <li key={item.title}>
        <button type="button" aria-pressed={selected === index} aria-controls="chatbot-step-detail" onClick={() => setSelected(index)}>
          <span className="chatbot-flow-icon" aria-hidden="true">{item.icon}</span>
          <small>{String(index + 1).padStart(2, "0")} · {item.place}</small><strong>{item.title}</strong>
        </button>
        {index < STEPS.length - 1 && <span className="chatbot-flow-arrow" aria-hidden="true">→</span>}
      </li>)}
    </ol>
    <div className="chatbot-step-detail" id="chatbot-step-detail" aria-live="polite">
      <h4>{selected + 1}. {step.title}</h4><p>{step.detail}</p>
      <dl><div><dt>들어오는 것</dt><dd>{step.input}</dd></div><div><dt>나가는 것</dt><dd>{step.output}</dd></div></dl>
    </div>
    <div className="chatbot-context">
      <div><span className="eyebrow">LLM에게 보내는 묶음 · 설명용 축약</span><h4>질문만 보내지 않고 근거도 함께 보내요</h4><p>context는 모델이 이번 답변을 만들 때 참고하는 문맥이에요. 이 앱은 검색한 식당 정보를 답변 규칙에 붙이고, 질문과 이전 대화도 함께 보내요.</p></div>
      <div className="chatbot-context-packet">
        <p><strong>답변 규칙</strong><span>CSV를 근거로 답하고, 없는 정보는 추측하지 마.</span></p>
        <p><strong>식당 참고 자료</strong><span>사업장명: 풍미당<br />도로명주소: 충청북도 옥천군 옥천읍 중앙로 23-1<br />영업상태명: 영업/정상<br />데이터갱신시점: 2025-02-17 11:38:02</span></p>
        <p><strong>사용자 질문·이전 대화</strong><span>풍미당 주소 알려줘.</span></p>
      </div>
    </div>
    <p className="course-note">실제 코드 흐름을 설명하는 그림이며, 단계 버튼은 AI API를 호출하지 않아요. 위 식당 자료는 수업 CSV의 기록이고 현재 영업 여부를 실시간 확인한 결과는 아니에요.</p>
  </div>;
}
