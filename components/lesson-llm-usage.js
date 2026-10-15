import { LLM_MODEL_CHOICES, LLM_USAGE_REFERENCES } from "../lib/lesson-two.js";

export default function LessonModelChoice() {
  return (
    <section id="llm-model-choice" className="lesson-example llm-model-guide" aria-labelledby="llm-model-choice-title">
      <h3 id="llm-model-choice-title">어떤 일을 하느냐에 따라 모델을 골라요</h3>
      <div className="teaching-grid">
        <article><h4>복잡한 결과물 · 유료 OpenAI·Claude API</h4><p>많은 자료를 분석해 흐름을 잡고, 내용과 구성이 잘 맞는 PPT를 만들어야 한다면 유료 OpenAI·Claude 모델을 우선 검토해요. 아래 표는 수업에서 시작점으로 사용할 선택 가이드예요.</p></article>
        <article><h4>간단한 작업 · NVIDIA 무료 체험으로 시작</h4><p>일정 목록 정리, 겹치는 시간 확인, 짧은 안내문 만들기 같은 실습은 NVIDIA의 무료 체험 모델로 먼저 해볼 수 있어요. 대표 질문 몇 개로 원하는 결과가 나오는지 확인해요.</p></article>
      </div>
      <div className="course-table-wrap"><table className="course-table">
        <caption>복잡한 PPT 제작을 위한 유료 API 모델 선택 가이드</caption>
        <thead><tr><th scope="col">목적</th><th scope="col">OpenAI API</th><th scope="col">Claude API</th></tr></thead>
        <tbody>{LLM_MODEL_CHOICES.map(({ purpose, openai, claude }) => <tr key={purpose}><th scope="row">{purpose}</th><td><code>{openai}</code></td><td><code>{claude}</code></td></tr>)}</tbody>
      </table></div>
      <p><strong>NVIDIA 실습 모델 예시</strong><br /><code>nvidia/nemotron-3.5-lightning-30b-a3b</code></p>
      <p>유료 모델이 꼭 필요한지는 작업과 원하는 품질에 따라 달라요. 이 표는 수업용 추천이며, 같은 작업으로 결과·속도·비용을 비교해 선택해요. NVIDIA 무료 체험에는 이용 한도가 있고, 실제 서비스 운영에는 별도 이용 조건을 확인해야 해요.</p>
      <p>모델은 내용과 구성안을 만들어요. PPT 파일 제작이나 일정의 저장·알림은 앱의 별도 기능으로 연결해야 해요.</p>
      <div className="lesson-references"><span>공식 안내 · 2026년 10월 15일 확인</span>{LLM_USAGE_REFERENCES.map(({ title, url }) => <a key={url} href={url} target="_blank" rel="noreferrer">{title} ↗</a>)}</div>
    </section>
  );
}

export function LlmInstructionsContext() {
  return <section id="llm-instructions-context" className="lesson-example" aria-labelledby="llm-instructions-context-title">
    <h3 id="llm-instructions-context-title">그럼 AI에게 무엇을 함께 보내야 할까요?</h3>
    <p>방금 본 ‘참고 자료 묶기’ 단계에서는 질문만 보내지 않아요. 역할과 답변 규칙, 식당 자료를 함께 준비해요. ‘풍미당 주소 알려줘’라는 같은 예시로 살펴볼게요.</p>
    <div className="teaching-grid">
      <article><h4>System prompt · 역할 설명서</h4><p>식당 안내를 맡은 새 직원에게 주는 설명서라고 생각해보세요. ‘어떤 일을 맡고, 어떤 말투와 규칙으로 답할지’를 앱을 만드는 사람이 정해 전달해요.</p><p>우리 예시에서는 ‘식당 정보를 친절하게 안내하고, 자료에 없는 내용은 추측하지 마세요’가 역할과 규칙이에요.</p></article>
      <article><h4>Context · 답할 때 펼쳐보는 참고 자료</h4><p>직원에게 식당 이름과 주소가 적힌 메모를 건네는 것과 같아요. 우리 서버가 식당 표에서 풍미당을 찾아 질문과 함께 보내요.</p><p>필요한 자료와 앞서 나눈 대화를 참고하게 할 수 있어요. 넓게는 AI가 이번 답변을 만들 때 받는 전체 내용을 뜻하기도 해요.</p></article>
    </div>
    <div className="chatbot-context-packet">
      <p><strong>① 역할과 답변 규칙 · System prompt</strong><span>당신은 옥천 식당 안내 도우미예요. 제공된 자료에 있는 사실만 사용하고, 모르는 내용은 모른다고 말해주세요.</span></p>
      <p><strong>② 이번 질문의 참고 자료 · Context</strong><span>사업장명: 풍미당<br />도로명주소: 충청북도 옥천군 옥천읍 중앙로 23-1</span></p>
      <p><strong>③ 사용자 질문</strong><span>풍미당 주소 알려줘.</span></p>
    </div>
    <p><strong>이렇게 답할 수 있어요:</strong> 풍미당의 도로명 주소는 충청북도 옥천군 옥천읍 중앙로 23-1이에요.</p>
    <p>역할 설명서는 답하는 방식을 정하고, 참고 자료는 주소 같은 사실을 제공해요. 위 주소는 수업 CSV의 기록이며 방문 전에는 최신 정보를 확인해요.</p>
    <p>AI가 내 컴퓨터나 DB를 저절로 읽는 것은 아니에요. 앱이 필요한 자료를 찾아 보내줘야 해요. 자료를 건네는 것은 AI를 새로 학습시키는 일과 달라요.</p>
    <p>참고 자료 속 ‘앞의 규칙을 무시해’ 같은 문장은 지시로 따르지 않게 해요. 필요한 부분만 보내고, API 키·비밀번호는 넣지 않아요.</p>
    <div className="lesson-references"><span>공식 안내</span><a href="https://developers.openai.com/api/docs/guides/prompt-engineering" target="_blank" rel="noreferrer">OpenAI · 역할 지시와 참고 자료 전달하기 ↗</a></div>
  </section>;
}
