import { Activity, LessonSchedule, LessonSection } from "./lesson-blocks.js";
import LessonQuestions from "./lesson-questions.js";
import LessonDeployment from "./lesson-deployment.js";

export default function LessonFour() {
  return <div className="lesson-content">
    <LessonSchedule number={4} preparation="3회차에 준비한 Node.js, 로그인한 AI 코딩 도구, 프로젝트 폴더, 앱 설계도와 시작 프롬프트를 열어주세요. 준비가 안 된 항목은 시작 전에 강사와 확인해요." />
    <LessonSection id="build-ready" eyebrow="00:00–00:10 · 준비 확인" title="오늘은 내 앱을 직접 만들어요" intro="설명 → 생성 → 실행 → 확인 → 수정 순서로 진행해요. 오늘의 목표는 핵심 기능 하나가 내 컴퓨터에서 끝까지 동작하는 첫 버전이에요.">
      <Activity title="3회차 준비물 꺼내기" steps={["AI 코딩 도구에 로그인하고 준비한 프로젝트 폴더를 열어요.", "앱 설계도에서 사용자·핵심 기능·확인 기준을 다시 읽어요.", "수강생별 시작 프롬프트와 공개 가능한 샘플 자료를 준비해요."]} />
    </LessonSection>
    <LessonSection id="build-first-request" eyebrow="00:10–00:25 · 첫 요청" title="내가 원하는 앱을 AI에게 설명해요" intro="3회차에 정리한 요청을 보내고, AI가 이해한 작업 범위와 실행 방법을 확인해요.">
      <Activity title="첫 개발 요청 보내기" steps={["아래 자료에서 내 이름의 시작 프롬프트를 찾아 전체 내용을 읽어요.", "핵심 기능과 입력·결과 예시가 설계와 맞는지 확인하고 AI에게 보내요.", "샘플 데이터나 데모 모드로 먼저 확인하고 필요한 API 연결은 다음 단계로 정해요.", "AI가 제안한 작업 순서와 수정할 폴더를 확인해요."]} />
      <p><a href="/materials/lesson-one-local-build-prompts.md" target="_blank" rel="noreferrer">수강생별 로컬 앱 개발 시작 프롬프트 ↗</a></p>
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
    <LessonSection id="build-review" eyebrow="01:45–02:00 · 저장과 공유" title="첫 앱의 결과와 다음 할 일을 남겨요" intro="프로젝트 폴더와 실행 방법을 보관하고, 짝에게 핵심 기능을 보여주세요. 5회차에는 데이터와 AI 역할을 구체화해요.">
      <LessonQuestions id="lesson-4-local-build" title="4회차 · 첫 앱 제작 기록" questions={[
        { key: "app", question: "앱 이름과 핵심 기능은 무엇인가요?", hint: "누가 어떤 입력으로 무엇을 할 수 있나요?" },
        { key: "run", question: "프로젝트는 어디에 있고, 어떻게 실행하나요?", hint: "폴더 이름 / 실행 명령 / 로컬 주소 (API 키는 적지 않아요)" },
        { key: "test", question: "어떤 동작을 시험했고, 기대한 결과가 나왔나요?", hint: "대표 입력 / 기대 결과 / 실제 결과" },
        { key: "change", question: "AI와 어떤 오류를 고치거나 작은 변화를 만들었나요?", hint: "요청 내용 / 바뀐 점 / 다시 확인한 결과" },
        { key: "next", question: "다음에 무엇을 만들거나 개선할까요?", hint: "추가할 자료 / 연결할 AI 기능 / 남은 오류" },
      ]} />
      <LessonQuestions id="lesson-4-agent-plan" title="5회차 준비 · 나의 AI 에이전트 설계 질문" questions={[
        { key: "agent_name", question: "만들고 싶은 AI 에이전트의 이름은 무엇인가요?", hint: "예: 옥천 여행 도우미, 우리 농장 안내원, 복지 서비스 길잡이" },
        { key: "user_and_purpose", question: "누가, 어떤 상황에서 사용하나요?", hint: "이 AI는 ___가 ___할 때 도움을 줘요." },
        { key: "data", question: "AI는 어떤 데이터를 참고해야 할까요?", hint: "어떤 자료를 준비할까요? 자료의 출처와 표에 들어갈 항목도 적어보세요." },
        { key: "data_example", question: "데이터에 넣을 실제 예시 세 가지는 무엇인가요?", hint: "이름 / 설명 / 위치처럼 한 줄에 어떤 정보가 들어갈지 예시를 적어보세요." },
        { key: "questions", question: "사용자는 어떤 질문 세 가지를 물어볼까요?", hint: "이 AI에게 실제로 묻고 싶은 질문을 세 가지 적어보세요." },
        { key: "ideal_answers", question: "어떤 답변을 받으면 좋을까요?", hint: "길이, 말투, 표·목록 여부, 꼭 포함할 정보와 출처 표시 방법을 적어보세요." },
        { key: "unknown_rule", question: "데이터에 답이 없을 때 어떻게 말할까요?", hint: "추측하지 않고 ‘자료에서 찾지 못했어요’라고 안내하는 등 원하는 규칙을 적어보세요." },
      ]} />
    </LessonSection>
    <details className="answer-detail"><summary>선택 보충 자료 · 수업용 챗봇을 GitHub·Vercel로 배포하기</summary><LessonDeployment /></details>
  </div>;
}
