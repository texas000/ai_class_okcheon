import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonWorksheet from "./lesson-worksheet.js";
import ApplicationFlow from "./application-flow.js";

export default function LessonThree() {
  return <div className="lesson-content">
    <LessonSchedule number={3} />
    <LessonSection id="app-warmup" eyebrow="00:00–00:10 · 관찰" title="오늘 어떤 앱을 사용했나요?" intro="Application(애플리케이션)은 사용자가 어떤 일을 하도록 돕는 소프트웨어예요. 줄여서 ‘앱’이라고 부릅니다.">
      <Activity title="내가 쓰는 앱 하나 소개하기" steps={["지도, 메신저, 배달, 일정 앱 중 자주 사용하는 하나를 골라요. 브라우저로 쓰는 서비스도 괜찮아요.", "‘누가, 어떤 상황에서, 무엇을 하려고 쓰는가’를 한 문장으로 말해요.", "내가 입력한 것과 앱이 보여준 결과를 짝에게 설명해요. 앱의 이름보다 해결하는 문제에 집중해요."]} />
    </LessonSection>
    <LessonSection id="app-basics" eyebrow="00:10–00:30 · 개념" title="앱을 입력 → 처리 → 결과로 나눠봐요" intro="화면에 보이는 버튼뿐 아니라, 입력을 받아 필요한 일을 수행하는 과정까지 앱의 일부예요.">
      <div className="input-output-map"><div><span>INPUT</span><h3>입력</h3><p>사용자가 주는 정보<br />목적지, 검색어, 질문</p></div><span aria-hidden="true">→</span><div><span>PROCESS</span><h3>처리</h3><p>계산하거나 자료를 찾는 일<br />경로 계산, 검색, 답변 생성</p></div><span aria-hidden="true">→</span><div><span>OUTPUT</span><h3>결과</h3><p>사용자에게 보여주는 것<br />지도, 목록, 대화 메시지</p></div></div>
      <div className="course-table-wrap"><table className="course-table"><caption>익숙한 앱을 세 부분으로 분석해요</caption><thead><tr><th>앱</th><th>입력</th><th>처리</th><th>결과</th></tr></thead><tbody><tr><th scope="row">계산기</th><td>숫자와 연산</td><td>계산 규칙 실행</td><td>계산된 숫자</td></tr><tr><th scope="row">지도</th><td>출발지와 목적지</td><td>지도 자료로 경로 계산</td><td>경로와 예상 시간</td></tr><tr><th scope="row">옥천 챗봇</th><td>지역·업소 질문</td><td>CSV 검색 + AI 답변 생성</td><td>답변과 참고 자료</td></tr></tbody></table></div>
      <div className="teaching-grid"><article><h3>웹 앱과 설치형 앱</h3><p>웹 앱은 브라우저에서 주소로 접속해 사용해요. 설치형 앱은 기기에 설치해 사용해요. 둘 다 사용자의 일을 돕고, 인터넷을 쓰는지는 기능에 따라 달라요. 우리는 주소로 공유할 수 있는 웹 앱을 만들어요.</p></article><article><h3>앱과 AI 모델의 관계</h3><p>모델은 앱 안의 한 기능을 맡을 수 있어요. 우리 챗봇에서 AI는 답변 문장을 만들고, 앱은 입력·자료 검색·전송·오류 안내·결과 표시를 관리해요. 계산기처럼 AI 없이 동작하는 앱도 많아요.</p></article></div>
      <Activity title="앱의 세 칸을 채워보기" steps={["처음에 고른 앱의 입력 / 처리 / 결과를 각각 적어요. 내부 처리는 추측이라면 ‘예상’이라고 표시해요.", "‘검색어는 입력, 검색 버튼은 입력을 보내는 화면 요소’처럼 정보와 화면 요소를 구분해요.", "짝이 그 설명만 듣고 앱을 사용할 수 있는지 확인해요."]} />
    </LessonSection>
    <LessonSection id="app-structure" eyebrow="00:30–00:50 · 구조" title="식당의 홀과 주방처럼 함께 일해요" intro="온라인 앱의 구조를 식당에 비유해요. 실제 앱에서는 화면과 서버가 요청·응답으로 정보를 주고받아요.">
      <div className="restaurant-analogy"><article><span>01 · 홀과 메뉴판</span><h3>프런트엔드 · 화면</h3><p>손님이 메뉴를 보고 주문하듯 사용자가 보고 조작하는 부분이에요. 입력창, 버튼, 답변 표시를 담당해요.</p><small>우리 앱: 브라우저의 대화 화면</small></article><article><span>02 · 주방</span><h3>백엔드 · 서버 처리</h3><p>주문을 받아 조리하듯 요청을 검사하고 자료 검색과 AI 호출을 수행해요. 여기서 ‘서버’는 요청을 처리하는 프로그램과 실행 환경을 뜻해요.</p><small>우리 앱: /api/chat 서버 기능</small></article><article><span>03 · 재료 목록</span><h3>데이터 · 참고할 정보</h3><p>주방이 재료 목록을 보듯 코드가 필요한 자료를 읽어요. 데이터는 파일이나 데이터베이스에 둘 수 있어요.</p><small>우리 앱: 식당 이름·주소가 담긴 CSV</small></article><article><span>04 · 정해진 주문 방식</span><h3>API · 요청과 응답의 약속</h3><p>주문서에 메뉴와 수량을 적는 규칙처럼, 다른 프로그램에 어떤 형식으로 부탁하고 결과를 받을지 정한 인터페이스예요.</p><small>우리 앱: /api/chat, NVIDIA API</small></article></div>
      <aside className="lesson-example"><strong>비유의 경계</strong><p>API는 실제 직원이나 비밀 열쇠가 아니라 프로그램을 사용하는 약속이에요. API 키는 외부 서비스를 사용할 권한을 증명하는 값이며 별개예요. 모든 앱에 서버나 외부 API가 꼭 필요한 것은 아니에요.</p></aside>
      <Activity title="네 가지 역할 카드 연결하기" steps={["입력창 / CSV / NVIDIA 요청 / 요청 형식 검사 / 답변 글자 표시를 종이나 메모에 적어요.", "각 항목을 화면·서버·데이터·외부 API에 연결해요. NVIDIA 요청은 우리 서버가 외부 API를 호출하는 협력이라고 설명해요.", "API 키를 메뉴판에 적으면 누구나 볼 수 있다는 비유로, 키를 서버에 두는 이유를 이야기해요."]} />
      <div className="course-table-wrap"><table className="course-table"><caption>앞으로 사용할 도구의 역할</caption><thead><tr><th>도구</th><th>이 수업에서 하는 일</th></tr></thead><tbody><tr><th scope="row">React</th><td>입력창·버튼·대화 목록처럼 화면을 구성하고 상호작용을 만드는 라이브러리</td></tr><tr><th scope="row">Next.js</th><td>React 화면, 페이지 주소, 서버 API를 한 프로젝트에서 만드는 프레임워크</td></tr><tr><th scope="row">GitHub</th><td>선생님이 준비한 코드를 온라인에 보관하는 곳</td></tr><tr><th scope="row">Vercel</th><td>준비된 코드를 실행해 접속할 수 있는 앱 주소를 만드는 곳</td></tr></tbody></table></div>
    </LessonSection>
    <LessonSection id="app-flow" eyebrow="01:00–01:25 · 동작 체험" title="한 번의 질문은 어디로 이동할까요?" intro="휴식 후, 우리 앱의 동작을 따라가요. 지금은 파일 이름을 외우기보다 각 부분의 역할과 이동 순서를 이해해요.">
      <ApplicationFlow />
      <Activity title="사람이 앱이 되어보는 역할극" steps={["3~4명이 사용자·화면·서버·AI 역할을 나눠요. 서버 역할에게 ‘업소명 / 주소’ 자료 카드를 줘요. 인원이 적으면 한 사람이 두 역할을 맡아요.", "사용자가 질문을 쓰면 화면 → 서버로 전달해요. 서버는 자료에서 관련 행을 찾고, 자료와 질문을 AI 역할에게 함께 줘요.", "AI 역할은 자료 안의 사실로 답변을 쓰고 서버를 거쳐 화면으로 돌려줘요. 화면은 한 문장씩 읽어 스트리밍을 흉내 내요.", "이번에는 자료에 없는 질문을 보내요. 어느 역할이 검색 결과를 알리고, 어느 역할이 사용자에게 안내를 보여줄지 토론해요."]} />
      <div className="teaching-grid"><article><h3>자료가 없는 경우</h3><p>‘검색한 자료에서 찾지 못했어요. 이름이나 지역을 바꿔 질문해보세요.’처럼 다음 행동을 안내해요. 자료가 없다고 AI가 주소를 만들어내면 안 돼요.</p></article><article><h3>서버나 연결에 문제가 있는 경우</h3><p>계속 기다리게 하지 않고 실패한 상태와 다시 시도할 방법을 알려줘요. 생성 중에는 전송 상태가 보여야 하고, 완료 후에는 답변과 근거를 확인할 수 있어야 해요.</p></article></div>
    </LessonSection>
    <LessonSection id="app-design" eyebrow="01:25–01:50 · 설계" title="나의 앱 첫 설계도를 만들어요" intro="오늘은 코드를 입력하기 전에 사용자의 행동과 화면을 설계해요. 기능을 많이 넣기보다 핵심 기능 하나가 끝까지 동작하도록 계획해요.">
      <aside className="lesson-example"><strong>예시 · 옥천을 처음 방문하는 사람의 식당 도우미</strong><p>문제: 등록된 식당의 이름과 주소를 찾기 어려워요. 핵심 기능: 지역을 입력하면 업소와 주소를 보여줘요. 성공 기준: 입력한 지역의 업소 3곳을 근거와 함께 확인할 수 있어요. 범위: 메뉴·가격·예약은 이번 버전에서 제공하지 않아요.</p></aside>
      <LessonWorksheet id="lesson-3-app-design" title="3회차 · 나의 앱 설계 활동지" fields={[
        { key: "user", label: "사용자와 해결할 문제", example: "누가 / 어떤 상황에서 / 어떤 불편함을 겪나요?" },
        { key: "purpose", label: "앱 이름과 한 문장 소개", example: "이 앱은 ___가 ___할 수 있도록 ___을 도와줘요." },
        { key: "feature", label: "핵심 기능 하나와 성공 기준", example: "지역을 입력하면 업소명·주소 3곳을 참고 자료와 함께 볼 수 있어요." },
        { key: "flow", label: "입력 → 처리 → 결과", example: "지역 질문 → 서버가 CSV를 검색하고 AI에 전달 → 표와 근거 표시" },
        { key: "data", label: "필요한 자료와 제공하지 않을 정보", example: "자료와 출처 / 포함된 항목 / 없는 항목 / AI가 필요한 이유" },
        { key: "states", label: "대기·완료·빈 결과·오류 화면의 안내", example: "생성 중… / 참고 자료 펼치기 / 검색 조건 바꾸기 / 다시 시도하기" },
      ]} />
      <Activity title="종이 화면을 그리고 짝과 시험해요" steps={["화면에 제목, 첫 인사, 입력창, 전송 버튼, 결과 영역, 참고 자료 영역을 그려요. 화면을 꾸미기 전에 사용할 순서를 정해요.", "짝에게 ‘이 지역의 식당 3곳을 찾아보세요’라는 과제를 줘요. 설명 없이 어디를 누르는지 관찰해요.", "짝이 생성 중·검색 결과 없음·연결 실패 상황이라면 무엇을 기대하는지 물어봐요.", "헷갈린 문구나 빠진 안내 하나를 고쳐요. 발표 때 ‘이 관찰 때문에 이렇게 바꿨어요’라고 설명해요."]} />
    </LessonSection>
    <LessonSection id="app-review" eyebrow="01:50–02:00 · 공유" title="내 앱을 1분 안에 설명해봐요" intro="‘누구의 어떤 문제 → 핵심 기능 → 입력·처리·결과 → 확인할 근거’ 순서로 짝에게 설명하고 피드백을 받아요.">
      <Review items={[
        { question: "입력창과 CSV 검색은 각각 어디의 역할인가요?", answer: "입력창은 브라우저 화면의 프런트엔드, 이 앱의 CSV 검색은 서버의 백엔드 역할이에요. CSV 파일은 검색할 데이터예요." },
        { question: "AI 모델만 있으면 챗봇 앱이 완성되나요?", answer: "모델 외에도 입력 화면, 요청 처리, 자료 연결, 결과 표시, 기다림·오류 안내가 필요해요. 앱은 이 부분을 연결해 사용자가 실제로 이용하게 해요." },
        { question: "우리 앱에서 NVIDIA API 키는 어디에 두나요?", answer: "서버 환경변수에 보관해요. 사용자가 받는 브라우저 코드에 넣거나 GitHub에 키 파일을 올리지 않아요." },
      ]} />
      <aside className="lesson-takeaway"><h3>오늘의 결과물과 다음 수업</h3><p>앱 설계 활동지와 종이 화면을 보관하세요. 4회차에는 GitHub에 가입한 뒤 선생님이 준비한 챗봇을 코드 수정 없이 Vercel에 배포해요. 완성된 내 앱 주소에서 질문과 참고 자료를 직접 확인할 거예요.</p></aside>
      <div className="lesson-references"><span>구조 참고 자료</span><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview" target="_blank" rel="noreferrer">MDN · 브라우저와 서버의 요청·응답 ↗</a><a href="https://react.dev/" target="_blank" rel="noreferrer">React 공식 안내 ↗</a><a href="https://nextjs.org/docs" target="_blank" rel="noreferrer">Next.js 공식 문서 ↗</a></div>
    </LessonSection>
  </div>;
}
