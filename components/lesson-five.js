import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import { NEON_INSTRUCTION } from "../lib/connection-instructions.js";

export default function LessonFive() {
  return <div className="lesson-content">
    <LessonSchedule number={5} preparation="4회차 앱의 프로젝트 폴더, VS Code와 Neon 계정을 준비해요. 기존 SQLite·JSON 데이터는 백업하고 실제 DB 연결 문자열은 AI 채팅에 붙이지 않아요." />
    <LessonSection id="db-map" eyebrow="00:00–00:10 · DB 이해" title="앱을 껐다 켜도 남는 데이터를 만들어요" intro="DB(데이터베이스)는 정보를 표처럼 정리해 저장하는 곳이에요. 오늘은 Neon에서 제공하는 Postgres에 내 앱의 데이터를 연결합니다.">
      <div className="restaurant-analogy">
        <article><span>01 · 브라우저</span><h3>입력하고 확인해요</h3><p>행사, 일정, 작품 같은 정보를 입력하고 결과를 화면에서 봐요.</p></article>
        <article><span>02 · 앱 서버</span><h3>검사하고 요청해요</h3><p>입력값을 검사하고 DB에 저장·조회를 요청해요. 연결 비밀값은 서버에만 있어요.</p></article>
        <article><span>03 · Neon DB</span><h3>데이터를 보관해요</h3><p>앱 서버가 재시작돼도 기록을 유지하고 필요한 행을 찾아줘요.</p></article>
      </div>
      <aside className="lesson-takeaway"><h3>로그인은 다음 시간에 연결해요</h3><p>5회차는 샘플 데이터로 로컬 연결을 확인해요. 6회차에 Clerk으로 사용자와 권한을 연결한 뒤 공개 배포를 점검합니다. 사진·영상의 파일 내용은 DB와 별도 파일 저장소가 필요해요.</p></aside>
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
    <LessonSection id="db-test" eyebrow="01:30–01:50 · 오류와 이전 데이터" title="빈 데이터와 연결 오류도 확인해요" intro="정상 저장뿐 아니라 잘못된 입력, DB 연결 실패, 기존 데이터 이전 결과도 점검해요.">
      <Activity title="성공과 실패 비교하기" steps={["필수 입력이 비었을 때 저장되지 않고 안내가 나오는지 확인해요.", "검색 결과가 없을 때 빈 결과 화면이 보이는지 확인해요.", "실습 환경에서 연결 설정을 잠시 비워 오류 안내를 확인하고 원래 값으로 복구해 서버를 재시작해요.", "기존 데이터를 옮겼다면 원본과 건수·날짜·내용을 비교해요. seed 재실행으로 사용자 기록이 덮어써지지 않는지도 확인해요."]} />
    </LessonSection>
    <LessonSection id="db-review" eyebrow="01:50–02:00 · 정리" title="Neon 연결 결과와 다음 로그인 수업을 준비해요" intro="연결 문자열 대신 환경변수 이름과 실행 방법을 기록해요. 다음 시간에는 Clerk 사용자를 내 데이터와 연결합니다.">
      <Activity title="오늘의 결과 저장하기" steps={["DB에 저장하는 정보와 저장·조회 확인 결과를 적어요.", ".env.local이 Git에서 제외됐는지 확인하고 코드와 README를 저장해요.", "Vercel 배포에 필요한 DATABASE_URL 설정 위치를 확인해요. 인증 없는 개인 데이터·쓰기 기능은 공개하지 않아요.", "6회차에 로그인해야 할 화면과 누구에게 어떤 데이터를 보여줄지 정해요."]} />
      <Review items={[{ question: "저장했는데 새로고침하면 사라져요", answer: "화면 메모리나 브라우저 저장소에만 기록한 것은 아닌지, 서버 코드가 같은 Neon DB를 읽고 쓰는지 확인해요." }, { question: "DB 연결 오류가 나요", answer: "실제 값을 공유하지 말고 DATABASE_URL 이름, Neon 프로젝트·브랜치, 서버 재시작 여부를 확인해요. 비밀값을 가린 오류 문구로 도움을 요청해요." }]} />
    </LessonSection>
  </div>;
}
