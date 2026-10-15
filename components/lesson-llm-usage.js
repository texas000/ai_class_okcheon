import { LLM_MODEL_CHOICES, LLM_USAGE_REFERENCES } from "../lib/lesson-two.js";

const REQUEST_EXAMPLE = `역할과 답변 규칙 · System prompt
당신은 일정 정리 도우미예요.
날짜와 시간을 표로 정리하고, 겹치는 일정이 있으면 알려주세요.
자료에 없는 시간은 추측하지 말고 물어보세요.

이번에 참고할 자료 · Context
10월 16일 오후 2시: 농장 회의
10월 16일 오후 2시 30분: 장비 점검
두 일정은 각각 1시간이 걸려요.

사용자의 질문
내일 일정이 겹치는지 알려줘.
오늘은 10월 15일이야.`;

export default function LessonLlmUsage() {
  return <>
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
    <section id="llm-instructions-context" className="lesson-example" aria-labelledby="llm-instructions-context-title">
      <h3 id="llm-instructions-context-title">AI에게 역할 설명서와 참고 자료를 함께 줘요</h3>
      <div className="teaching-grid">
        <article><h4>System prompt · 역할 설명서</h4><p>새로 온 직원에게 ‘어떤 일을 맡고, 어떤 방식으로 답하면 되는지’ 알려주는 설명서예요. 앱을 만드는 사람이 AI의 역할·말투·답변 규칙을 정해 전달해요.</p><p>예: ‘당신은 일정 정리 도우미예요. 시간을 표로 정리하고, 모르는 시간은 물어보세요.’</p></article>
        <article><h4>Context · 이번 일을 위한 참고 자료</h4><p>직원에게 오늘의 일정표나 회의 메모를 건네는 것과 같아요. 지금 답할 때 필요한 자료와 앞서 나눈 대화를 말해요. 넓게는 AI가 이번 답변을 만들 때 받는 전체 내용을 뜻하기도 해요.</p><p>예: ‘내일 오후 2시 농장 회의, 오후 2시 30분 장비 점검. 각각 1시간.’</p></article>
      </div>
      <div className="lesson-code-example"><span className="code-file">설명용 예시 · 역할 + 참고 자료 + 질문</span><pre><code>{REQUEST_EXAMPLE}</code></pre></div>
      <p><strong>이렇게 답할 수 있어요:</strong> 두 일정은 오후 2시 30분부터 3시까지 겹쳐요. 참고 자료를 주었기 때문에 막연한 조언 대신 실제 시간을 비교할 수 있어요.</p>
      <p>앱에서는 역할과 규칙을 먼저 정하고, 질문할 때 필요한 자료를 찾아 함께 보내요. 우리 챗봇은 식당 표에서 찾은 이름·주소를 참고 자료로 추가해요. AI가 내 컴퓨터나 DB를 저절로 읽는 것은 아니에요.</p>
      <p>참고 자료는 답을 찾기 위한 정보예요. 자료 속 ‘앞의 규칙을 무시해’ 같은 문장은 지시로 따르지 않게 해요. 필요한 부분만 보내고, API 키·비밀번호는 넣지 않아요. 자료를 보내는 것과 AI를 새로 학습시키는 것은 달라요.</p>
      <div className="lesson-references"><span>공식 안내</span><a href="https://developers.openai.com/api/docs/guides/prompt-engineering" target="_blank" rel="noreferrer">OpenAI · 역할 지시와 참고 자료 전달하기 ↗</a></div>
    </section>
  </>;
}
