import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonQuestions from "./lesson-questions.js";

export default function LessonThree() {
  return <div className="lesson-content">
    <LessonSchedule number={3} />
    <LessonSection id="build-scope" eyebrow="00:00–00:10 · 목표 정하기" title="4회차에 만들 첫 버전을 정해요" intro="2회차에 배운 AI와 앱의 구조를 떠올리고, 1회차의 앱 아이디어를 꺼내요.">
      <Activity title="핵심 기능 하나 고르기" steps={["누가 어떤 상황에서 쓸 앱인지 한 문장으로 말해요.", "첫 버전에서 꼭 동작해야 할 기능 하나와 나중에 만들 기능을 나눠요.", "입력 → 처리 → 결과를 설명하고 AI가 필요한 부분을 표시해요."]} />
    </LessonSection>
    <LessonSection id="app-design" eyebrow="00:10–00:40 · 설계" title="나의 앱 첫 설계도를 만들어요" intro="오늘은 코드를 입력하기 전에 사용자의 행동과 화면을 설계해요. 기능을 많이 넣기보다 핵심 기능 하나가 끝까지 동작하도록 계획해요.">
      <aside className="lesson-example"><strong>예시 · 옥천을 처음 방문하는 사람의 식당 도우미</strong><p>문제: 등록된 식당의 이름과 주소를 찾기 어려워요. 핵심 기능: 지역을 입력하면 업소와 주소를 보여줘요. 성공 기준: 입력한 지역의 업소 3곳을 근거와 함께 확인할 수 있어요. 범위: 메뉴·가격·예약은 이번 버전에서 제공하지 않아요.</p></aside>
      <LessonQuestions id="lesson-3-app-design" title="3회차 · 나의 앱 설계 질문" questions={[
        { key: "user", question: "누가 어떤 상황에서 어떤 문제를 겪나요?", hint: "누가 / 어떤 상황에서 / 어떤 불편함을 겪나요?" },
        { key: "purpose", question: "앱 이름은 무엇이고, 한 문장으로 어떻게 소개할까요?", hint: "이 앱은 ___가 ___할 수 있도록 ___을 도와줘요." },
        { key: "feature", question: "핵심 기능 하나는 무엇이고, 성공 여부는 어떻게 확인할까요?", hint: "지역을 입력하면 업소명·주소 3곳을 참고 자료와 함께 볼 수 있어요." },
        { key: "flow", question: "내 앱의 입력 → 처리 → 결과는 무엇인가요?", hint: "지역 질문 → 서버가 CSV를 검색하고 AI에 전달 → 표와 근거 표시" },
        { key: "data", question: "어떤 자료가 필요하고, 어떤 정보는 제공하지 않을까요?", hint: "자료와 출처 / 포함된 항목 / 없는 항목 / AI가 필요한 이유" },
        { key: "states", question: "대기·완료·빈 결과·오류 상황에는 어떤 안내가 필요할까요?", hint: "생성 중… / 참고 자료 펼치기 / 검색 조건 바꾸기 / 다시 시도하기" },
      ]} />
      <Activity title="종이 화면을 그리고 짝과 시험해요" steps={["화면에 제목, 첫 인사, 입력창, 전송 버튼, 결과 영역, 참고 자료 영역을 그려요. 화면을 꾸미기 전에 사용할 순서를 정해요.", "짝에게 ‘이 지역의 식당 3곳을 찾아보세요’라는 과제를 줘요. 설명 없이 어디를 누르는지 관찰해요.", "짝이 생성 중·검색 결과 없음·연결 실패 상황이라면 무엇을 기대하는지 물어봐요.", "헷갈린 문구나 빠진 안내 하나를 고쳐요. 발표 때 ‘이 관찰 때문에 이렇게 바꿨어요’라고 설명해요."]} />
    </LessonSection>
    <LessonSection id="build-request" eyebrow="00:40–00:50 · 요청 준비" title="AI에게 보낼 첫 개발 요청을 준비해요" intro="설계 질문과 수강생별 시작 프롬프트를 함께 보며 내가 원하는 결과를 분명하게 적어요.">
      <Activity title="개발 요청과 확인 기준 정리하기" steps={["수강생별 시작 프롬프트에서 내 앱을 찾아 사용자·핵심 기능·필요한 자료가 설계와 맞는지 확인해요.", "첫 화면에서 무엇을 입력하고 어떤 결과를 볼지 구체적인 예시를 적어요.", "API 키 없이 확인할 수 있는 샘플 데이터나 데모 모드로 먼저 만들어 달라고 요청해요.", "실행 방법과 정상·빈 결과·오류 상황을 확인할 방법도 요청에 포함해요."]} />
      <p><a href="/materials/lesson-one-local-build-prompts.md" target="_blank" rel="noreferrer">수강생별 개발 시작 프롬프트 ↗</a></p>
    </LessonSection>
    <LessonSection id="app-review" eyebrow="01:00–01:15 · 공유" title="내 앱을 1분 안에 설명해봐요" intro="‘누구의 어떤 문제 → 핵심 기능 → 입력·처리·결과 → 확인할 근거’ 순서로 짝에게 설명하고 피드백을 받아요.">
      <Review items={[
        { question: "입력창과 CSV 검색은 각각 어디의 역할인가요?", answer: "입력창은 브라우저 화면의 프런트엔드, 이 앱의 CSV 검색은 서버의 백엔드 역할이에요. CSV 파일은 검색할 데이터예요." },
        { question: "AI 모델만 있으면 챗봇 앱이 완성되나요?", answer: "모델 외에도 입력 화면, 요청 처리, 자료 연결, 결과 표시, 기다림·오류 안내가 필요해요. 앱은 이 부분을 연결해 사용자가 실제로 이용하게 해요." },
        { question: "우리 앱에서 NVIDIA API 키는 어디에 두나요?", answer: "서버 환경변수에 보관해요. 사용자가 받는 브라우저 코드에 넣거나 GitHub에 키 파일을 올리지 않아요." },
      ]} />
      <aside className="lesson-takeaway"><h3>오늘의 결과물과 다음 수업</h3><p>앱 설계 질문을 바탕으로 정리한 내용과 첫 개발 요청을 보관하세요. 이어지는 마지막 시간에는 내 컴퓨터에 개발 환경을 준비해요. 4회차에는 AI에게 요청을 보내 앱을 만들고, 로컬 주소에서 실행·수정·확인해요.</p></aside>
      <div className="lesson-references"><span>구조 참고 자료</span><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview" target="_blank" rel="noreferrer">MDN · 브라우저와 서버의 요청·응답 ↗</a><a href="https://react.dev/" target="_blank" rel="noreferrer">React 공식 안내 ↗</a><a href="https://nextjs.org/docs" target="_blank" rel="noreferrer">Next.js 공식 문서 ↗</a></div>
    </LessonSection>
    <LessonSection id="vibe-windows" eyebrow="01:15–02:00 · 환경 준비" title="내 컴퓨터에서 바이브코딩 준비하기" intro="4회차에 바로 앱을 만들 수 있도록 Node.js, AI 코딩 도구, 프로젝트 폴더를 준비해요. VS Code와 Git은 이번 로컬 실습의 필수 준비물이 아니에요.">
      <div className="course-table-wrap"><table className="course-table"><caption>Windows 로컬 실습 필수 준비물</caption>
        <thead><tr><th>필수 준비물</th><th>하는 일</th><th>준비 방법</th></tr></thead>
        <tbody>
          <tr><td>Node.js LTS</td><td>앱 서버 실행과 라이브러리 설치</td><td><a href="https://nodejs.org/en/download" target="_blank" rel="noreferrer">공식 다운로드</a>에서 Windows용 LTS 설치 파일을 받아요. 수업은 24.x LTS로 맞춰요. npm도 함께 설치돼요.</td></tr>
          <tr><td>Codex 또는 Claude Code</td><td>프롬프트로 앱 생성·수정·디버깅</td><td>둘 중 하나를 설치하고 사용할 계정으로 로그인해요. <a href="https://learn.chatgpt.com/docs/codex/cli" target="_blank" rel="noreferrer">Codex 설치 안내</a> · <a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noreferrer">Claude Code 설치 안내</a></td></tr>
          <tr><td>Edge 또는 Chrome</td><td>앱 화면과 동작 확인</td><td>Windows에 있는 Edge를 사용해도 돼요.</td></tr>
          <tr><td>빈 프로젝트 폴더</td><td>코드와 로컬 데이터 저장</td><td>학생마다 새 폴더를 만들어요. package.json이나 코드 파일은 AI가 만들므로 미리 준비하지 않아도 돼요.</td></tr>
        </tbody>
      </table></div>
      <aside className="lesson-takeaway"><h3>추가 설치가 필요 없는 것</h3><p>PowerShell은 Windows에 기본으로 있어요. SQLite 드라이버와 필요한 라이브러리, 업로드·임시 폴더는 AI가 프로젝트를 만들면서 준비해요. 파일 서버도 앱 서버 안에서 구현하므로 별도 서버 프로그램을 설치하지 않아요.</p><p>VS Code는 직접 파일을 살펴보고 싶을 때, Git은 변경 이력을 관리하거나 선택한 도구·기능이 요구할 때 추가해요. 뒤의 GitHub·Vercel 배포 실습은 로컬 실행을 확인한 다음 진행해요.</p></aside>
      <div className="lesson-code-example"><span className="code-file">Node.js 설치 후 새 PowerShell 창에서 확인</span><pre><code>{`node --version
npm.cmd --version`}</code></pre></div>
      <p>두 명령 모두 버전 번호가 나오면 준비됐어요. 명령을 찾지 못하면 터미널이나 AI 도구를 종료하고 다시 열어요. PowerShell에서는 npm 스크립트 실행 정책 문제를 피하기 위해 npm.cmd를 사용해요.</p>
      <p>macOS에서는 운영체제에 맞는 설치 파일과 터미널을 사용하고, npm.cmd 대신 npm으로 버전을 확인해요.</p>
      <Activity title="설치·로그인·프로젝트 폴더 확인하기" steps={["Node.js를 설치하고 새 터미널에서 node와 npm 버전을 확인해요.", "Codex 또는 Claude Code 중 하나를 설치하고 로그인한 뒤 짧은 인사를 보내 응답을 확인해요.", "동기화 폴더 밖에 영문 이름의 빈 프로젝트 폴더를 만들고 AI 코딩 도구에서 열어요.", "아래 수강생별 자료에서 내 프롬프트를 찾아 저장해요. 앱 생성 요청은 4회차 시작 때 보내요.", "준비가 안 된 항목과 오류 문구를 강사와 확인하고 다음 수업 전에 해결해요."]} />
      <p><a href="/materials/lesson-one-local-build-prompts.md" target="_blank" rel="noreferrer">수강생별 로컬 앱 개발 시작 프롬프트 열기 ↗</a></p>
      <aside className="lesson-takeaway"><h3>4회차 시작 전 완료 기준</h3><p>① Node.js·npm 버전 확인 ② AI 코딩 도구 로그인과 응답 확인 ③ 빈 프로젝트 폴더 열기 ④ 내 앱 설계와 시작 프롬프트 저장. 다음 시간에는 이 폴더에서 바로 첫 앱을 만들어요.</p></aside>
      <aside className="lesson-example"><strong>AI 도구 로그인과 앱의 AI API 키는 별개예요</strong><p>슬라이드·웹소설 앱도 처음에는 API 키 없이 데모 모드로 확인해요. 실제 AI 생성 기능을 연결할 때만 앱의 .env.local에 API 설정을 넣어요. SQLite 설치 중 컴파일 오류가 생기면 오류를 AI에게 전달하고, 추가 도구는 필요할 때 설치해요.</p></aside>
    </LessonSection>

  </div>;
}
