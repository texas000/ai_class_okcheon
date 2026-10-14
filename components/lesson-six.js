import { Activity, LessonSection, Review } from "./lesson-blocks.js";

const VIBE_PROMPT = `나는 비개발자이고, 지금 만든 AI 에이전트를 조금 개선하고 싶어요.

현재 앱: [내 AI 에이전트 소개]
바꾸고 싶은 것: [한 가지만 구체적으로 작성]
사용자가 보게 될 결과: [원하는 화면이나 동작]

기존 데이터 검색과 NVIDIA_API_KEY는 그대로 유지해 주세요.
수정할 파일과 위치를 먼저 알려주고, 한 번에 한 단계씩 설명해 주세요.
수정 후 내가 확인할 방법도 쉬운 말로 알려주세요.`;

export default function LessonSix() {
  return <div className="lesson-content">
    <LessonSection id="vibe-windows" eyebrow="수업 전 준비 · WINDOWS" title="내 컴퓨터에서 바이브코딩 준비하기" intro="빈 폴더에서 Codex나 Claude Code로 앱을 만들고 실행해요. VS Code와 Git은 이번 로컬 실습의 필수 준비물이 아니에요.">
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
      <Activity title="빈 폴더에서 첫 앱 만들기" steps={["동기화 폴더 밖에 영문 이름의 새 프로젝트 폴더를 만들어요.", "Codex 앱에서 그 폴더를 열거나, PowerShell에서 폴더로 이동해 codex 또는 claude를 실행해요.", "아래 수강생별 자료에서 본인 이름의 프롬프트 전체를 복사해 입력해요.", "AI가 알려주는 초기화·실행 명령을 따르고, 터미널에 표시된 로컬 주소를 브라우저에서 열어요."]} />
      <p><a href="/materials/lesson-one-local-build-prompts.md" target="_blank" rel="noreferrer">수강생별 로컬 앱 개발 시작 프롬프트 열기 ↗</a></p>
      <div className="lesson-code-example"><span className="code-file">앱 생성 후 일반적인 실행 명령 · 실제 README의 안내를 우선해요</span><pre><code>{`npm.cmd install
npm.cmd run dev`}</code></pre></div>
      <p>DB 초기화와 샘플 입력은 AI가 만든 명령을 따라요. 서버 터미널은 켜 둔 채 표시된 주소(예: http://127.0.0.1:3000)에 접속해요. 서버를 종료할 때는 Ctrl+C를 눌러요.</p>
      <Activity title="오류를 AI와 함께 고치기" steps={["어떤 입력을 넣고 어떤 버튼을 눌렀는지 기록해요.", "서버를 실행한 터미널의 오류 문구를 확인해요.", "화면에서 오류가 나면 브라우저에서 F12를 눌러 Console과 Network 탭을 확인해요.", "기대 결과, 실제 결과, 오류 문구를 AI에게 전달하고 기존 DB와 업로드 파일을 유지하면서 수정해 달라고 요청해요.", "수정 후 같은 동작을 다시 실행해 결과를 확인해요. 오류를 전달할 때 API 키와 비밀번호는 제외해요."]} />
      <aside className="lesson-example"><strong>AI 도구 로그인과 앱의 AI API 키는 별개예요</strong><p>슬라이드·웹소설 앱도 처음에는 API 키 없이 데모 모드로 확인해요. 실제 AI 생성 기능을 연결할 때만 앱의 .env.local에 API 설정을 넣어요. SQLite 설치 중 컴파일 오류가 생기면 오류를 AI에게 전달하고, 추가 도구는 필요할 때 설치해요.</p></aside>
    </LessonSection>

    <LessonSection id="vibe-ready" eyebrow="00:00–00:20 · 현재 상태 확인" title="바꾸기 전에 정상 동작부터 확인해요" intro="5회차에 만든 AI 에이전트의 정상 화면과 답변을 기준점으로 남기면 변경 뒤의 차이를 쉽게 찾을 수 있어요.">
      <Activity title="기준점 만들기" steps={["현재 배포 주소에서 에이전트 이름과 첫인사를 확인해요.", "데이터에 답이 있는 대표 질문과 답이 없는 질문을 각각 보내요.", "답변과 참고 자료가 맞는지 확인하고 현재 화면을 캡처해요.", "오늘 바꾸고 싶은 작은 변화 한 가지를 정해요."]} />
      <aside className="lesson-takeaway"><h3>오늘은 한 가지면 충분해요</h3><p>질문 카드, 안내 문구, 결과 표시, 색상처럼 눈으로 확인할 수 있는 작은 변화가 좋아요. 앱 전체를 새로 만들거나 여러 기능을 한꺼번에 바꾸지 않습니다.</p></aside>
    </LessonSection>

    <LessonSection id="vibe-request" eyebrow="00:20–00:40 · AI에게 요청" title="원하는 결과를 구체적으로 설명해요" intro="ChatGPT, Claude, Gemini, Copilot 등 내가 사용하는 AI 서비스에서 같은 방식으로 시작할 수 있어요.">
      <div className="lesson-code-example"><span className="code-file">AI 서비스에 복사해 사용할 요청 양식</span><pre><code>{VIBE_PROMPT}</code></pre></div>
      <Activity title="나의 요청 완성하기" steps={["현재 앱이 누구에게 어떤 도움을 주는지 한 문장으로 적어요.", "바꾸고 싶은 것을 한 가지만 적어요.", "변경이 성공했는지 확인할 화면이나 동작을 적어요.", "비개발자도 따라 할 수 있도록 한 번에 한 단계씩 안내해 달라고 요청해요."]} />
    </LessonSection>

    <LessonSection id="vibe-lab" eyebrow="00:50–01:25 · 바이브코딩" title="제안을 확인하고 한 단계씩 적용해요" intro="AI의 답변을 한꺼번에 복사하지 않고, 수정할 파일과 범위를 먼저 확인합니다.">
      <div className="release-pipeline" aria-label="요청, 확인, 적용, 시험 순서"><article><span>01</span><h3>요청</h3><p>작은 변화 하나 설명</p></article><article><span>02</span><h3>확인</h3><p>파일과 수정 범위 확인</p></article><article><span>03</span><h3>적용</h3><p>한 단계만 반영</p></article><article><span>04</span><h3>시험</h3><p>기존·새 기능 확인</p></article></div>
      <Activity title="AI와 함께 수정하기" steps={["AI가 제안한 파일 이름과 바뀌는 부분을 먼저 찾습니다.", "API 키, 비밀번호, 개인정보는 AI 대화나 코드에 붙여 넣지 않아요.", "한 단계만 적용한 뒤 화면에서 결과를 확인해요.", "오류가 나면 오류 문구와 직전에 한 변경을 AI에게 알려줘요.", "변경 범위가 너무 크면 ‘기존 구조를 유지하고 가장 적은 파일만 수정해 달라’고 다시 요청해요."]} />
      <aside className="lesson-example"><strong>바로 적용하지 않을 제안</strong><p>기존 파일 전체 삭제, API 키를 코드에 입력, 이해하지 못한 여러 파일의 대규모 변경은 멈추고 강사와 확인합니다.</p></aside>
    </LessonSection>

    <LessonSection id="vibe-test" eyebrow="01:25–01:45 · 결과 확인" title="새 기능과 기존 기능을 함께 시험해요" intro="새 기능만 보지 말고 데이터 검색과 AI 답변이 전처럼 작동하는지도 확인합니다.">
      <Activity title="변경 전후 비교하기" steps={["정해 둔 성공 기준대로 새 변화가 보이는지 확인해요.", "5회차의 대표 질문을 다시 보내 답변과 참고 자료를 비교해요.", "데이터에 없는 질문에도 추측하지 않고 안내하는지 확인해요.", "문제가 있으면 새 기능을 더 만들지 않고 마지막 변경부터 점검해요."]} />
    </LessonSection>

    <LessonSection id="vibe-deploy" eyebrow="01:45–02:00 · 저장과 배포" title="개선한 앱을 Vercel에 반영해요" intro="변경 내용을 알 수 있는 기록을 남기고 새 배포가 완료될 때까지 기다립니다.">
      <Activity title="6회차 결과물 저장하기" steps={["무엇을 왜 바꿨는지 한 문장으로 기록해요.", "변경을 GitHub에 저장하고 Vercel의 새 배포 상태를 확인해요.", "배포 주소에서 기존 질문과 새 기능을 다시 확인해요.", "7회차 발표에서 보여줄 변화와 대표 질문을 메모해요."]} />
      <Review items={[
        { question: "AI가 너무 많은 파일을 바꾸라고 해요", answer: "원하는 변화를 더 작게 나누고 기존 구조를 유지하며 가장 적은 파일만 수정해 달라고 다시 요청해요." },
        { question: "수정 뒤 챗봇 답변이 안 나와요", answer: "NVIDIA_API_KEY를 대화에 복사하지 말고 Vercel 환경변수 이름이 유지됐는지 확인해요. 마지막 변경 전에는 답변이 나왔는지도 비교합니다." },
        { question: "수정 전으로 돌아가고 싶어요", answer: "새 변경을 추가하지 말고 GitHub의 변경 기록을 강사에게 보여주세요. 정상 동작했던 버전을 기준으로 되돌립니다." },
      ]} />
    </LessonSection>
  </div>;
}
