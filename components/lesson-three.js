import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonQuestions from "./lesson-questions.js";

const FIRST_PUSH = `git init -b main
git status
git add .
git commit -m "타이머 앱 첫 버전"
git remote add origin https://github.com/내아이디/저장소이름.git
git push -u origin main`;

const NEXT_PUSH = `git status
git add .
git commit -m "타이머 앱 수정"
git push origin main`;

const TARGET_APP_PROMPT = `나는 [사용자]를 위한 [앱 이름] 웹 앱을 만들고 싶어.

해결할 문제
- [사용자가 겪는 불편함]

첫 버전의 핵심 기능
1. [가장 중요한 기능]
2. [두 번째 기능]
3. [필요한 경우에만 세 번째 기능]

사용 흐름
- 입력: [사용자가 입력하거나 누르는 것]
- 처리: [앱이 해야 하는 일]
- 결과: [사용자에게 보여줄 것]

화면
- [필요한 화면과 버튼]

사용할 데이터
- [필요한 자료와 출처]

완료 기준
- [직접 테스트할 수 있는 조건]

먼저 작은 첫 버전을 만들어줘.
한 번에 한 단계씩 진행하고 실행 방법과 확인 방법을 비개발자도 이해하게 설명해줘.
비밀번호와 API 키는 코드나 GitHub에 넣지 말고 환경변수로 안내해줘.`;

export default function LessonThree() {
  return <div className="lesson-content">
    <LessonSchedule number={3} />

    <LessonSection id="deploy-ready" eyebrow="00:00–00:10 · 준비 확인" title="타이머 앱과 계정을 먼저 확인해요" intro="오늘은 컴퓨터 안의 타이머 앱을 인터넷 주소로 공개해요. GitHub와 Vercel 가입이 필요해요.">
      <Activity title="시작 전 네 가지 확인" steps={[
        "타이머 앱을 실행하고 시작·일시정지·초기화가 동작하는지 확인해요.",
        "GitHub에 로그인해요. 계정이 없다면 회원가입하고 이메일 인증까지 완료해요.",
        "Vercel에 GitHub 계정으로 로그인해요.",
        "프로젝트 폴더에 .gitignore 파일이 있는지 확인해요.",
      ]} />
      <aside className="lesson-takeaway"><h3>절대 올리면 안 되는 것</h3><p>비밀번호, API 키, <code>.env</code>, <code>.env.local</code> 파일은 GitHub에 올리지 않아요. <code>node_modules</code>와 <code>.next</code>도 올리지 않도록 <code>.gitignore</code>에서 확인해요.</p></aside>
    </LessonSection>

    <LessonSection id="github-basics" eyebrow="00:10–00:25 · 쉬운 개념" title="내 컴퓨터, GitHub, Vercel은 역할이 달라요" intro="세 곳이 어떻게 이어지는지만 이해하면 배포 과정이 훨씬 쉬워져요.">
      <div className="input-output-map">
        <div><span>LOCAL</span><h3>내 컴퓨터</h3><p>AI와 코드를 만들고<br />직접 실행해요.</p></div>
        <span aria-hidden="true">→</span>
        <div><span>GITHUB</span><h3>코드 보관함</h3><p>코드와 변경 기록을<br />온라인에 저장해요.</p></div>
        <span aria-hidden="true">→</span>
        <div><span>VERCEL</span><h3>공개된 앱</h3><p>코드를 실행해<br />접속 주소를 만들어요.</p></div>
      </div>
      <div className="teaching-grid">
        <article><h3>Git</h3><p>내 컴퓨터에서 코드의 변경 내용을 기록하고 묶는 도구예요.</p></article>
        <article><h3>GitHub</h3><p>Git으로 기록한 코드를 온라인 저장소에 보관하고 공유하는 서비스예요.</p></article>
        <article><h3>Vercel</h3><p>GitHub 저장소의 코드를 빌드하고, 다른 사람이 열 수 있는 웹 주소로 배포해요.</p></article>
      </div>
    </LessonSection>

    <LessonSection id="github-push" eyebrow="00:25–00:50 · GitHub" title="타이머 코드를 GitHub에 올려요" intro="GitHub에서 빈 저장소를 만든 뒤, 프로젝트 폴더의 터미널에서 코드를 저장하고 밀어 올려요.">
      <Activity title="GitHub 저장소 만들기" steps={[
        "GitHub 오른쪽 위의 +를 누르고 New repository를 선택해요.",
        "저장소 이름을 영문으로 적고 Public 또는 Private을 선택해요.",
        "기존 프로젝트를 올릴 것이므로 README, .gitignore, License 추가는 선택하지 않고 빈 저장소를 만들어요.",
        "생성된 저장소의 HTTPS 주소를 복사해요.",
      ]} />
      <div className="lesson-code-example"><span className="code-file">처음 한 번만 실행해요 · 주소는 내 저장소 주소로 바꿔요</span><pre><code>{FIRST_PUSH}</code></pre></div>
      <p className="course-note"><code>git status</code>에서 <code>.env</code>, <code>.env.local</code>, <code>node_modules</code>, <code>.next</code>가 보이면 멈추고 강사에게 알려주세요. 로그인 창이 열리면 본인 계정으로 로그인하고, 비밀번호나 인증값을 다른 사람에게 보내지 않아요.</p>
      <div className="lesson-code-example"><span className="code-file">다음 수정부터 반복해요</span><pre><code>{NEXT_PUSH}</code></pre></div>
      <aside className="lesson-example"><strong>AI에게 명령을 부탁한다면</strong><p>“현재 저장소 주소와 <code>git status</code>를 먼저 보여줘. 비밀 파일이 포함되지 않았는지 확인한 뒤 커밋과 푸시를 진행해줘.”라고 요청해요. 어느 저장소의 어느 브랜치에 올리는지 확인하고 승인해요.</p></aside>
    </LessonSection>

    <LessonSection id="vercel-deploy" eyebrow="01:00–01:20 · Vercel" title="GitHub 저장소를 Vercel에 배포해요" intro="Vercel이 GitHub의 코드를 가져와 실행하고, 공유할 수 있는 주소를 만들어줘요.">
      <Activity title="New Project에서 배포하기" steps={[
        "Vercel 대시보드에서 Add New 또는 New Project를 선택해요.",
        "GitHub 저장소 목록에서 방금 올린 타이머 저장소를 찾아 Import를 눌러요.",
        "프로젝트 이름, Framework Preset, Root Directory를 확인해요. 특별한 이유가 없다면 자동으로 찾은 기본값을 사용해요.",
        "API 키가 필요한 앱이라면 코드가 아니라 Environment Variables에 이름과 값을 입력해요. 타이머 앱은 보통 필요하지 않아요.",
        "Deploy를 누르고 Ready가 표시될 때까지 기다린 뒤 Visit으로 앱을 열어요.",
      ]} />
      <aside className="lesson-takeaway"><h3>앞으로는 더 간단해요</h3><p>GitHub에 연결된 프로젝트는 새 코드를 <code>push</code>할 때 Vercel이 자동으로 다시 배포해요. 즉, 컴퓨터에서 수정 → 테스트 → GitHub에 push → Vercel 자동 배포 순서예요.</p></aside>
    </LessonSection>

    <LessonSection id="deploy-check" eyebrow="01:20–01:30 · 공개 확인" title="내 컴퓨터 밖에서도 열리는지 확인해요" intro="주소가 생겼다고 끝난 것은 아니에요. 실제 사용자처럼 공개 주소에서 다시 테스트해요.">
      <Activity title="배포 완료 체크" steps={[
        "Vercel 주소를 새 브라우저 창에서 열고 새로고침해요.",
        "시작·일시정지·다시 시작·초기화를 다시 확인해요.",
        "휴대전화에서도 주소를 열어 글자와 버튼이 잘 보이는지 확인해요.",
        "문제가 나면 Vercel의 Deployments에서 실패한 배포와 오류 문구를 확인해요.",
      ]} />
    </LessonSection>

    <LessonSection id="target-app-prompt" eyebrow="01:30–02:00 · 목표 앱" title="이제 내가 만들고 싶은 앱을 프롬프트로 설명해요" intro="타이머에서 배운 방법을 내 앱에 적용해요. 누구의 어떤 문제를 해결할지, 첫 버전에서 무엇이 동작해야 할지 적어요.">
      <LessonQuestions id="lesson-3-target-app" title="목표 앱 프롬프트 질문" questions={[
        { key: "user", question: "누가 어떤 상황에서 이 앱을 사용하나요?", hint: "예: 옥천을 방문한 사람이 식당을 찾을 때 사용해요." },
        { key: "problem", question: "그 사람이 겪는 가장 큰 불편은 무엇인가요?", hint: "여러 곳에 흩어진 정보를 찾기 어려워요." },
        { key: "features", question: "첫 버전에 꼭 필요한 기능 세 가지 이하는 무엇인가요?", hint: "검색하기 / 결과 보기 / 다시 검색하기" },
        { key: "flow", question: "입력 → 처리 → 결과는 무엇인가요?", hint: "지역 입력 → 자료 검색 → 이름과 주소 목록 표시" },
        { key: "data", question: "어떤 자료가 필요하고 어디서 가져오나요?", hint: "CSV, 직접 입력한 목록, 공개 데이터 등 출처도 적어요." },
        { key: "success", question: "어떻게 테스트하면 완성을 확인할 수 있나요?", hint: "실제 예시를 입력했을 때 기대한 결과가 보여요." },
      ]} />
      <div className="lesson-code-example"><span className="code-file">내 답으로 빈칸을 채워요</span><pre><code>{TARGET_APP_PROMPT}</code></pre></div>
      <Activity title="짝에게 설명하고 첫 요청을 완성해요" steps={[
        "질문의 답을 프롬프트 틀에 옮겨 적어요.",
        "짝에게 프롬프트만 보여주고 어떤 앱인지 설명해보게 해요.",
        "다르게 이해한 부분이 있다면 사용자·기능·완료 기준을 더 구체적으로 고쳐요.",
        "다음 시간에 바로 사용할 수 있도록 완성된 프롬프트를 저장해요.",
      ]} />
      <Review items={[
        { question: "GitHub와 Vercel은 같은 곳인가요?", answer: "아니요. GitHub는 코드를 보관하고, Vercel은 그 코드를 실행해 웹 주소로 배포해요." },
        { question: "API 키도 GitHub에 올리나요?", answer: "아니요. 비밀키는 코드와 GitHub에 넣지 않고 로컬의 환경변수와 Vercel의 Environment Variables에 따로 저장해요." },
        { question: "좋은 앱 프롬프트에는 무엇이 필요한가요?", answer: "사용자와 문제, 핵심 기능, 입력·처리·결과, 필요한 데이터, 직접 확인할 완료 기준이 필요해요." },
      ]} />
      <div className="lesson-references"><span>공식 참고 자료</span><a href="https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github" target="_blank" rel="noreferrer">GitHub · 내 컴퓨터의 코드 올리기 ↗</a><a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">Vercel · Git 저장소 배포하기 ↗</a></div>
    </LessonSection>
  </div>;
}
