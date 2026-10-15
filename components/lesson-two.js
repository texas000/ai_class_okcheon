import { AI_CONCEPTS, LESSON_TWO_REFERENCES } from "../lib/lesson-two.js";
import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonQuestions from "./lesson-questions.js";
import LlmJourney from "./llm-journey.js";
import ApplicationFlow from "./application-flow.js";
import ChatbotStructure from "./chatbot-structure.js";

const PROMPTS = [
  { label: "A · 짧은 질문", text: "풍미당에 대해 알려줘." },
  { label: "B · 조건을 더한 질문", text: "풍미당의 업소명과 도로명 주소를 표로 정리해줘." },
  { label: "C · 근거와 한계까지", text: "풍미당의 사업장명과 도로명 주소, 영업 상태를 표로 정리해줘. 제공된 CSV만 근거로 삼고, 데이터 갱신 시점도 알려줘. 메뉴나 영업시간은 추측하지 마." },
];

export default function LessonTwo({ isLoading, onPrompt }) {
  return <div className="lesson-content">
    <LessonSchedule number={2} />
    <LessonSection id="ai-warmup" eyebrow="00:00–00:10 · 대화" title="오늘 이미 AI를 만났을까요?" intro="정답을 맞히기보다 경험을 꺼내는 시간이에요. 처음 사용해보는 분도 괜찮아요.">
      <Activity title="생활 속 사례 세 가지 찾기" steps={["번역, 영상 추천, 사진 속 얼굴 찾기, 자동응답 중 경험한 것을 떠올려요. 어떤 입력을 주었고 어떤 결과를 받았나요?", "짝에게 한 가지 사례를 설명하고 ‘모든 자동화가 AI일까?’를 이야기해요.", "각 짝에서 한 사례를 공유해요. AI라고 생각한 이유와 아직 궁금한 점을 함께 말해요."]} />
    </LessonSection>
    <LessonSection id="ai-basics" eyebrow="00:10–00:20 · 개념" title="AI는 무엇인가요?" intro="AI는 넓은 분야이고, LLM은 그 안에서 언어를 다루는 모델의 한 종류예요.">
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
    <LessonSection id="llm-creation" eyebrow="00:20–00:35 · 그림으로 체험" title="LLM은 어떻게 만들어지나요?" intro="도서관에서 책을 고르고 글쓰기를 연습하는 다섯 장면으로, AI가 배우는 과정을 알아봐요. 어려운 단어를 외우기보다 무엇을 연습하는지 함께 이야기해보세요.">
      <LlmJourney />
      <div className="teaching-grid">
        <article><h3>학습 · 연습하며 바꾸기</h3><p>학교에서 여러 책으로 글쓰기를 연습하듯, AI도 많은 글과 답변 예시로 연습해요. 다음에는 더 잘 답하도록 내부 계산 방식을 바꾸는 과정이에요.</p></article>
        <article><h3>사용 · 배운 AI에게 물어보기</h3><p>우리가 질문하면 AI는 배운 내용을 바탕으로 답변을 만들어요. 이 수업 앱에서 질문을 보내는 것은 AI를 처음부터 다시 가르치는 일과는 달라요.</p></article>
      </div>
      <aside className="lesson-example"><strong>함께 생각해보기 · “오늘 점심으로 ___”</strong><p>빈칸에 들어갈 말을 두 개 떠올려보세요. AI도 앞의 말을 보고 뒤에 올 법한 말을 골라 글을 이어가요. 자연스럽게 쓴 문장이라도 내용이 사실인지는 따로 확인해야 해요.</p></aside>
      <aside className="lesson-takeaway"><h3>우리는 LLM을 직접 학습시키나요?</h3><p>이번 수업은 이미 배운 AI를 연결해 앱을 만들어요. 옥천 식당 표에서 찾은 내용을 질문과 함께 보내는 것은, 답할 때 참고하라고 메모를 건네는 것과 비슷해요. AI를 처음부터 다시 가르치는 것은 아니에요.</p></aside>
      <div id="chatbot-structure"><ChatbotStructure /></div>
      <aside className="lesson-example"><strong>검색과 답변 만들기는 역할이 달라요</strong><p>검색 코드는 근거가 될 식당 자료를 고르고, LLM은 그 자료를 참고해 문장을 만들어요. 식당 질문에서 검색 결과가 없으면 찾지 못했다고 안내하도록 규칙을 보내요. 영업시간·메뉴 가격처럼 CSV에 없는 정보는 확인이 필요해요. 일반 AI 질문에는 식당 context를 붙이지 않아요.</p></aside>
    </LessonSection>
    <LessonSection id="app-warmup" eyebrow="00:35–00:40 · 개념" title="Application은 무엇인가요?" intro="Application(애플리케이션)은 컴퓨터나 휴대전화에서 우리가 원하는 일을 할 수 있게 도와주는 프로그램이에요. 줄여서 ‘앱’이라고 불러요.">
      <aside className="lesson-example"><strong>생활 도구처럼 생각해보세요</strong><p>가위는 종이를 자르고, 달력은 일정을 기억하도록 도와줘요. 앱도 비슷해요. 화면에서 버튼을 누르거나 내용을 입력하면, 계산·기록·길 찾기처럼 필요한 일을 도와주는 디지털 도구예요.</p></aside>
      <div className="teaching-grid">
        <article><h3>계산기 앱 · 계산을 도와줘요</h3><p>물건 가격과 개수를 넣으면 합계를 계산해줘요. 계산기를 직접 두드리는 일을 화면 속 도구로 하는 거예요.</p></article>
        <article><h3>지도 앱 · 길 찾기를 도와줘요</h3><p>가고 싶은 곳을 입력하면 가는 길을 보여줘요. 낯선 곳에서도 어디로 가야 할지 알 수 있어요.</p></article>
        <article><h3>기록 앱 · 기억을 도와줘요</h3><p>오늘 한 일이나 농작업 내용을 적어두면, 나중에 다시 찾아볼 수 있어요. 종이 수첩이 하던 일을 도와주는 셈이에요.</p></article>
      </div>
      <aside className="lesson-takeaway"><h3>우리가 앱을 만든다는 것은?</h3><p>‘누가 어떤 일을 더 쉽게 하게 도울까?’를 정하고, 그 일을 할 수 있는 화면과 기능을 만드는 거예요. 예를 들어 식당 이름을 입력하면 주소를 찾아주는 앱부터 만들 수 있어요.</p></aside>
    </LessonSection>
    <LessonSection id="app-basics" eyebrow="00:40–00:50 · 개념" title="앱을 입력 → 처리 → 결과로 나눠봐요" intro="화면에 보이는 버튼뿐 아니라, 입력을 받아 필요한 일을 수행하는 과정까지 앱의 일부예요.">
      <div className="input-output-map"><div><span>INPUT</span><h3>입력</h3><p>사용자가 주는 정보<br />목적지, 검색어, 질문</p></div><span aria-hidden="true">→</span><div><span>PROCESS</span><h3>처리</h3><p>계산하거나 자료를 찾는 일<br />경로 계산, 검색, 답변 생성</p></div><span aria-hidden="true">→</span><div><span>OUTPUT</span><h3>결과</h3><p>사용자에게 보여주는 것<br />지도, 목록, 대화 메시지</p></div></div>
      <div className="course-table-wrap"><table className="course-table"><caption>익숙한 앱을 세 부분으로 분석해요</caption><thead><tr><th>앱</th><th>입력</th><th>처리</th><th>결과</th></tr></thead><tbody><tr><th scope="row">계산기</th><td>숫자와 연산</td><td>계산 규칙 실행</td><td>계산된 숫자</td></tr><tr><th scope="row">지도</th><td>출발지와 목적지</td><td>지도 자료로 경로 계산</td><td>경로와 예상 시간</td></tr><tr><th scope="row">옥천 챗봇</th><td>지역·업소 질문</td><td>CSV 검색 + AI 답변 생성</td><td>답변과 참고 자료</td></tr></tbody></table></div>
      <div className="teaching-grid"><article><h3>웹 앱과 설치형 앱</h3><p>웹 앱은 브라우저에서 주소로 접속해 사용해요. 설치형 앱은 기기에 설치해 사용해요. 둘 다 사용자의 일을 돕고, 인터넷을 쓰는지는 기능에 따라 달라요. 우리는 주소로 공유할 수 있는 웹 앱을 만들어요.</p></article><article><h3>앱과 AI 모델의 관계</h3><p>모델은 앱 안의 한 기능을 맡을 수 있어요. 우리 챗봇에서 AI는 답변 문장을 만들고, 앱은 입력·자료 검색·전송·오류 안내·결과 표시를 관리해요. 계산기처럼 AI 없이 동작하는 앱도 많아요.</p></article></div>
      <Activity title="앱의 세 칸을 채워보기" steps={["계산기·지도·기록 앱 중 하나를 골라 입력 / 처리 / 결과를 각각 적어요. 내부 처리는 추측이라면 ‘예상’이라고 표시해요.", "‘검색어는 입력, 검색 버튼은 입력을 보내는 화면 요소’처럼 정보와 화면 요소를 구분해요.", "짝이 그 설명만 듣고 앱을 사용할 수 있는지 확인해요."]} />
    </LessonSection>
    <LessonSection id="app-structure" eyebrow="01:00–01:15 · 구조" title="식당의 홀과 주방처럼 함께 일해요" intro="온라인 앱의 구조를 식당에 비유해요. 실제 앱에서는 화면과 서버가 요청·응답으로 정보를 주고받아요.">
      <div className="restaurant-analogy"><article><span>01 · 홀과 메뉴판</span><h3>프런트엔드 · 화면</h3><p>손님이 메뉴를 보고 주문하듯 사용자가 보고 조작하는 부분이에요. 입력창, 버튼, 답변 표시를 담당해요.</p><small>우리 앱: 브라우저의 대화 화면</small></article><article><span>02 · 주방</span><h3>백엔드 · 서버 처리</h3><p>주문을 받아 조리하듯 요청을 검사하고 자료 검색과 AI 호출을 수행해요. 여기서 ‘서버’는 요청을 처리하는 프로그램과 실행 환경을 뜻해요.</p><small>우리 앱: /api/chat 서버 기능</small></article><article><span>03 · 재료 목록</span><h3>데이터 · 참고할 정보</h3><p>주방이 재료 목록을 보듯 코드가 필요한 자료를 읽어요. 데이터는 파일이나 데이터베이스에 둘 수 있어요.</p><small>우리 앱: 식당 이름·주소가 담긴 CSV</small></article><article><span>04 · 정해진 주문 방식</span><h3>API · 요청과 응답의 약속</h3><p>주문서에 메뉴와 수량을 적는 규칙처럼, 다른 프로그램에 어떤 형식으로 부탁하고 결과를 받을지 정한 인터페이스예요.</p><small>우리 앱: /api/chat, NVIDIA API</small></article></div>
      <div className="teaching-grid">
        <article><h3>DB · 필요한 정보를 찾는 정리 장부</h3><p>DB는 Database(데이터베이스)의 줄임말이에요. 식당의 예약 장부처럼 이름·날짜·인원 등의 정보를 정리해 저장하고, 필요한 내용을 찾거나 바꾸는 데 사용해요.</p><p>예를 들어 농작업 기록 앱에서는 ‘작업 날짜 / 밭 이름 / 한 일’을 DB에 저장해요. 그러면 ‘지난달에 이 밭에서 한 일’만 골라볼 수 있어요.</p></article>
        <article><h3>File Server · 사진과 문서를 꺼내주는 보관함</h3><p>File Server(파일 서버)는 사진·영상·PDF 같은 파일을 보관하고, 앱이 요청하면 꺼내주는 역할이에요. 식당에서 장부에 적힌 번호로 보관함 속 물건을 찾는 모습과 비슷해요.</p><p>농작업 사진을 올리면 파일 서버에 사진을 보관하고, 앱에서 다시 열어볼 수 있어요. 파일마다 누가 보거나 내려받을 수 있는지도 정해야 해요.</p></article>
      </div>
      <aside className="lesson-example"><strong>사진이 있는 기록 하나를 저장한다면?</strong><p><b>DB</b>에는 ‘10월 15일 / 감자밭 / 물 주기’와 사진이 있는 위치를 적고, <b>파일 서버</b>에는 사진 파일을 보관할 수 있어요. 앱은 장부에서 기록을 찾고 보관함에서 사진을 꺼내 함께 보여줘요.</p><p>DB와 파일 서버는 역할을 나누어 설명한 것이에요. 한 컴퓨터에서 함께 운영할 수도 있어요. 지금 보는 옥천 챗봇 예제는 별도 DB 대신 CSV 표 파일을 읽어 식당 정보를 찾아요.</p></aside>
      <aside className="lesson-example"><strong>비유의 경계</strong><p>API는 실제 직원이나 비밀 열쇠가 아니라 프로그램을 사용하는 약속이에요. API 키는 외부 서비스를 사용할 권한을 증명하는 값이며 별개예요. 모든 앱에 서버나 외부 API가 꼭 필요한 것은 아니에요.</p></aside>
      <Activity title="화면·서버·저장 공간의 역할 연결하기" steps={["입력창 / CSV / NVIDIA 요청 / 요청 형식 검사 / 답변 글자 표시 / 농작업 기록 장부 / 농작업 사진 파일을 떠올려요.", "입력창과 답변 표시는 화면, 요청 검사는 서버, NVIDIA 요청은 외부 API 호출에 연결해요. 식당 CSV는 데이터이고, 농작업 기록은 DB, 사진 파일은 파일 서버에 보관하는 예시로 연결해요.", "API 키를 메뉴판에 적으면 누구나 볼 수 있다는 비유로, 키를 서버에 두는 이유를 이야기해요."]} />
      <div className="course-table-wrap"><table className="course-table"><caption>앞으로 사용할 도구의 역할</caption><thead><tr><th>도구</th><th>이 수업에서 하는 일</th></tr></thead><tbody><tr><th scope="row">React</th><td>입력창·버튼·대화 목록처럼 화면을 구성하고 상호작용을 만드는 라이브러리</td></tr><tr><th scope="row">Next.js</th><td>React 화면, 페이지 주소, 서버 API를 한 프로젝트에서 만드는 프레임워크</td></tr><tr><th scope="row">GitHub</th><td>코드 파일을 저장하는 온라인 공간</td></tr><tr><th scope="row">Vercel</th><td>준비된 코드를 실행해 접속할 수 있는 앱 주소를 만드는 곳</td></tr></tbody></table></div>
    </LessonSection>
    <LessonSection id="app-flow" eyebrow="01:15–01:30 · 동작 체험" title="한 번의 질문은 어디로 이동할까요?" intro="우리 앱의 동작을 따라가요. 지금은 파일 이름을 외우기보다 각 부분의 역할과 이동 순서를 이해해요.">
      <ApplicationFlow />
      <Activity title="사람이 앱이 되어보는 역할극" steps={["3~4명이 사용자·화면·서버·AI 역할을 나눠요. 서버 역할에게 ‘업소명 / 주소’ 자료 카드를 줘요. 인원이 적으면 한 사람이 두 역할을 맡아요.", "사용자가 질문을 쓰면 화면 → 서버로 전달해요. 서버는 자료에서 관련 행을 찾고, 자료와 질문을 AI 역할에게 함께 줘요.", "AI 역할은 자료 안의 사실로 답변을 쓰고 서버를 거쳐 화면으로 돌려줘요. 화면은 한 문장씩 읽어 스트리밍을 흉내 내요.", "이번에는 자료에 없는 질문을 보내요. 어느 역할이 검색 결과를 알리고, 어느 역할이 사용자에게 안내를 보여줄지 토론해요."]} />
      <div className="teaching-grid"><article><h3>자료가 없는 경우</h3><p>‘검색한 자료에서 찾지 못했어요. 이름이나 지역을 바꿔 질문해보세요.’처럼 다음 행동을 안내해요. 자료가 없다고 AI가 주소를 만들어내면 안 돼요.</p></article><article><h3>서버나 연결에 문제가 있는 경우</h3><p>계속 기다리게 하지 않고 실패한 상태와 다시 시도할 방법을 알려줘요. 생성 중에는 전송 상태가 보여야 하고, 완료 후에는 답변과 근거를 확인할 수 있어야 해요.</p></article></div>
    </LessonSection>
    <LessonSection id="prompt-lab" eyebrow="01:30–01:45 · 질문 실험" title="좋은 질문은 무엇이 다를까요?" intro="같은 목적의 질문을 A → B → C로 바꿔봐요. 풍미당 한 곳을 대상으로 조건과 표현을 비교해요. 질문이 구체적이어도 정확성이 보장되지는 않으므로 결과를 확인해요.">
      <div className="prompt-recipe"><div><span>01</span><strong>목적</strong><p>무엇을 알고 싶나요?</p></div><div><span>02</span><strong>맥락·조건</strong><p>대상, 범위, 참고 자료</p></div><div><span>03</span><strong>출력 형식</strong><p>표, 목록, 길이</p></div><div><span>04</span><strong>확인 규칙</strong><p>출처와 모르는 정보</p></div></div>
      <div className="prompt-comparison">{PROMPTS.map((prompt) => <article key={prompt.label}><h3>{prompt.label}</h3><p>{prompt.text}</p><button disabled={isLoading} onClick={() => onPrompt(prompt.text)}>이 질문으로 대화하기 ↗</button></article>)}</div>
      <p className="course-note">버튼은 채팅으로 이동해 실제 요청을 전송해요. 실습 가이드 버튼으로 돌아와 기록하세요. 이 앱에는 이미 CSV 사용 규칙이 있어서 A에서도 출처가 나올 수 있어요. 달라지지 않은 점도 관찰 결과예요.</p>
      <Activity title="질문을 바꾸고 차이를 기록해요" steps={["A와 B를 실행해 결과의 형식·정보 범위를 비교해요. 어떤 조건이 달라졌나요?", "C를 실행하고 근거와 데이터 갱신 시점이 표시되는지 살펴봐요. 답변 내용도 CSV와 비교해요.", "나만의 질문을 하나 작성해요. 예: 같은 업소의 이름·주소를 목록으로 요청하거나, 영업 상태를 함께 요청해요.", "짝에게 가장 도움이 된 질문을 보여줘요. 같은 질문을 다시 해도 표현이나 선택된 결과가 달라질 수 있어요."]} />
    </LessonSection>
    <LessonSection id="ai-check" eyebrow="01:45–01:55 · 근거 확인" title="AI의 말, 어디까지 믿어도 될까요?" intro="그럴듯하지만 틀린 정보를 생성하는 현상을 환각이라고 불러요. LLM은 매번 원본의 사실을 자동으로 검증하지 않아요.">
      <div className="teaching-grid"><article><h3>확인 가능한 질문</h3><p>‘풍미당 주소와 영업 상태 알려줘’를 물어봐요. 답변 아래 ‘참고한 CSV 자료’를 펼쳐 사업장명과 도로명 주소를 대조해요. 원본 갱신 시점과 오늘의 실제 상황이 다를 수도 있어요.</p><button className="lesson-action" disabled={isLoading} onClick={() => onPrompt("풍미당 주소와 영업 상태 알려줘.")}>주소 질문 보내기 ↗</button></article><article><h3>자료에 없는 질문</h3><p>‘풍미당의 영업시간과 메뉴 가격 알려줘’를 물어봐요. CSV에는 이 항목이 없어요. 확인이 필요하다고 안내하는지, 임의로 숫자를 만들지 않는지 살펴봐요.</p><button className="lesson-action" disabled={isLoading} onClick={() => onPrompt("풍미당의 영업시간과 메뉴 가격 알려줘.")}>없는 정보 질문 보내기 ↗</button></article></div>
      <Activity title="사실·추측·확인 필요를 나눠요" steps={["답변에서 사실처럼 보이는 문장 하나를 골라요. 참고 자료에 같은 내용이 있는지 확인해요.", "근거가 없거나 자료가 오래되었다면 ‘확인 필요’로 표시하고 어디서 확인할지 적어요.", "자료에 없는 정보를 요청했을 때의 안내 문장을 짝과 비교해요. 모른다고 말하는 답변도 유용할 수 있어요."]} />
      <aside className="lesson-takeaway"><h3>질문하기 전의 작은 습관</h3><p>비밀번호, API 키, 개인 연락처 등은 실습 질문에 넣지 않아요. 외부 AI API에 보낼 때는 질문과 참고 자료가 외부 서비스로 전달돼요. 공개된 식당 자료로 실습하고, 중요한 정보는 원본과 최신 출처를 확인해요.</p></aside>
      <LessonQuestions id="lesson-2-ai-notes" title="2회차 · 질문 비교와 검증" questions={[
        { key: "example", question: "생활 속 AI와 규칙 자동화는 어떻게 다른가요?", hint: "알람은 정해진 규칙, 스팸 분류 모델은 예시에서 패턴을 학습…" },
        { key: "comparison", question: "A·B·C 질문에 따라 결과가 어떻게 달라졌나요?", hint: "달라진 조건 / 결과 개수·형식 / 그대로인 점 / 더 유용했던 질문" },
        { key: "my-prompt", question: "내가 직접 질문한다면 어떻게 물어볼까요?", hint: "목적 + 대상·자료 + 출력 형식 + 확인 규칙" },
        { key: "evidence", question: "답변의 근거는 무엇이며, 더 확인할 정보는 무엇인가요?", hint: "답변 문장 / CSV에서 확인한 내용 / 자료에 없는 내용 / 추가 확인할 곳" },
      ]} />
    </LessonSection>
    <LessonSection id="ai-review" eyebrow="01:55–02:00 · 정리" title="내 말로 설명해봐요" intro="답을 펼치기 전에 짝에게 먼저 설명해요. 오늘 가장 유용했던 질문 하나를 함께 공유하세요.">
      <Review items={[
        { question: "AI, 머신러닝, LLM은 모두 같은 뜻인가요?", answer: "AI는 넓은 분야, 머신러닝은 데이터에서 패턴을 배우는 방법, 오늘의 LLM은 딥러닝으로 많은 텍스트를 학습한 언어 모델이에요." },
        { question: "CSV를 질문에 붙이면 모델을 새로 학습시키나요?", answer: "이 앱에서는 참고 자료를 문맥으로 제공해 추론해요. 모델 가중치를 바꾸는 학습과 달라요." },
        { question: "식당을 검색하는 건 LLM인가요?", answer: "이 앱에서는 우리 서버의 코드가 먼저 CSV를 검색해요. 검색한 식당 자료를 질문·대화·규칙과 함께 LLM에 보내고, LLM이 이를 참고해 답변 문장을 만들어요." },
        { question: "질문이 구체적이면 답변은 항상 정확한가요?", answer: "원하는 결과에 도움이 되지만 정확성을 보장하지는 않아요. 원본, 데이터 갱신 시점, 모르는 정보를 확인해야 해요." },
      ]} />
      <aside className="lesson-example"><strong>다음 시간까지 · 만들 앱의 핵심 기능 정하기</strong><p>오늘 배운 입력·처리·결과로 내 앱을 한 문장으로 설명해보세요. 3회차에는 설계와 AI에게 보낼 요청을 정리하고, 마지막에 내 컴퓨터의 바이브 코딩 환경을 준비해요.</p></aside>
      <div className="lesson-references"><span>개념 참고 자료</span>{LESSON_TWO_REFERENCES.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</div>
    </LessonSection>
  </div>;
}
