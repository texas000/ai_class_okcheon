import { Activity, LessonSchedule, LessonSection } from "./lesson-blocks.js";
import LessonQuestions from "./lesson-questions.js";
import LessonDeployment from "./lesson-deployment.js";
import BuildPromptLibrary from "./build-prompt-library.js";

export default function LessonFour() {
  return <div className="lesson-content">
    <LessonSchedule number={4} preparation="VS Code를 설치하고 새 프로젝트 폴더와 AI 코딩 도구를 열어주세요. ChatGPT·Codex는 Sol 모델의 medium 이상, Claude는 Fable 또는 Opus의 medium 이상 설정을 사용해요." />
    <LessonSection id="build-ready" eyebrow="00:00–00:10 · 준비 확인" title="오늘은 내 앱을 직접 만들어요" intro="설명 → 생성 → 실행 → 확인 → 수정 순서로 진행해요. 오늘의 목표는 핵심 기능 하나가 내 컴퓨터에서 끝까지 동작하는 첫 버전이에요.">
      <Activity title="3회차 준비물 꺼내기" steps={["AI 코딩 도구에 로그인하고 준비한 새 프로젝트 폴더를 열어요.", "앱 설계도에서 사용자·핵심 기능·확인 기준을 다시 읽어요.", "ChatGPT·Codex는 Sol + medium 이상, Claude는 Fable 또는 Opus + medium 이상으로 설정해요.", "아래 build-prompts.md에서 내 앱 프롬프트를 찾아요."]} />
      <aside className="lesson-takeaway"><h3>오늘 사용할 모델 설정</h3><p><b>ChatGPT·Codex:</b> Sol 모델, 추론 강도 medium 이상<br /><b>Claude:</b> Fable 또는 Opus 모델, 추론 강도 medium 이상</p><p>화면에 같은 이름의 선택지가 없으면 임의로 진행하지 말고 강사와 확인해요.</p></aside>
    </LessonSection>
    <LessonSection id="vscode-setup" eyebrow="준비 자료 · VS Code" title="VS Code를 설치하고 내 프로젝트를 열어요" intro="VS Code(Visual Studio Code)는 Microsoft가 만든 코드 편집기예요. AI가 만든 파일을 살펴보고, 수정하고, 터미널에서 앱을 실행하는 작업 공간입니다.">
      <p><a className="lesson-action" href="https://code.visualstudio.com/download" target="_blank" rel="noreferrer">VS Code 공식 다운로드 ↗</a></p>
      <Activity title="내 컴퓨터에 설치하기" steps={["공식 다운로드 페이지에서 내 컴퓨터에 맞는 Windows 또는 macOS 설치 파일을 받아요.", "Windows는 설치 파일을 실행해 안내를 따르고, macOS는 내려받은 설치 파일을 열어 Visual Studio Code를 응용 프로그램 폴더로 옮겨요.", "VS Code를 실행하고 File(파일) → Open Folder(폴더 열기)에서 내 앱 프로젝트 폴더를 선택해요. 수업 홈페이지 폴더와 혼동하지 않아요.", "폴더 신뢰 여부를 물으면 내가 만들었거나 출처를 확인한 프로젝트인지 확인해요.", "왼쪽 탐색기에 내 폴더 이름과 README, package.json 같은 파일이 보이면 준비 완료예요."]} />
      <div className="course-table-wrap"><table className="course-table"><caption>처음에는 이 네 곳만 알아두세요</caption><thead><tr><th>화면</th><th>무엇을 하나요?</th><th>수업에서 사용하는 방법</th></tr></thead><tbody>
        <tr><th scope="row">탐색기(Explorer)</th><td>프로젝트 파일과 폴더 보기</td><td>AI가 알려준 파일 이름을 찾아 클릭해요.</td></tr>
        <tr><th scope="row">편집기(Editor)</th><td>선택한 파일 읽기·수정</td><td>문구를 고친 뒤 Windows는 Ctrl+S, Mac은 Command+S로 저장해요.</td></tr>
        <tr><th scope="row">터미널(Terminal)</th><td>설치·실행 명령 입력</td><td>Terminal → New Terminal을 열고 README의 명령을 입력해요.</td></tr>
        <tr><th scope="row">소스 제어(Source Control)</th><td>Git 변경 내용 확인</td><td>어떤 파일이 바뀌었는지 보고 비밀 파일이 포함되지 않았는지 확인해요.</td></tr>
      </tbody></table></div>
      <Activity title="VS Code → 실행 → 브라우저 확인" steps={["프로젝트 폴더의 README를 열고 설치·실행 순서를 읽어요.", "새 터미널의 현재 위치가 내 프로젝트 폴더인지 확인한 뒤 안내된 설치 명령과 실행 명령을 차례로 입력해요.", "터미널에 나온 localhost 주소를 브라우저에서 열어요. VS Code는 파일을 다루고, 브라우저는 완성된 화면을 보여줘요.", "작은 안내 문구를 수정하고 저장한 뒤 브라우저에서 반영됐는지 확인해요.", "오류가 나면 터미널의 오류 문구를 비밀값 없이 AI 코딩 도구에 전달해요. 서버 종료는 Ctrl+C예요."]} />
      <p className="course-note">VS Code 설치만으로 Node.js나 AI 코딩 도구가 함께 설치되지는 않아요. 실행 명령을 찾을 수 없으면 프로젝트 README의 준비 사항을 확인해요. <a href="https://code.visualstudio.com/docs/getstarted/overview" target="_blank" rel="noreferrer">VS Code 공식 시작 안내 ↗</a></p>
    </LessonSection>
    <LessonSection id="build-first-request" eyebrow="00:10–00:25 · 첫 요청" title="내 앱 프롬프트를 열고 바로 복사해요" intro="build-prompts.md의 긴 내용을 앱별로 접어 두었어요. 내 이름과 앱을 열고 전체 복사 버튼을 눌러 AI 코딩 도구에 붙여 넣어요.">
      <Activity title="첫 개발 요청 보내기" steps={["아래 목록에서 내 이름과 앱을 눌러 프롬프트를 펼쳐요.", "프롬프트 전체 복사를 누르고 새 프로젝트 폴더를 연 AI 코딩 도구에 붙여 넣어요.", "AI가 이해한 앱 이름·핵심 기능·데이터 저장 방식을 확인해요.", "샘플 데이터나 데모 모드로 먼저 만들고 5회차에 Neon DB, 6회차에 Clerk 로그인을 연결해요."]} />
      <BuildPromptLibrary />
    </LessonSection>
    <LessonSection id="build-local" eyebrow="00:25–00:50 · 생성과 실행" title="첫 앱을 내 컴퓨터에서 실행해요" intro="AI가 파일을 만들면 프로젝트 README의 설치·실행 안내를 따라요. Windows 예시이며 macOS에서는 npm.cmd 대신 npm을 사용해요.">
      <Activity title="생성된 앱 실행하기" steps={["AI가 만든 파일이 준비한 프로젝트 폴더에 있는지 확인해요.", "README에서 설치·DB 초기화·실행 명령을 확인해요.", "AI가 안내한 명령을 프로젝트 폴더에서 실행해요.", "터미널에 표시된 로컬 주소를 브라우저에서 열어요."]} />
      <div className="lesson-code-example"><span className="code-file">앱 생성 후 일반적인 실행 명령 · 실제 README의 안내를 우선해요</span><pre><code>{`npm.cmd install
npm.cmd run dev`}</code></pre></div>
      <p>DB 초기화와 샘플 입력은 AI가 만든 명령을 따라요. 서버 터미널은 켜 둔 채 표시된 주소(예: http://127.0.0.1:3000)에 접속해요. 서버를 종료할 때는 Ctrl+C를 눌러요.</p>

      <aside className="lesson-example"><strong>로컬 주소는 내 컴퓨터에서 확인하는 주소예요</strong><p>127.0.0.1이나 localhost 주소는 다른 사람의 컴퓨터에서 열리지 않아요. 먼저 내 컴퓨터에서 실행을 확인하고, 공유할 앱 주소는 이후 배포 단계에서 만들어요.</p></aside>
    </LessonSection>
    <LessonSection id="build-test" eyebrow="01:00–01:25 · 시험과 수정" title="직접 사용해보고 오류를 고쳐요" intro="예상 결과와 실제 결과를 비교하며 같은 동작을 다시 시험해요.">
      <Activity title="오류를 AI와 함께 고치기" steps={["어떤 입력을 넣고 어떤 버튼을 눌렀는지 기록해요.", "서버를 실행한 터미널의 오류 문구를 확인해요.", "화면에서 오류가 나면 브라우저에서 F12를 눌러 Console과 Network 탭을 확인해요.", "기대 결과, 실제 결과, 오류 문구를 AI에게 전달하고 기존 DB와 업로드 파일을 유지하면서 수정해 달라고 요청해요.", "수정 후 같은 동작을 다시 실행해 결과를 확인해요. 오류를 전달할 때 API 키와 비밀번호는 제외해요."]} />

      <Activity title="세 가지 상황 확인하기" steps={["대표 입력으로 핵심 기능이 끝까지 동작하는지 확인해요.", "입력이 비었거나 결과가 없을 때 다음 행동을 안내하는지 확인해요.", "오류를 고친 뒤 대표 동작도 다시 실행해요."]} />
    </LessonSection>
    <LessonSection id="build-change" eyebrow="01:25–01:45 · 첫 바이브코딩 반복" title="작은 변화 하나를 요청하고 확인해요" intro="앱 이름, 안내 문구, 결과 배치처럼 눈으로 확인할 수 있는 변화 하나를 고르세요.">
      <Activity title="요청 → 수정 → 확인" steps={["어느 화면의 무엇을 어떻게 바꿀지 한 문장으로 요청해요.", "기존 기능과 데이터를 유지하고 한 가지만 수정해 달라고 해요.", "화면에서 바뀐 부분과 기존 핵심 기능을 함께 확인해요.", "변경 전후의 차이와 확인 결과를 메모해요."]} />
    </LessonSection>
    <LessonSection id="build-review" eyebrow="01:45–02:00 · 저장과 공유" title="첫 앱의 결과와 다음 할 일을 남겨요" intro="프로젝트 폴더와 실행 방법을 보관하고, 짝에게 핵심 기능을 보여주세요. 5회차에는 Neon DB에 데이터를 저장하고, 6회차에는 Clerk으로 로그인을 연결해요.">
      <LessonQuestions id="lesson-4-local-build" title="4회차 · 첫 앱 제작 기록" questions={[
        { key: "app", question: "앱 이름과 핵심 기능은 무엇인가요?", hint: "누가 어떤 입력으로 무엇을 할 수 있나요?" },
        { key: "run", question: "프로젝트는 어디에 있고, 어떻게 실행하나요?", hint: "폴더 이름 / 실행 명령 / 로컬 주소 (API 키는 적지 않아요)" },
        { key: "test", question: "어떤 동작을 시험했고, 기대한 결과가 나왔나요?", hint: "대표 입력 / 기대 결과 / 실제 결과" },
        { key: "change", question: "AI와 어떤 오류를 고치거나 작은 변화를 만들었나요?", hint: "요청 내용 / 바뀐 점 / 다시 확인한 결과" },
        { key: "next", question: "다음에 무엇을 만들거나 개선할까요?", hint: "추가할 자료 / 연결할 AI 기능 / 남은 오류" },
      ]} />
      <LessonQuestions id="lesson-4-connection-plan" title="5회차 준비 · 어떤 연결이 필요한가요?" questions={[
        { key: "storage", question: "현재 앱의 데이터는 어디에 저장되나요?", hint: "SQLite / JSON / 브라우저 저장소 / 샘플 데이터 중 확인해요." },
        { key: "database", question: "재배포 후에도 남아야 하는 표 형식 정보는 무엇인가요?", hint: "예: 행사, 작품, 일정, 사용자 설정, 파일 설명" },
        { key: "files", question: "사용자가 올리거나 다시 열 파일이 있나요?", hint: "사진 / 영상 / PDF / 문서 / 필요 없음 · 파일 내용은 Neon DB와 별도 저장소가 필요해요." },
        { key: "flow", question: "저장 → 조회 → 수정 → 삭제 중 필요한 동작은 무엇인가요?", hint: "사용자가 실제로 할 순서대로 적어보세요." },
        { key: "safety", question: "외부 저장소로 보내면 안 되는 정보가 있나요?", hint: "API 키, 비밀번호, 개인정보, 공개하면 안 되는 원고 등" },
      ]} />
    </LessonSection>
    <details className="answer-detail"><summary>선택 보충 자료 · 수업용 챗봇을 GitHub·Vercel로 배포하기</summary><LessonDeployment /></details>
  </div>;
}
