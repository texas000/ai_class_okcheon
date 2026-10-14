import Link from "next/link";
import { Activity, LessonSection, Review } from "./lesson-blocks.js";
import LessonWorksheet from "./lesson-worksheet.js";
import { COURSE_SESSIONS } from "../lib/practice-guide.js";
import { SYLLABUS_DETAILS } from "../lib/lesson-one.js";

export default function LessonOne() {
  return <div className="lesson-content lesson-one">
    <LessonSection id="course-roadmap" eyebrow="COURSE ROADMAP" title="8회차 동안 이렇게 결과물을 만들어요" intro="강의는 아래 날짜의 19시부터 21시까지 진행해요. 오늘의 앱 아이디어가 데이터와 AI를 만나 실제로 접속할 수 있는 나만의 앱으로 발전합니다.">
      <section className="syllabus" aria-labelledby="syllabus-title">
        <div className="syllabus-table-wrap"><table className="syllabus-table"><caption>강의 일정 (19시~21시)</caption><thead><tr><th scope="col">회차</th><th scope="col">날짜</th><th scope="col">무엇을 배우나요?</th><th scope="col">함께 만들 결과물</th></tr></thead><tbody>{SYLLABUS_DETAILS.map((item) => {
          const session = COURSE_SESSIONS.find((course) => course.number === item.number);
          return <tr key={item.number}><th scope="row"><Link href={`/guide/${item.number}`}>{item.number}회차</Link></th><td className="syllabus-date">{session.date}</td><td><strong>{session.title}</strong><span>{item.topic}</span></td><td>{item.outcome}</td></tr>;
        })}</tbody></table></div>
      </section>
    </LessonSection>

    <LessonSection id="ice-breaking" eyebrow="00:00–00:25 · 아이스브레이킹" title="이름·직업·취미·만들고 싶은 앱을 소개해요" intro="길게 발표하지 않아도 괜찮아요. 아래 문장을 이어서 30초 정도로 말해봅니다.">
      <div className="teaching-grid"><article><h3>① 나의 이름</h3><p>“안녕하세요. 저는 ___입니다.” 편하게 불리고 싶은 이름이나 호칭을 말해요.</p></article><article><h3>② 나의 직업 또는 하는 일</h3><p>“저는 ___ 일을 하고 있어요.” 직업이 아니라 자주 하는 일이나 맡은 역할을 말해도 좋아요.</p></article><article><h3>③ 나의 취미와 관심사</h3><p>“저는 요즘 ___을 좋아해요.” 산책, 요리, 농사, 운동, 음악처럼 편한 주제를 골라요.</p></article><article><h3>④ 만들고 싶은 App</h3><p>“저는 ___을 도와주는 앱을 만들고 싶어요.” 아직 없다면 줄이고 싶은 불편함을 말해요.</p></article></div>
      <Activity title="30초 자기소개 릴레이" steps={["이름·직업 또는 하는 일·취미·만들고 싶은 앱을 한 문장씩 준비해요.", "한 사람씩 30초 안에 말해요.", "나와 비슷한 취미나 앱 아이디어가 나오면 손을 들어 표시해요.", "서로의 아이디어를 평가하지 않고 궁금한 점 하나만 질문해요."]} />
    </LessonSection>

    <LessonSection id="ideation-problems" eyebrow="00:25–00:45 · 아이데이션 ① 문제 발견" title="생활 속 불편함에서 앱 아이디어를 시작해요" intro="아이데이션(Ideation)은 해결할 문제를 찾고 여러 해결 아이디어를 만들어보는 과정이에요. 먼저 누가 어떤 상황에서 불편한지 살펴봅니다.">
      <div className="teaching-grid"><article><h3>반복하는 일</h3><p>매번 손으로 기록하거나 같은 설명을 되풀이하는 일은 무엇인가요? 예: 농작업 기록 정리, 가게 위치와 메뉴 안내.</p></article><article><h3>찾기 어려운 정보</h3><p>정보가 흩어져 있어 여러 곳을 찾아봐야 하는 일은 무엇인가요? 예: 옥천 식당의 위치와 특징 비교.</p></article><article><h3>결정하기 어려운 순간</h3><p>선택지가 많아 시간을 쓰는 일은 무엇인가요? 예: 퇴근 후 오늘 저녁을 먹을 식당 고르기.</p></article><article><h3>현재 해결 방법의 불편함</h3><p>지금은 어떻게 해결하나요? 검색, 전화, 메모에서 번거로운 단계를 찾아요. 예: 검색 결과를 하나씩 열어 주소를 비교하기.</p></article></div>
      <aside className="lesson-takeaway"><h3>문제 발견 양식</h3><p>“<b>___한 사람</b>은 <b>___할 때</b> <b>___ 때문에</b> 불편해요. 지금은 <b>___</b>으로 해결하지만 <b>___</b>이 번거로워요.”</p></aside>
      <aside className="lesson-example"><strong>옥천 식당 앱의 출발점</strong><p>“외식을 자주 하는 옥천 주민은 저녁 식사할 곳을 정할 때, 검색 결과가 많아 비교하는 데 시간이 걸려요. 지금은 검색 결과를 하나씩 열어보지만 조건에 맞는 후보를 추리는 일이 번거로워요.”</p></aside>
      <Activity title="불편했던 순간 3개 찾기 · 20분" steps={["최근 일주일 동안 번거롭거나 시간이 오래 걸린 순간 3개를 적어요. (5분)", "각 순간에 누가, 언제, 무엇 때문에 불편했는지 문제 발견 양식으로 써요. (5분)", "짝에게 지금의 해결 방법을 설명하고 ‘어느 단계가 가장 번거로워요?’를 물어봐요. (5분)", "자주 발생하고 해결하고 싶은 문제 하나를 골라요. (5분)"]} />
    </LessonSection>

    <LessonSection id="ideation-solutions" eyebrow="00:55–01:15 · 아이데이션 ② 아이디어 발산과 선택" title="해결 방법을 여러 개 내고 만들 앱 하나를 골라요" intro="같은 문제도 여러 방식으로 해결할 수 있어요. 먼저 아이디어를 넓게 낸 다음 사용자에게 도움이 되고 수업에서 만들 수 있는 작은 앱을 고릅니다.">
      <aside className="lesson-takeaway"><h3>아이디어를 여는 질문</h3><p>“어떻게 하면 <b>___한 사람</b>이 <b>___을 더 쉽게 / 빠르게</b> 할 수 있을까요?”</p><p>예: “어떻게 하면 옥천 주민이 조건에 맞는 저녁 식당을 더 빠르게 고를 수 있을까요?”</p></aside>
      <div className="course-table-wrap"><table className="course-table"><caption>하나의 문제에서 나온 서로 다른 앱 아이디어</caption><thead><tr><th scope="col">해결 아이디어</th><th scope="col">사용자가 하는 일 → 앱의 결과</th><th scope="col">필요한 자료</th></tr></thead><tbody><tr><th scope="row">대화로 찾는 식당 챗봇</th><td>지역·음식 종류를 질문해요 → 조건에 맞는 식당 후보와 주소를 받아요.</td><td>식당 이름·지역·업태·주소</td></tr><tr><th scope="row">조건을 고르는 비교 앱</th><td>지역과 음식 종류를 선택해요 → 후보 3곳을 나란히 비교해요.</td><td>식당 목록과 검색 조건별 정보</td></tr><tr><th scope="row">새로운 곳을 찾는 탐색 앱</th><td>이미 방문한 곳을 표시해요 → 방문하지 않은 다른 후보를 받아요.</td><td>식당 목록과 사용자의 방문 기록</td></tr></tbody></table></div>
      <div className="teaching-grid"><article><h3>사용자에게 필요한가요?</h3><p>고른 문제를 실제로 줄여주나요? 짝에게 설명하고 어떤 상황에서 쓸지 물어봐요.</p></article><article><h3>자료를 구할 수 있나요?</h3><p>답변에 필요한 표·문서·기록이 있나요? 자료가 없는 기능은 따로 표시해요.</p></article><article><h3>작게 시작할 수 있나요?</h3><p>첫 버전은 핵심 동작 하나로 정해요. 예: 조건 질문 → 식당 후보와 주소 표시.</p></article><article><h3>결과를 확인할 수 있나요?</h3><p>질문 하나와 기대 결과를 말할 수 있나요? 다음 단계에서 요구사항과 확인 기준으로 정리해요.</p></article></div>
      <Activity title="아이디어 3개에서 첫 앱 하나 고르기 · 20분" steps={["고른 문제를 ‘어떻게 하면…?’ 질문으로 바꿔요. (3분)", "해결 아이디어를 3개 적어요. 이때는 평가하지 말고 서로 다른 방법을 생각해요. (5분)", "각 아이디어의 사용자 입력, 앱이 보여줄 결과, 필요한 자료를 적어요. (5분)", "사용자 필요·자료 확보·작은 구현·결과 확인을 기준으로 비교하고 하나를 골라요. (5분)", "선택한 이유를 짝에게 설명하고 다음 단계에서 페르소나와 요구사항을 만들어요. (2분)"]} />
    </LessonSection>

    <LessonSection id="app-idea" eyebrow="01:15–01:45 · 아이디어와 요구사항 만들기" title="누구를 위한 앱인지 정하고 요구사항으로 연결해요" intro="페르소나 → 사용 상황과 문제 → 원하는 결과 → 필요한 기능 → 확인 기준 순서로 앱 아이디어를 구체화합니다.">
      <aside className="lesson-takeaway"><h3>한 문장 양식</h3><p>“이 앱은 <b>___한 사람</b>이 <b>___할 수 있도록</b> <b>___을 도와줘요.</b>”</p></aside>
      <div className="teaching-grid"><article><h3>① 타겟 사용자 정하기</h3><p>“모든 사람”보다 앱을 자주 쓸 구체적인 사람을 정해요. 어디에 사는지, 어떤 생활을 하는지, 언제 앱이 필요한지를 생각합니다.</p></article><article><h3>② 페르소나(Persona) 만들기</h3><p>타겟 사용자를 대표하는 가상의 한 사람이에요. 이름·나이·지역뿐 아니라 행동, 관심사, 불편함과 목표를 적어요. 나이와 성별만으로 취향을 단정하지 않아요.</p></article><article><h3>③ 문제와 목표 연결하기</h3><p>“식당 정보를 찾고 비교하는 데 오래 걸린다”는 문제를 “식사할 곳을 빠르게 결정한다”는 목표로 바꿔요.</p></article><article><h3>④ 요구사항(Requirements) 쓰기</h3><p>목표를 이루려면 앱이 무엇을 해야 하는지 적어요. 화면 형태, 검색 조건, 보여줄 정보와 잘 작동하는지 확인할 기준까지 정합니다.</p></article></div>
      <aside className="lesson-example"><h3>페르소나 예시 · 옥천에 사는 30대 남자</h3><p><strong>김민수(가명), 35세, 옥천 거주.</strong> 외식을 자주 하고 새로운 식당을 발견하는 것을 좋아해요. 식사 직전에 휴대폰으로 식당을 찾지만 여러 검색 결과를 비교하는 데 시간이 오래 걸려요.</p><p><strong>사용 상황:</strong> 퇴근 후 저녁을 먹기 전에 “오늘은 어디서 먹지?”를 고민해요. 원하는 조건을 말하면 후보를 짧게 비교하고 바로 결정하고 싶어요.</p><p><strong>목표:</strong> 새로운 곳을 탐색하면서도 식사할 장소를 빠르게 정하기.</p><p><strong>앱 소개:</strong> “이 앱은 옥천에 살며 외식을 자주 하고 새로운 식당을 찾는 사람이 식사할 곳을 빠르게 결정할 수 있도록, 대화로 조건에 맞는 식당과 비교 정보를 알려줘요.”</p></aside>
      <aside className="lesson-takeaway"><h3>요구사항을 만드는 공식</h3><p><b>누가 + 언제/어떤 상황에서 + 무엇을 하고 싶은가 + 앱이 해야 할 일 + 확인 기준</b></p><p>“옥천에서 외식을 자주 하는 사람이 저녁 식사 전에 장소를 빨리 정할 수 있도록, 앱은 질문에 맞는 식당 후보를 최대 3곳 보여주고 이름·주소·추천 이유를 비교할 수 있게 한다.”</p></aside>
      <div className="course-table-wrap"><table className="course-table"><caption>옥천 식당 찾기 앱 · 요구사항 예시 (설계 예시이며 현재 앱의 기능과는 다를 수 있어요)</caption><thead><tr><th scope="col">요구사항</th><th scope="col">구체적인 동작</th><th scope="col">확인 기준·예시 질문</th></tr></thead><tbody>
        <tr><th scope="row">챗봇 형태의 웹페이지</th><td>휴대폰과 PC의 브라우저에서 질문을 입력하고 대화 형태로 답변을 읽을 수 있어야 해요.</td><td>질문 입력창·전송 버튼·대화 목록이 보이고, 휴대폰에서도 글과 버튼을 사용할 수 있어요.</td></tr>
        <tr><th scope="row">빠르게 후보 비교하기</th><td>지역·음식 종류 등 사용자가 말한 조건에 맞는 후보를 최대 3곳 보여주고 이름·주소·추천 이유를 짧게 안내해요.</td><td>“옥천읍에서 한식 먹을 곳 3곳 알려줘.” → 조건에 맞는 후보를 한 답변에서 비교해요.</td></tr>
        <tr><th scope="row">가장 큰 식당 찾기</th><td>시설총규모(면적) 값이 있는 영업 중 식당을 큰 순서로 비교하고, 면적과 비교 기준을 표시해요.</td><td>“옥천에서 가장 큰 식당은?” → 유효한 면적 중 가장 큰 값을 고르고 근거를 보여줘요. 좌석 수와는 다른 기준이에요.</td></tr>
        <tr><th scope="row">가장 오래된 식당 찾기</th><td>영업 중 식당의 인허가일자를 이른 순서로 비교하고 해당 날짜를 표시해요.</td><td>“옥천에서 가장 오래된 식당은?” → 인허가일자가 가장 이른 곳을 알려줘요. 실제 창업일과 다를 수 있음을 설명해요.</td></tr>
        <tr><th scope="row">새로운 식당 탐색하기</th><td>최근 인허가일자 순으로 후보를 보여줘요. 이미 방문한 곳을 사용자가 말하면 다른 후보를 찾아줘요.</td><td>“최근에 인허가를 받은 식당 3곳 알려줘.” → 날짜를 함께 보여주고 실제 개업일로 단정하지 않아요.</td></tr>
        <tr><th scope="row">자료가 없을 때 안내하기</th><td>면적·날짜 등 필요한 값이 없는 행은 순위 비교에서 제외해요. 답변에 자료 출처와 확인 가능한 범위를 알려줘요.</td><td>비교할 값이 없으면 “자료에서 확인할 수 없어요”라고 안내해요. 데이터에 없는 영업시간·맛·인기도는 만들어내지 않아요.</td></tr>
      </tbody></table></div>
      <aside className="lesson-example"><strong>막연한 바람을 확인 가능한 요구사항으로 바꾸기</strong><p>“좋은 식당을 빨리 찾아줘” → “옥천의 영업 중 식당에서 사용자가 말한 지역과 음식 종류에 맞는 후보를 최대 3곳 보여주고, 이름·주소·추천 이유를 함께 표시한다.”</p><p>처음에는 대화 화면과 조건 검색, 짧은 결과 비교부터 만들어요. 면적·인허가일자 순위는 자료가 있는지 확인한 뒤 추가합니다. 위 요구사항은 설계 예시이므로 지금 체험하는 앱이 모두 지원하는 것은 아니에요.</p></aside>
      <Activity title="내 페르소나와 요구사항 만들기" steps={["타겟을 대표하는 가상의 한 사람을 정하고 생활·관심사·행동을 적어요.", "그 사람이 앱을 사용할 상황과 불편함, 원하는 결과를 적어요.", "한 문장 양식으로 앱을 소개해요.", "요구사항 공식에 맞춰 꼭 필요한 기능 3개와 각각의 확인 기준을 써요.", "짝이 사용자 역할로 예시 질문을 해보고, 어떤 결과가 나와야 하는지 확인해요."]} />
      <LessonWorksheet id="lesson-1-app-idea" title="1회차 · 나의 앱 아이디어 보내기" fields={[
        { key: "app_name", label: "만들고 싶은 앱 이름", example: "아직 정하지 못했다면 임시 이름도 괜찮아요." },
        { key: "ideation", label: "생각한 해결 아이디어 3개와 선택한 이유", example: "예: 식당 챗봇 / 조건 비교 앱 / 미방문 식당 탐색 앱. 식당 자료가 있고 질문 한 번으로 후보를 볼 수 있는 챗봇을 골랐어요." },
        { key: "user", label: "누가 사용하나요?", example: "예: 옥천을 처음 방문한 사람, 우리 가게 손님, 농작업을 기록하는 나" },
        { key: "persona", label: "페르소나 · 타겟을 대표하는 한 사람", example: "예: 옥천 거주 35세 남자. 외식을 자주 하고 새로운 식당을 좋아하며, 휴대폰으로 식사할 곳을 빨리 정하고 싶어요." },
        { key: "situation", label: "언제 앱을 쓰고, 어떤 결과를 원하나요?", example: "예: 퇴근 후 저녁 식사 전, 여러 검색 결과를 비교하지 않고 조건에 맞는 식당 후보를 보고 빨리 결정하고 싶어요." },
        { key: "problem", label: "어떤 불편함이나 문제를 해결하나요?", example: "사용자가 언제 무엇 때문에 불편한지 적어보세요." },
        { key: "help", label: "앱은 어떤 도움을 주나요?", example: "가장 중요한 도움 한 가지만 적어보세요." },
        { key: "one_sentence", label: "내 앱을 한 문장으로 소개해요", example: "이 앱은 ___한 사람이 ___할 수 있도록 ___을 도와줘요." },
        { key: "requirements", label: "꼭 필요한 요구사항 3개", example: "예: ① 챗봇 형태의 웹페이지 ② 시설총규모 기준으로 가장 큰 식당 검색 ③ 인허가일자 기준으로 가장 오래된 식당 검색" },
        { key: "acceptance", label: "잘 작동하는지 어떻게 확인하나요?", example: "각 요구사항마다 질문과 기대 결과를 적어요. 예: ‘가장 큰 식당은?’ → 유효한 면적 중 최댓값인 식당 이름·주소·면적·출처를 보여줘요." },
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
