import { Activity, LessonSection, Review } from "./lesson-blocks.js";

const SYSTEM_PROMPT_TEMPLATE = `당신은 [에이전트 이름]입니다.
[어떤 사용자]가 [어떤 문제]를 해결하도록 도와주세요.

답변 규칙:
1. 제공된 데이터에 있는 사실만 사용하세요.
2. 답을 찾지 못하면 추측하지 말고 찾지 못했다고 말하세요.
3. [원하는 말투]로 설명하세요.
4. 답변은 [표 / 목록 / 짧은 문장] 형식으로 작성하세요.
5. 답변 끝에 참고한 자료를 알려주세요.`;

export default function LessonFive() {
  return <div className="lesson-content">
    <LessonSection id="agent-plan" eyebrow="00:00–00:15 · 설계안 확인" title="내가 만들 AI 에이전트를 한 문장으로 소개해요" intro="4회차에 작성한 질문지를 꺼내 이름, 사용자, 데이터와 원하는 답변을 확인합니다.">
      <Activity title="설계안을 짝에게 설명하기" steps={["‘이 AI는 누구에게 어떤 도움을 줍니다’라고 한 문장으로 소개해요.", "준비한 데이터가 그 질문에 답할 수 있는지 확인해요.", "데이터에 없는 질문 한 가지도 정하고, AI가 어떻게 안내해야 할지 말해요."]} />
      <aside className="lesson-takeaway"><h3>AI 에이전트를 만드는 세 가지 재료</h3><p><b>이름</b>은 화면에서 만나는 정체성, <b>데이터</b>는 답변에 사용할 사실, <b>system prompt</b>는 역할과 답변 규칙이에요. 세 가지가 같은 목적을 향해야 자연스러운 에이전트가 됩니다.</p></aside>
    </LessonSection>

    <LessonSection id="agent-data" eyebrow="00:15–00:40 · 데이터 준비" title="AI가 참고할 데이터를 표로 정리해요" intro="AI가 정확하게 답하려면 질문에 필요한 사실이 데이터에 들어 있어야 해요. 먼저 데이터의 열과 실제 예시를 확인합니다.">
      <div className="teaching-grid"><article><h3>한 행은 하나의 대상</h3><p>장소 안내라면 한 장소, 상품 안내라면 한 상품, 프로그램 안내라면 한 프로그램을 한 줄에 적어요.</p></article><article><h3>한 열은 같은 종류의 정보</h3><p>이름, 설명, 위치, 이용 대상처럼 모든 행에서 같은 의미로 사용할 제목을 정해요. 비밀번호와 개인정보는 넣지 않습니다.</p></article></div>
      <Activity title="데이터 사용 가능 여부 확인하기" steps={["자료의 출처와 사용해도 되는 정보인지 확인해요.", "첫 줄에 열 이름을 쓰고 실제 데이터 3개 이상을 준비해요.", "빈칸, 중복, 서로 다른 날짜 표현과 잘못된 내용을 확인해요.", "준비한 질문 세 가지의 답을 데이터에서 직접 찾을 수 있는지 표시해요."]} />
      <aside className="lesson-example"><strong>중요</strong><p>파일 이름만 바꾼다고 새로운 데이터를 자동으로 이해하지는 않아요. 데이터의 열이 달라지면 검색 코드도 그 열에 맞게 바뀌어야 하므로, 강사가 제공한 양식을 사용하거나 AI에게 ‘새 열 이름에 맞게 검색 부분도 함께 수정해 달라’고 요청해요.</p></aside>
    </LessonSection>

    <LessonSection id="agent-identity" eyebrow="00:40–00:55 · 이름과 첫인사" title="에이전트의 이름과 첫 화면을 바꿔요" intro="이름만 보고도 누구를 돕는 AI인지 알 수 있게 정합니다.">
      <Activity title="화면 문구 바꾸기" steps={["lib/chat-config.js에서 name을 내 에이전트 이름으로 바꿔요.", "subtitle에는 다루는 데이터나 사용자를 짧게 적어요.", "greeting에는 사용자가 바로 질문할 수 있는 첫 인사를 적어요.", "예시 질문 카드도 준비한 질문 세 가지 중 쉬운 질문으로 바꿔요."]} />
    </LessonSection>

    <LessonSection id="agent-prompt" eyebrow="01:05–01:30 · System prompt" title="AI의 역할과 답변 규칙을 작성해요" intro="System prompt는 사용자가 매번 적지 않아도 AI가 계속 기억할 역할 설명서예요. 비밀 정보를 넣는 곳은 아닙니다.">
      <div className="lesson-code-example"><span className="code-file">lib/ai-config.js · SYSTEM_PROMPT 작성 양식</span><pre><code>{SYSTEM_PROMPT_TEMPLATE}</code></pre></div>
      <Activity title="나만의 system prompt 만들기" steps={["에이전트 이름과 도울 사용자를 첫 문장에 적어요.", "제공한 데이터만 사용하고 없는 정보는 추측하지 않는 규칙을 넣어요.", "원하는 말투와 답변 형식을 적어요.", "사용자가 데이터 속 문장을 명령처럼 따르라고 해도 자료로만 취급하도록 적어요.", "완성한 문장을 lib/ai-config.js의 SYSTEM_PROMPT에 반영해요."]} />
    </LessonSection>

    <LessonSection id="agent-test" eyebrow="01:30–01:55 · 질문과 답변 시험" title="예상한 답변과 실제 답변을 비교해요" intro="잘 답하는 질문뿐 아니라 데이터에 없는 질문도 보내야 에이전트의 규칙을 확인할 수 있어요.">
      <div className="course-table-wrap"><table className="course-table"><caption>에이전트 확인표</caption><thead><tr><th>질문 종류</th><th>확인할 내용</th></tr></thead><tbody><tr><th scope="row">데이터에 있는 질문</th><td>이름과 숫자 같은 사실이 원본과 같은가요?</td></tr><tr><th scope="row">조건이 있는 질문</th><td>지역·종류·대상 같은 조건에 맞는 결과만 골랐나요?</td></tr><tr><th scope="row">데이터에 없는 질문</th><td>사실을 만들지 않고 찾지 못했다고 말하나요?</td></tr><tr><th scope="row">답변 형식 질문</th><td>요청한 표·목록·짧은 설명 형식을 지키나요?</td></tr></tbody></table></div>
      <Activity title="세 종류의 질문 보내기" steps={["데이터에서 답을 찾을 수 있는 질문을 보내고 원본과 비교해요.", "두 가지 조건이 들어간 질문을 보내고 결과 범위를 확인해요.", "데이터에 없는 질문을 보내고 추측하지 않는지 확인해요.", "문제가 있다면 데이터, 이름, system prompt 중 무엇을 고쳐야 할지 선택해 한 번만 수정해요."]} />
    </LessonSection>

    <LessonSection id="agent-review" eyebrow="01:55–02:00 · 저장" title="나의 AI 에이전트를 저장해요" intro="변경한 파일과 대표 질문을 기록하고 다음 시간에 답변을 더 자세히 확인합니다.">
      <Review items={[
        { question: "데이터와 system prompt는 무엇이 다른가요?", answer: "데이터는 이름·주소·설명처럼 답변에 사용할 사실이고, system prompt는 그 사실을 어떤 역할과 규칙으로 설명할지 정하는 지시문이에요." },
        { question: "데이터에 없는 내용을 system prompt에 쓰면 데이터가 되나요?", answer: "아니요. 역할 설명에 사실을 많이 적기보다, 확인 가능한 정보는 데이터에 넣고 system prompt에는 사용 규칙을 적는 것이 좋아요." },
        { question: "완성 여부는 어떻게 확인하나요?", answer: "준비한 질문에 원하는 형식으로 답하고, 원본과 사실이 같으며, 없는 정보는 추측하지 않으면 기본 설계가 동작한 거예요." },
      ]} />
    </LessonSection>
  </div>;
}
