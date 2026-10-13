import Link from "next/link";
import { Activity, LessonSection, Review } from "./lesson-blocks.js";
import LessonWorksheet from "./lesson-worksheet.js";
import { COURSE_SESSIONS } from "../lib/practice-guide.js";
import { SYLLABUS_DETAILS } from "../lib/lesson-one.js";

const INTRO_EXAMPLES = [
  { title: "농업에 종사하는 분", answer: "안녕하세요, 저는 김옥천입니다. 옥천에서 포도 농사를 짓고 있어요. 취미는 요리 영상 보기이고, 농작업 기록을 쉽게 정리해 주는 앱을 만들고 싶어요." },
  { title: "가게를 운영하는 분", answer: "안녕하세요, 저는 이향수입니다. 작은 카페를 운영해요. 산책과 사진 찍기를 좋아하고, 손님 질문에 메뉴와 매장 정보를 알려주는 앱을 만들고 싶어요." },
  { title: "아직 아이디어가 없는 분", answer: "안녕하세요, 저는 박이원입니다. 사무 업무를 하고 있고 취미는 드라마 보기예요. 아직 만들 앱은 정하지 못했지만, 반복해서 하는 일을 줄여주는 앱을 찾아보고 싶어요." },
];

export default function LessonOne() {
  return <div className="lesson-content lesson-one">
    <LessonSection id="course-roadmap" eyebrow="COURSE ROADMAP" title="8회차 동안 이렇게 결과물을 만들어요" intro="오늘의 앱 아이디어가 데이터와 AI를 만나 실제로 접속할 수 있는 나만의 앱으로 발전합니다.">
      <section className="syllabus" aria-labelledby="syllabus-title">
        <div className="syllabus-table-wrap"><table className="syllabus-table"><caption className="sr-only">회차별 수업 내용과 결과물</caption><thead><tr><th scope="col">회차</th><th scope="col">무엇을 배우나요?</th><th scope="col">함께 만들 결과물</th></tr></thead><tbody>{SYLLABUS_DETAILS.map((item) => <tr key={item.number}><th scope="row"><Link href={`/guide/${item.number}`}>{item.number}회차</Link></th><td><strong>{COURSE_SESSIONS.find((session) => session.number === item.number).title}</strong><span>{item.topic}</span></td><td>{item.outcome}</td></tr>)}</tbody></table></div>
      </section>
    </LessonSection>

    <LessonSection id="ice-breaking" eyebrow="00:00–00:25 · 아이스브레이킹" title="이름·직업·취미·만들고 싶은 앱을 소개해요" intro="길게 발표하지 않아도 괜찮아요. 아래 문장을 이어서 30초 정도로 말해봅니다.">
      <div className="teaching-grid"><article><h3>① 나의 이름</h3><p>“안녕하세요. 저는 ___입니다.” 편하게 불리고 싶은 이름이나 호칭을 말해요.</p></article><article><h3>② 나의 직업 또는 하는 일</h3><p>“저는 ___ 일을 하고 있어요.” 직업이 아니라 자주 하는 일이나 맡은 역할을 말해도 좋아요.</p></article><article><h3>③ 나의 취미와 관심사</h3><p>“저는 요즘 ___을 좋아해요.” 산책, 요리, 농사, 운동, 음악처럼 편한 주제를 골라요.</p></article><article><h3>④ 만들고 싶은 App</h3><p>“저는 ___을 도와주는 앱을 만들고 싶어요.” 아직 없다면 줄이고 싶은 불편함을 말해요.</p></article></div>
      <Activity title="30초 자기소개 릴레이" steps={["이름·직업 또는 하는 일·취미·만들고 싶은 앱을 한 문장씩 준비해요.", "한 사람씩 30초 안에 말해요.", "나와 비슷한 취미나 앱 아이디어가 나오면 손을 들어 표시해요.", "서로의 아이디어를 평가하지 않고 궁금한 점 하나만 질문해요."]} />
    </LessonSection>

    <LessonSection id="intro-examples" eyebrow="00:25–00:45 · 모범 답변" title="이렇게 말하면 충분해요" intro="멋진 아이디어보다 내가 실제로 겪는 일과 관심사를 솔직하게 말하는 것이 좋은 시작입니다.">
      <div className="teaching-grid">{INTRO_EXAMPLES.map((example) => <article key={example.title}><h3>{example.title}</h3><p>{example.answer}</p></article>)}</div>
      <aside className="lesson-example"><strong>앱 아이디어가 바로 떠오르지 않을 때</strong><p>“자주 반복하는 일”, “매번 찾아보는 정보”, “다른 사람에게 자주 설명하는 것” 중 하나를 떠올려보세요. 불편함이 작아도 앱의 좋은 출발점이 됩니다.</p></aside>
    </LessonSection>

    <LessonSection id="app-observation" eyebrow="00:55–01:15 · 앱 관찰" title="내가 자주 쓰는 앱에서 힌트를 찾아요" intro="익숙한 앱 하나를 고르고 누구에게 어떤 도움을 주는지 살펴봅니다.">
      <div className="course-table-wrap"><table className="course-table"><caption>앱 아이디어 찾기 예시</caption><thead><tr><th>불편함·관심사</th><th>만들 수 있는 앱</th></tr></thead><tbody><tr><th scope="row">농작업 기록이 흩어져요</th><td>날짜별 작업과 사진을 정리하는 도우미</td></tr><tr><th scope="row">손님이 같은 질문을 자주 해요</th><td>가게 정보와 메뉴를 안내하는 챗봇</td></tr><tr><th scope="row">동네 정보를 찾기 어려워요</th><td>지역 장소와 행사를 찾아주는 안내 앱</td></tr><tr><th scope="row">긴 문서를 읽기 어려워요</th><td>중요 내용을 쉬운 말로 정리하는 도우미</td></tr></tbody></table></div>
      <Activity title="자주 쓰는 앱 하나 소개하기" steps={["지도, 메신저, 쇼핑, 은행 앱 중 자주 쓰는 하나를 골라요.", "그 앱을 언제, 왜 사용하는지 짝에게 말해요.", "내가 누르는 것과 앱이 보여주는 결과를 하나씩 찾아요.", "내 아이디어에도 비슷한 도움을 줄 수 있는지 이야기해요."]} />
    </LessonSection>

    <LessonSection id="app-idea" eyebrow="01:15–01:45 · 아이디어 만들기" title="누구에게 어떤 도움을 줄지 한 문장으로 만들어요" intro="기능을 많이 정하지 않고 사용자와 도움 한 가지에 집중합니다.">
      <aside className="lesson-takeaway"><h3>한 문장 양식</h3><p>“이 앱은 <b>___한 사람</b>이 <b>___할 수 있도록</b> <b>___을 도와줘요.</b>”</p></aside>
      <Activity title="내 앱 한 문장 만들기" steps={["도움을 받을 사람을 한 명 또는 한 집단으로 정해요.", "그 사람이 겪는 불편함이나 하고 싶은 일을 정해요.", "앱이 제공할 가장 중요한 도움 한 가지를 정해요.", "짝에게 말해보고 어떤 앱인지 바로 이해되는지 확인해요."]} />
      <LessonWorksheet id="lesson-1-app-idea" title="1회차 · 나의 앱 아이디어 보내기" fields={[
        { key: "app_name", label: "만들고 싶은 앱 이름", example: "아직 정하지 못했다면 임시 이름도 괜찮아요." },
        { key: "user", label: "누가 사용하나요?", example: "예: 옥천을 처음 방문한 사람, 우리 가게 손님, 농작업을 기록하는 나" },
        { key: "problem", label: "어떤 불편함이나 문제를 해결하나요?", example: "사용자가 언제 무엇 때문에 불편한지 적어보세요." },
        { key: "help", label: "앱은 어떤 도움을 주나요?", example: "가장 중요한 도움 한 가지만 적어보세요." },
        { key: "one_sentence", label: "내 앱을 한 문장으로 소개해요", example: "이 앱은 ___한 사람이 ___할 수 있도록 ___을 도와줘요." },
      ]} />
      <Review items={[
        { question: "기능을 많이 넣어야 좋은 앱인가요?", answer: "아니요. 처음에는 한 가지 문제를 끝까지 해결하는 앱이 이해하고 만들기 쉬워요." },
        { question: "AI가 꼭 필요한 앱이어야 하나요?", answer: "아니요. 먼저 필요한 도움을 정하고, 질문에 답하거나 내용을 정리하는 일이 필요할 때 AI를 사용할 수 있어요." },
      ]} />
    </LessonSection>

    <LessonSection id="first-chat" eyebrow="01:45–02:00 · 결과물 미리보기" title="마지막에는 이런 AI App을 직접 만들어요" intro="사용자가 질문하면 내가 준비한 데이터를 찾아 답하고, 인터넷 주소로 다른 사람에게 보여줄 수 있는 AI 에이전트를 완성합니다.">
      <div className="release-pipeline" aria-label="아이디어, 데이터, AI 역할, 배포 순서"><article><span>01</span><h3>아이디어</h3><p>누구를 도울지 정해요</p></article><article><span>02</span><h3>데이터</h3><p>답변할 자료를 준비해요</p></article><article><span>03</span><h3>AI 역할</h3><p>말투와 규칙을 정해요</p></article><article><span>04</span><h3>공유</h3><p>웹 주소로 발표해요</p></article></div>
      <aside className="lesson-example"><strong>지금 체험할 결과물</strong><p>현재 AI Chat은 옥천 식당 데이터를 참고해 질문에 답하는 예시 앱이에요. 앞으로는 이름, 데이터와 역할을 바꿔 나만의 AI 에이전트로 발전시킵니다.</p></aside>
      <Link className="lesson-primary-action" href="/">AI Chat에서 결과물 체험하기 →</Link>
    </LessonSection>
  </div>;
}
