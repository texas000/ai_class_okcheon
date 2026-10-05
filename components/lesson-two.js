import { AI_CONCEPTS, LESSON_TWO_REFERENCES } from "../lib/lesson-two.js";
import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonWorksheet from "./lesson-worksheet.js";
import LlmJourney from "./llm-journey.js";

const PROMPTS = [
  { label: "A · 짧은 질문", text: "풍미당에 대해 알려줘." },
  { label: "B · 조건을 더한 질문", text: "풍미당의 업소명과 도로명 주소를 표로 정리해줘." },
  { label: "C · 근거와 한계까지", text: "풍미당의 업소명과 도로명 주소를 표로 정리해줘. 제공된 CSV만 근거로 삼고, 데이터 기준일도 알려줘. 메뉴나 영업시간은 추측하지 마." },
];

export default function LessonTwo({ isLoading, onPrompt }) {
  return <div className="lesson-content">
    <LessonSchedule number={2} />
    <LessonSection id="ai-warmup" eyebrow="00:00–00:10 · 대화" title="오늘 이미 AI를 만났을까요?" intro="정답을 맞히기보다 경험을 꺼내는 시간이에요. 처음 사용해보는 분도 괜찮아요.">
      <Activity title="생활 속 사례 세 가지 찾기" steps={["번역, 영상 추천, 사진 속 얼굴 찾기, 자동응답 중 경험한 것을 떠올려요. 어떤 입력을 주었고 어떤 결과를 받았나요?", "짝에게 한 가지 사례를 설명하고 ‘모든 자동화가 AI일까?’를 이야기해요.", "각 짝에서 한 사례를 공유해요. AI라고 생각한 이유와 아직 궁금한 점을 함께 말해요."]} />
    </LessonSection>
    <LessonSection id="ai-basics" eyebrow="00:10–00:30 · 개념" title="AI는 무엇인가요?" intro="AI는 넓은 분야이고, LLM은 그 안에서 언어를 다루는 모델의 한 종류예요.">
      <div className="ai-concept-grid">{AI_CONCEPTS.map((concept) => <article key={concept.title}><h3>{concept.title}</h3><p>{concept.text}</p></article>)}</div>
      <div className="concept-map" aria-label="AI 안에 머신러닝, 그 안에 딥러닝이 포함되며 오늘 다룰 LLM은 딥러닝 기반입니다"><span>AI</span><span>머신러닝</span><span>딥러닝</span><strong>오늘의 LLM</strong></div>
      <p className="course-note">위 그림은 오늘 다루는 딥러닝 기반 LLM의 위치를 단순화한 거예요. AI에는 사람이 규칙을 정하는 방식도 있어요. 챗봇은 대화하는 앱이고, 모든 챗봇이 LLM을 쓰는 것은 아니에요.</p>
      <div className="teaching-grid">
        <article><h3>규칙으로 처리하기</h3><p>‘점수가 60점 이상이면 통과’처럼 사람이 조건을 적어요. 입력이 조건에 맞는지 계산하므로 이런 자동화만으로 머신러닝이라고 하지는 않아요.</p></article>
        <article><h3>데이터에서 패턴 배우기</h3><p>여러 사진과 이름표로 고양이의 특징을 배우게 할 수 있어요. 처음 보는 사진에도 적용하지만 데이터가 치우치면 결과도 치우칠 수 있어요.</p></article>
      </div>
      <Activity title="규칙일까요, 학습일까요?" steps={["① 정해진 시간에 울리는 알람 ② 예시 이메일로 학습한 스팸 분류 ③ 다음 글을 예측하는 LLM을 분류해요.", "왜 그렇게 생각했는지 짝에게 설명해요. 서비스 이름보다 실제 처리 방법에 주목해요."]}>
        <details className="answer-detail"><summary>분류 예시 보기</summary><p>① 정해진 규칙에 따라 동작 ② 데이터에서 분류 패턴 학습 ③ 텍스트의 패턴 학습. 실제 서비스는 규칙과 학습 모델을 함께 사용할 수도 있어요.</p></details>
      </Activity>
    </LessonSection>
    <LessonSection id="llm-creation" eyebrow="00:30–00:55 · 그림으로 체험" title="LLM은 어떻게 만들어지나요?" intro="글쓰기 연습생이 배우는 과정에 비유해, 데이터가 대화하는 모델이 되기까지의 여섯 단계를 알아봐요. 단계마다 ‘배울 때’인지 ‘사용할 때’인지 생각해보세요.">
      <LlmJourney />
      <div className="teaching-grid">
        <article><h3>학습 · 연습하며 바꾸기</h3><p>데이터를 사용해 예측의 오차를 줄이도록 모델의 내부 숫자(가중치)를 조정해요. 많은 연산과 시간이 필요하고, 이후 지시문·좋은 답변 예시 등으로 추가 조정할 수 있어요.</p></article>
        <article><h3>추론 · 배운 모델 사용하기</h3><p>질문과 문맥을 입력하면 이미 학습된 가중치로 다음 토큰을 예측해요. 평범한 채팅 요청 자체가 이 앱에서 모델의 가중치를 수정하는 학습은 아니에요.</p></article>
      </div>
      <aside className="lesson-example"><strong>함께 생각해보기 · “오늘 점심으로 ___”</strong><p>빈칸 후보를 두 개 적어보세요. LLM은 문맥에 따른 다음 토큰 후보의 확률을 계산하고 토큰을 이어 답해요. 자연스러운 문장을 만드는 것과 사실을 확인하는 것은 달라요. 실제 토큰 구분은 모델마다 달라요.</p></aside>
      <aside className="lesson-takeaway"><h3>우리는 LLM을 직접 학습시키나요?</h3><p>이번 수업은 이미 학습된 모델을 NVIDIA API로 불러오는 앱을 만들어요. 옥천 CSV를 검색해 질문과 함께 보내는 것은 참고 자료를 제공하는 과정이에요. 우리 앱이 모델의 가중치를 새로 학습시키지는 않아요.</p></aside>
    </LessonSection>
    <LessonSection id="prompt-lab" eyebrow="01:05–01:30 · 질문 실험" title="좋은 질문은 무엇이 다를까요?" intro="휴식 후, 같은 목적의 질문을 A → B → C로 바꿔봐요. 풍미당 한 곳을 대상으로 조건과 표현을 비교해요. 질문이 구체적이어도 정확성이 보장되지는 않으므로 결과를 확인해요.">
      <div className="prompt-recipe"><div><span>01</span><strong>목적</strong><p>무엇을 알고 싶나요?</p></div><div><span>02</span><strong>맥락·조건</strong><p>대상, 범위, 참고 자료</p></div><div><span>03</span><strong>출력 형식</strong><p>표, 목록, 길이</p></div><div><span>04</span><strong>확인 규칙</strong><p>출처와 모르는 정보</p></div></div>
      <div className="prompt-comparison">{PROMPTS.map((prompt) => <article key={prompt.label}><h3>{prompt.label}</h3><p>{prompt.text}</p><button disabled={isLoading} onClick={() => onPrompt(prompt.text)}>이 질문으로 대화하기 ↗</button></article>)}</div>
      <p className="course-note">버튼은 채팅으로 이동해 실제 요청을 전송해요. 실습 가이드 버튼으로 돌아와 기록하세요. 이 앱에는 이미 CSV 사용 규칙이 있어서 A에서도 출처가 나올 수 있어요. 달라지지 않은 점도 관찰 결과예요.</p>
      <Activity title="질문을 바꾸고 차이를 기록해요" steps={["A와 B를 실행해 결과의 형식·정보 범위를 비교해요. 어떤 조건이 달라졌나요?", "C를 실행하고 근거와 데이터 기준일이 표시되는지 살펴봐요. 답변 내용도 CSV와 비교해요.", "나만의 질문을 하나 작성해요. 예: 같은 업소의 이름·주소를 목록으로 요청하거나, 데이터 기준일을 함께 요청해요.", "짝에게 가장 도움이 된 질문을 보여줘요. 같은 질문을 다시 해도 표현이나 선택된 결과가 달라질 수 있어요."]} />
    </LessonSection>
    <LessonSection id="ai-check" eyebrow="01:30–01:50 · 근거 확인" title="AI의 말, 어디까지 믿어도 될까요?" intro="그럴듯하지만 틀린 정보를 생성하는 현상을 환각이라고 불러요. LLM은 매번 원본의 사실을 자동으로 검증하지 않아요.">
      <div className="teaching-grid"><article><h3>확인 가능한 질문</h3><p>‘풍미당 주소 알려줘’를 물어봐요. 답변 아래 ‘참고한 CSV 자료’를 펼쳐 업소명과 도로명 주소를 대조해요. 원본 기준일과 오늘의 실제 상황이 다를 수도 있어요.</p><button className="lesson-action" disabled={isLoading} onClick={() => onPrompt("풍미당 주소 알려줘.")}>주소 질문 보내기 ↗</button></article><article><h3>자료에 없는 질문</h3><p>‘풍미당의 영업시간과 메뉴 가격 알려줘’를 물어봐요. CSV에는 이 항목이 없어요. 확인이 필요하다고 안내하는지, 임의로 숫자를 만들지 않는지 살펴봐요.</p><button className="lesson-action" disabled={isLoading} onClick={() => onPrompt("풍미당의 영업시간과 메뉴 가격 알려줘.")}>없는 정보 질문 보내기 ↗</button></article></div>
      <Activity title="사실·추측·확인 필요를 나눠요" steps={["답변에서 사실처럼 보이는 문장 하나를 골라요. 참고 자료에 같은 내용이 있는지 확인해요.", "근거가 없거나 자료가 오래되었다면 ‘확인 필요’로 표시하고 어디서 확인할지 적어요.", "자료에 없는 정보를 요청했을 때의 안내 문장을 짝과 비교해요. 모른다고 말하는 답변도 유용할 수 있어요."]} />
      <aside className="lesson-takeaway"><h3>질문하기 전의 작은 습관</h3><p>비밀번호, API 키, 개인 연락처 등은 실습 질문에 넣지 않아요. 외부 AI API에 보낼 때는 질문과 참고 자료가 외부 서비스로 전달돼요. 공개된 식당 자료로 실습하고, 중요한 정보는 원본과 최신 출처를 확인해요.</p></aside>
      <LessonWorksheet id="lesson-2-ai-notes" title="2회차 · 질문 비교와 검증 활동지" fields={[
        { key: "example", label: "생활 속 AI와 규칙 자동화의 차이", example: "알람은 정해진 규칙, 스팸 분류 모델은 예시에서 패턴을 학습…" },
        { key: "comparison", label: "A·B·C 질문의 결과 비교", example: "달라진 조건 / 결과 개수·형식 / 그대로인 점 / 더 유용했던 질문" },
        { key: "my-prompt", label: "내가 만든 질문", example: "목적 + 대상·자료 + 출력 형식 + 확인 규칙" },
        { key: "evidence", label: "답변의 근거와 확인할 정보", example: "답변 문장 / CSV에서 확인한 내용 / 자료에 없는 내용 / 추가 확인할 곳" },
      ]} />
    </LessonSection>
    <LessonSection id="ai-review" eyebrow="01:50–02:00 · 정리" title="내 말로 설명해봐요" intro="답을 펼치기 전에 짝에게 먼저 설명해요. 오늘 가장 유용했던 질문 하나를 함께 공유하세요.">
      <Review items={[
        { question: "AI, 머신러닝, LLM은 모두 같은 뜻인가요?", answer: "AI는 넓은 분야, 머신러닝은 데이터에서 패턴을 배우는 방법, 오늘의 LLM은 딥러닝으로 많은 텍스트를 학습한 언어 모델이에요." },
        { question: "CSV를 질문에 붙이면 모델을 새로 학습시키나요?", answer: "이 앱에서는 참고 자료를 문맥으로 제공해 추론해요. 모델 가중치를 바꾸는 학습과 달라요." },
        { question: "질문이 구체적이면 답변은 항상 정확한가요?", answer: "원하는 결과에 도움이 되지만 정확성을 보장하지는 않아요. 원본, 기준일, 모르는 정보를 확인해야 해요." },
      ]} />
      <aside className="lesson-example"><strong>다음 시간까지 · 내가 쓰는 앱 하나 관찰하기</strong><p>어떤 버튼을 눌렀는지, 무엇을 입력했는지, 어떤 결과가 나타났는지 메모해오세요. 다음 3회차에는 그 화면 뒤에서 일어나는 일을 배워요.</p></aside>
      <div className="lesson-references"><span>개념 참고 자료</span>{LESSON_TWO_REFERENCES.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</div>
    </LessonSection>
  </div>;
}
