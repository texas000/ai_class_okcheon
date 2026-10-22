import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonFiveSamples from "./lesson-five-samples.js";
import LessonFiveDataGuide from "./lesson-five-data-guide.js";
import { NEON_INSTRUCTION } from "../lib/connection-instructions.js";

function DatabaseDiagram({ title, description, steps, caption }) {
  return <figure className="db-diagram">
    <h3>{title}</h3>
    <p>{description}</p>
    <ol className="db-diagram-flow">{steps.map(({ place, name, detail }, index) => <li key={name}>
      <div className="db-diagram-node"><span>{place}</span><strong>{name}</strong><p>{detail}</p></div>
      {index < steps.length - 1 && <span className="db-diagram-arrow" aria-hidden="true">⇄</span>}
    </li>)}</ol>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export default function LessonFive() {
  return <div className="lesson-content">
    <LessonSchedule number={5} preparation="4회차 앱의 프로젝트 폴더, VS Code와 Neon 계정을 준비해요. 기존 SQLite·JSON 데이터는 백업하고 실제 DB 연결 문자열은 AI 채팅에 붙이지 않아요." />
    <LessonSection id="db-map" eyebrow="00:00–00:10 · DB 이해" title="앱을 껐다 켜도 남는 데이터를 만들어요" intro="DB(데이터베이스)는 정보를 표처럼 정리해 저장하는 곳이에요. 오늘은 Neon에서 제공하는 Postgres에 내 앱의 데이터를 연결합니다.">
      <div className="restaurant-analogy">
        <article><span>01 · 브라우저</span><h3>입력하고 확인해요</h3><p>행사, 일정, 작품 같은 정보를 입력하고 결과를 화면에서 봐요.</p></article>
        <article><span>02 · 앱 서버</span><h3>검사하고 요청해요</h3><p>입력값을 검사하고 DB에 저장·조회를 요청해요. 연결 비밀값은 서버에만 있어요.</p></article>
        <article><span>03 · Neon DB</span><h3>데이터를 보관해요</h3><p>앱 서버가 재시작돼도 기록을 유지하고 필요한 행을 찾아줘요.</p></article>
      </div>
      <aside className="lesson-example"><strong>앱은 접수 창구, 서버는 담당 직원, DB는 기록 보관함이에요</strong><p>앱(application)은 우리가 쓰는 프로그램이에요. 화면에서 “일정을 저장해 주세요”라고 요청하면, 처리 담당 코드가 내용을 확인하고 DB에 기록해요. 다시 목록을 열면 DB에서 기록을 찾아 화면에 보여줘요. DB 연결은 앱에 이 보관함을 읽고 쓰는 길을 만들어 주는 일이에요.</p></aside>
      <DatabaseDiagram title="① 웹 앱 · 브라우저에서 사용하는 앱" description="웹사이트 주소로 여는 앱이에요. 화면은 내 기기에 보이고, 데이터를 처리하는 서버와 DB는 별도로 있어요." steps={[
        { place: "내 컴퓨터·휴대폰", name: "브라우저 화면", detail: "일정을 입력하고 저장을 눌러요. 서버에 요청을 보내요." },
        { place: "앱 서버", name: "요청을 처리하는 코드", detail: "입력값을 확인하고 DB에 저장·조회를 요청해요." },
        { place: "온라인 저장 공간", name: "Neon DB", detail: "일정을 보관하고 저장 결과나 찾은 기록을 돌려줘요." },
      ]} caption="화살표는 요청과 응답이 오가는 길이에요. 요청은 화면 → 서버 → DB 순서로 전달되고, 저장 결과와 조회한 데이터는 반대 순서로 돌아와요. 수업 실습에서는 앱 서버를 내 컴퓨터에서 실행하고, Neon DB에는 인터넷으로 연결해요. 배포하면 앱 서버도 온라인에서 실행돼요." />
      <DatabaseDiagram title="② 데스크톱 앱 · 내 컴퓨터에만 저장하는 경우" description="컴퓨터에 설치해서 쓰는 앱이에요. DB도 내 컴퓨터 안에 둘 수 있어요. 개인 수첩처럼 사용하는 방식이에요." steps={[
        { place: "내 컴퓨터", name: "설치한 앱 화면", detail: "일정을 입력하거나 저장된 목록을 열어요." },
        { place: "같은 컴퓨터 안", name: "앱의 처리 코드", detail: "화면의 요청을 받아 컴퓨터 안의 DB를 읽고 써요." },
        { place: "같은 컴퓨터 안", name: "로컬 DB · 예: SQLite", detail: "데이터를 파일로 보관해 앱을 껐다 켜도 남아요." },
      ]} caption="외부 서비스가 필요 없는 기능은 인터넷 없이도 사용할 수 있어요. 다른 컴퓨터에 같은 앱을 설치해도 이 기록이 자동으로 옮겨지거나 공유되지는 않아요. 컴퓨터 고장·파일 삭제에 대비한 백업도 필요해요." />
      <DatabaseDiagram title="③ 데스크톱 앱 · 온라인 DB를 함께 사용하는 경우" description="설치형 앱도 인터넷으로 서버에 요청할 수 있어요. 여러 기기에서 같은 기록을 사용하려면 이런 구조를 만들 수 있어요." steps={[
        { place: "내 컴퓨터", name: "설치한 앱 화면", detail: "인터넷으로 서버의 정해진 요청 창구(API)에 저장·조회를 부탁해요." },
        { place: "온라인 앱 서버", name: "공통 접수 창구 · API", detail: "요청을 검사하고 DB를 읽고 써요. 로그인 연결 후에는 사용자 권한도 확인해요." },
        { place: "온라인 저장 공간", name: "공유하는 DB", detail: "웹 앱과 설치형 앱이 같은 서버를 이용하면 같은 기록을 조회할 수 있어요." },
      ]} caption="보통 배포하는 데스크톱 앱에 공용 DB 비밀번호를 넣지 않고 서버에서 관리해요. 이 온라인 기능은 인터넷이 필요해요. 오프라인 저장 후 동기화하려면 별도의 기능을 만들어야 해요." />
      <aside className="lesson-takeaway"><h3>DB를 연결하면 무엇이 달라질까요?</h3><p>화면에서만 잠깐 보이던 정보를 DB에 보관할 수 있어요. 다만 연결 정보만 넣으면 끝나는 것은 아니에요. 앱에 저장·조회·수정·삭제를 요청하는 코드가 있어야 실제로 작동해요.</p><p>다른 기기에 새 기록을 보여주려면 같은 서버·DB에서 다시 조회해야 해요. 모든 화면이 즉시 바뀌는 실시간 갱신과 로그인·사용자별 권한은 별도로 구현해야 해요. 로컬 DB든 온라인 DB든 데이터를 삭제하면 복구에 백업이 필요할 수 있어요.</p></aside>
      <aside className="lesson-takeaway"><h3>로그인은 다음 시간에 연결해요</h3><p>5회차는 샘플 데이터로 로컬 연결을 확인해요. 6회차에 Clerk으로 사용자와 권한을 연결한 뒤 공개 배포를 점검합니다. 사진·영상의 파일 내용은 DB와 별도 파일 저장소가 필요해요.</p></aside>
    </LessonSection>
    <LessonSection id="db-live-samples" eyebrow="실제 DB 연결 데모" title="Neon DB에서 가져온 데이터를 확인해요" intro="서버의 DATABASE_URL로 연결한 DB에 샘플 테이블을 만들었어요. 가상의 할 일 데이터와 테이블 구조를 직접 조회해 봅니다.">
      <LessonFiveSamples />
      <p className="course-note">더 알아보기: <a href="#db-normalization">정규화·비정규화</a> · <a href="#db-large-data-prompts">많은 데이터를 위한 프롬프트</a></p>
    </LessonSection>
    <LessonSection id="neon-setup" eyebrow="00:10–00:30 · Neon 준비" title="Neon 프로젝트를 만들고 연결 정보를 확인해요" intro="Neon은 클라우드에서 Postgres DB를 제공해요. 데이터베이스마다 접속 주소와 비밀번호가 포함된 연결 문자열이 있습니다.">
      <p><a className="lesson-action" href="https://console.neon.tech/" target="_blank" rel="noreferrer">Neon 가입·콘솔 열기 ↗</a></p>
      <Activity title="내 DB 준비하기" steps={["Neon에 가입하거나 로그인하고 내 앱 이름으로 프로젝트를 만들어요.", "리전과 사용량·요금 조건을 확인해요. 수업용 프로젝트와 실제 운영용 DB를 구분해요.", "Connect에서 사용할 브랜치와 DB를 확인하고 연결 문자열을 복사해요.", "VS Code에서 프로젝트의 .env.local을 열고 DATABASE_URL 값으로 붙여 넣어요. 이 값은 채팅·문서·GitHub에 공유하지 않아요.", "Vercel Marketplace로 연결했다면 공급자가 Neon인지, 연결한 프로젝트와 환경변수 이름이 맞는지 확인해요."]} />
      <div className="lesson-code-example"><span className="code-file">.env.example · 실제 값은 .env.local에만 입력해요</span><pre><code>{`DATABASE_URL=`}</code></pre></div>
      <p className="course-note">DATABASE_URL 앞에 NEXT_PUBLIC_을 붙이지 않아요. 설정 후 실행 중인 개발 서버를 다시 시작해요. <a href="https://neon.com/docs/guides/nextjs" target="_blank" rel="noreferrer">Neon 공식 Next.js 연결 안내 ↗</a></p>
    </LessonSection>
    <LessonSection id="neon-instruction" eyebrow="00:30–00:55 · 연결 Instruction" title="AI에게 기존 앱의 Neon 연결을 요청해요" intro="아래 지시문을 현재 앱 프로젝트를 연 AI 코딩 도구에 전달해요. 새 앱을 만드는 대신 기존 저장 코드를 단계적으로 바꿉니다.">
      <div className="lesson-code-example"><span className="code-file">5회차 Instruction · 전체를 복사해요</span><pre><code>{NEON_INSTRUCTION}</code></pre></div>
      <p><a href="/materials/connection-instructions.md" download>5·6회차 Instruction 다운로드 ↓</a></p>
      <Activity title="백업 → 구조 확인 → 연결" steps={["현재 데이터가 SQLite, JSON, 브라우저 저장소 중 어디에 있는지 AI와 확인해요.", "원본 데이터와 업로드 파일을 백업해요.", "AI가 만든 테이블 구조와 마이그레이션·샘플 입력 명령을 읽어요.", "README에 안내된 순서대로 설치·초기화하고 서버에서 연결되는지 확인해요."]} />
    </LessonSection>
    <LessonSection id="db-crud" eyebrow="01:05–01:30 · 저장과 조회" title="내 앱에서 데이터 한 건을 끝까지 다뤄요" intro="CRUD는 만들기(Create), 읽기(Read), 수정(Update), 삭제(Delete)예요. 내 앱에서 필요한 동작을 실제 화면과 Neon에서 함께 확인해요.">
      <Activity title="데이터 흐름 확인하기" steps={["가상 일정이나 행사 한 건을 앱에서 저장해요.", "새로고침하고 서버를 껐다 켠 뒤 같은 기록이 보이는지 확인해요.", "Neon의 테이블 화면에서 저장한 행이 있는지 확인해요.", "앱에서 내용을 수정하고 목록·상세·DB에 같은 값이 보이는지 확인해요.", "실습용 기록을 삭제한 뒤 목록과 DB에서도 없어졌는지 확인해요."]} />
    </LessonSection>
    <LessonFiveDataGuide />
    <LessonSection id="db-test" eyebrow="01:30–01:50 · 오류와 이전 데이터" title="빈 데이터와 연결 오류도 확인해요" intro="정상 저장뿐 아니라 잘못된 입력, DB 연결 실패, 기존 데이터 이전 결과도 점검해요.">
      <Activity title="성공과 실패 비교하기" steps={["필수 입력이 비었을 때 저장되지 않고 안내가 나오는지 확인해요.", "검색 결과가 없을 때 빈 결과 화면이 보이는지 확인해요.", "실습 환경에서 연결 설정을 잠시 비워 오류 안내를 확인하고 원래 값으로 복구해 서버를 재시작해요.", "기존 데이터를 옮겼다면 원본과 건수·날짜·내용을 비교해요. seed 재실행으로 사용자 기록이 덮어써지지 않는지도 확인해요."]} />
    </LessonSection>
    <LessonSection id="db-review" eyebrow="01:50–02:00 · 정리" title="Neon 연결 결과와 다음 로그인 수업을 준비해요" intro="연결 문자열 대신 환경변수 이름과 실행 방법을 기록해요. 다음 시간에는 Clerk 사용자를 내 데이터와 연결합니다.">
      <Activity title="오늘의 결과 저장하기" steps={["DB에 저장하는 정보와 저장·조회 확인 결과를 적어요.", ".env.local이 Git에서 제외됐는지 확인하고 코드와 README를 저장해요.", "Vercel 배포에 필요한 DATABASE_URL 설정 위치를 확인해요. 인증 없는 개인 데이터·쓰기 기능은 공개하지 않아요.", "6회차에 로그인해야 할 화면과 누구에게 어떤 데이터를 보여줄지 정해요."]} />
      <Review items={[{ question: "저장했는데 새로고침하면 사라져요", answer: "화면 메모리나 브라우저 저장소에만 기록한 것은 아닌지, 서버 코드가 같은 Neon DB를 읽고 쓰는지 확인해요." }, { question: "DB 연결 오류가 나요", answer: "실제 값을 공유하지 말고 DATABASE_URL 이름, Neon 프로젝트·브랜치, 서버 재시작 여부를 확인해요. 비밀값을 가린 오류 문구로 도움을 요청해요." }]} />
    </LessonSection>
    <LessonSection id="db-references" eyebrow="참고 사이트" title="앱 화면을 다듬을 때 참고해요" intro="DB에 데이터를 저장하는 기능을 확인했다면, 그 정보를 보여주는 UI(사용자 화면)도 다듬어 보세요.">
      <aside className="lesson-example"><strong><a href="https://motion-ui.altolab.ai/" target="_blank" rel="noreferrer">Motion UI · UI 제작 프롬프트 참고 사이트 ↗</a></strong><p>UI를 만들어 주는 프롬프트를 제공하는 사이트예요. 원하는 화면에 맞는 프롬프트를 참고해 AI 코딩 도구에 전달하고, 내 앱의 목록·입력 폼·버튼을 다듬는 데 활용해요.</p></aside>
    </LessonSection>
  </div>;
}
