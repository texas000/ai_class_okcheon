import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";

const BUILD_PROMPT = `이 폴더에 수업에서 배운 방법으로 작은 웹 앱을 만들어줘.
앱 이름: [내 앱 이름]
사용자와 해결할 문제: [누구의 어떤 불편함을 해결할지]
핵심 기능: [가장 중요한 기능 한 가지]
입력과 결과: [입력할 내용] → [화면에 보여줄 결과]
완료 기준: [직접 눌러서 확인할 수 있는 조건]
먼저 작은 첫 버전을 만들고 실행 방법을 알려줘.
비개발자가 따라갈 수 있도록 한 단계씩 설명해줘.
비밀 키는 코드에 넣지 말고 .env.local로 관리하고 .gitignore에서 제외해줘.`;

const FIRST_PUSH = `git init -b main
git status
git add .
git diff --cached --stat
git commit -m "앱 첫 버전"
git remote add origin https://github.com/내아이디/내저장소.git
git push -u origin main`;

export default function LessonSeven() {
  return <div className="lesson-content">
    <LessonSchedule number={7} preparation="VS Code와 Git이 설치된 컴퓨터, GitHub·Vercel 계정, 이전 수업의 앱 제작 프롬프트를 준비해요. 새 폴더에서 복습하고, 기존 앱은 원래 폴더에 보관해요." />

    <LessonSection id="review-map" eyebrow="00:00–00:10 · 전체 흐름" title="내 컴퓨터의 앱을 인터넷 주소로 바꿔요" intro="오늘은 앱 만들기를 처음부터 복습해요. 폴더를 만들고, 코드를 GitHub에 보관하고, Vercel에서 누구나 열 수 있는 주소를 만듭니다.">
      <div className="release-pipeline" aria-label="폴더와 앱 만들기, GitHub 저장소, Vercel 배포, 환경 변수 등록 순서">
        <article><span>01</span><h3>폴더와 앱</h3><p>내 컴퓨터에서 만들고 시험해요</p></article>
        <article><span>02</span><h3>GitHub</h3><p>코드를 온라인 보관함에 올려요</p></article>
        <article><span>03</span><h3>Vercel</h3><p>보관함을 연결해 웹 주소를 만들어요</p></article>
        <article><span>04</span><h3>환경 변수</h3><p>실행에 필요한 설정을 따로 넣어요</p></article>
      </div>
      <aside className="lesson-example"><strong>세 공간을 구분해요</strong><p>폴더는 내 컴퓨터의 작업 공간, repository(저장소)는 GitHub의 코드 보관함, deployment(배포)는 Vercel이 코드를 실행해 웹 주소를 만드는 일이에요. 내 컴퓨터의 localhost 주소는 다른 사람에게 공유할 수 없어요.</p></aside>
    </LessonSection>

    <LessonSection id="review-folder" eyebrow="00:10–00:20 · 1단계" title="새 폴더를 만들고 VS Code로 열어요" intro="앱 하나에 폴더 하나를 사용해요. 이전에 만든 앱과 섞이지 않도록 복습용 폴더를 따로 만듭니다.">
      <Activity title="작업 공간 준비하기" steps={["바탕화면이나 문서 폴더에서 새 폴더를 만들어요. 이름은 my-review-app처럼 영문으로 정해요.", "VS Code를 실행하고 File → Open Folder(폴더 열기)에서 방금 만든 폴더를 선택해요.", "왼쪽 탐색기에 my-review-app 폴더 이름이 보이는지 확인해요.", "수업에서 사용한 AI 코딩 도구에서 같은 폴더를 작업 공간으로 열어요."]} />
      <aside className="lesson-example"><strong>완료 확인</strong><p>VS Code 왼쪽 위에 내가 만든 폴더 이름이 보이면 준비 끝이에요. 앞으로 만드는 파일은 이 폴더 안에 저장해요.</p></aside>
    </LessonSection>

    <LessonSection id="review-build" eyebrow="00:20–00:45 · 2단계" title="배운 방법으로 작은 앱을 다시 만들어요" intro="사용자, 문제, 핵심 기능, 완료 기준을 적고 AI에 요청해요. 처음에는 기능 한 가지만 완성합니다.">
      <div className="lesson-code-example"><span className="code-file">대괄호 내용을 내 앱에 맞게 바꿔 AI에게 보내요</span><pre><code>{BUILD_PROMPT}</code></pre></div>
      <Activity title="요청 → 실행 → 확인 → 수정 복습" steps={["위 요청의 대괄호를 채워 AI에게 보내요.", "생성한 파일이 내 폴더 안에 생겼는지 확인해요.", "VS Code의 Terminal → New Terminal을 열고, AI가 안내한 설치·실행 명령을 한 줄씩 실행해요.", "터미널에 표시된 localhost 주소를 브라우저에서 열어요. 실행 중인 터미널은 켜 두세요.", "핵심 기능을 직접 눌러 보고, 잘못된 입력도 시험해요.", "문제가 있으면 어떤 입력을 했고 무엇을 기대했는지, 실제로 무엇이 나왔는지 AI에게 전달하고 다시 확인해요."]} />
      <aside className="lesson-example"><strong>완료 확인</strong><p>내 컴퓨터에서 앱이 열리고, 내가 정한 완료 기준 한 가지를 통과하면 다음 단계로 가요. 기존 앱을 배포하려면 이후 단계부터 기존 앱 폴더에서 진행해도 됩니다.</p></aside>
    </LessonSection>

    <LessonSection id="review-repository" eyebrow="00:45–01:00 · 3단계" title="GitHub에 빈 저장소를 만들어요" intro="앱 파일을 넣을 온라인 보관함을 만듭니다. 폴더를 만드는 것과 GitHub 저장소를 만드는 것은 별개의 작업이에요.">
      <a className="lesson-primary-action" href="https://github.com/new" target="_blank" rel="noreferrer">GitHub 새 저장소 만들기 ↗</a>
      <Activity title="New repository 화면 따라가기" steps={["GitHub에 로그인하고 오른쪽 위 + → New repository를 선택해요.", "Owner가 내 계정인지 확인하고 Repository name에 my-review-app처럼 이름을 적어요.", "공개 범위를 선택해요. 수업 복습용 코드는 Private(비공개)로 시작해도 Vercel과 연결할 수 있어요.", "이미 만든 앱을 올리므로 README, .gitignore, License 추가는 선택하지 않고 빈 저장소를 만들어요.", "Create repository를 누른 뒤 HTTPS 주소를 복사해요. 주소는 https://github.com/내아이디/내저장소.git 형태예요."]} />
      <aside className="lesson-example"><strong>완료 확인</strong><p>화면 위에 내 계정 / 저장소 이름이 보이고, Quick setup 안내가 나오면 빈 보관함이 만들어진 거예요. 아직 앱 파일이 없는 것이 정상이에요.</p></aside>
    </LessonSection>

    <LessonSection id="review-push" eyebrow="01:10–01:30 · 4단계" title="내 코드를 GitHub에 올려요" intro="파일 저장 → commit(변경 기록 남기기) → push(GitHub로 보내기) 순서예요. 쉬는 시간 10분 후 진행합니다.">
      <Activity title="올리기 전에 확인하기" steps={["VS Code에서 배포할 앱 폴더를 열고 파일을 모두 저장해요.", "프로젝트 맨 위의 .gitignore에 아래 제외 목록이 있는지 확인하고 없으면 추가해요.", "터미널의 현재 위치가 앱 폴더인지 확인해요. 이미 GitHub에 연결한 앱이라면 아래 첫 연결 명령을 반복하지 말고 기존 저장소를 사용해요."]} />
      <div className="lesson-code-example"><span className="code-file">.gitignore · GitHub로 보내지 않을 파일</span><pre><code>{`.env*\n!.env.example\nnode_modules/\n.next/\n.vercel/`}</code></pre></div>
      <p className="course-note">.env.example에는 실제 키 없이 이름과 가짜 예시만 넣어요. .gitignore는 이미 Git에 기록된 파일을 제거하지 않아요. 비밀 키를 이미 올렸다면 키를 폐기·재발급하고 강사와 기록을 정리해요.</p>
      <div className="lesson-code-example"><span className="code-file">처음 연결할 때만 · 저장소 주소를 내 HTTPS 주소로 바꿔요 · 한 줄씩 실행</span><pre><code>{FIRST_PUSH}</code></pre></div>
      <p className="course-note">git status와 git diff --cached --stat에서 .env 파일이나 비밀 파일이 보이면 commit 전에 멈추고 강사에게 알려주세요. 이름·이메일 설정이나 로그인 안내가 나오면 강사와 본인 계정으로 설정해요.</p>
      <Activity title="온라인 보관함 확인하기" steps={["push가 끝나면 GitHub 저장소 화면을 새로고침해요.", "앱 코드 파일과 ‘앱 첫 버전’이라는 commit 기록이 보이는지 확인해요.", ".env, .env.local, node_modules가 저장소에 없는지 확인해요."]} />
    </LessonSection>

    <LessonSection id="review-vercel" eyebrow="01:30–01:45 · 5단계" title="Vercel에 GitHub를 연결하고 배포해요" intro="Vercel은 GitHub의 코드를 가져와 앱을 실행해요. 내 컴퓨터를 꺼도 접속할 수 있는 웹 주소가 생깁니다.">
      <a className="lesson-primary-action" href="https://vercel.com/new" target="_blank" rel="noreferrer">Vercel 새 프로젝트 열기 ↗</a>
      <Activity title="Import → Deploy → Visit 따라가기" steps={["Vercel에 GitHub 계정으로 로그인해요. 대시보드에서 Add New… → Project를 선택해요.", "Import Git Repository에서 GitHub 연결을 승인해요. 저장소가 안 보이면 Configure GitHub App에서 방금 만든 저장소에 대한 접근을 허용해요.", "내 계정과 저장소 이름을 확인하고 해당 저장소 옆 Import를 눌러요.", "프로젝트 이름과 Framework Preset이 앱에 맞는지 확인해요. Root Directory는 package.json이 있는 앱 폴더예요. 잘 모르겠으면 강사와 확인하고 나머지는 자동 설정을 사용해요.", "환경 변수가 필요한 앱은 아래 6단계의 이름·값을 이 화면의 Environment Variables에 먼저 넣어요. 필요 없는 앱은 바로 Deploy를 눌러요.", "배포가 Ready가 되면 Visit을 눌러요. 오류가 나면 Build Logs의 오류 내용을 확인하고, 키를 가린 뒤 강사에게 보여주세요."]} />
      <aside className="lesson-example"><strong>완료 확인</strong><p>주소가 localhost 대신 https://내프로젝트.vercel.app 형태로 열리는지 확인해요. 이후 같은 저장소의 배포 브랜치(보통 main)에 commit을 push하면 Vercel이 새 버전을 자동 배포해요.</p></aside>
    </LessonSection>

    <LessonSection id="review-env" eyebrow="01:45–02:00 · 6단계 · 마지막 설정" title=".env의 환경 변수를 Vercel에도 옮겨요" intro="환경 변수는 앱 실행에 필요한 설정이에요. 내 컴퓨터의 .env나 .env.local은 Vercel로 자동 복사되지 않으므로, 필요한 이름과 값을 별도로 등록합니다.">
      <div className="lesson-code-example"><span className="code-file">설명용 .env 예시 · 실제로 사용할 값은 내 파일에서 확인해요</span><pre><code>{`DATABASE_URL="postgresql://예시용주소"\nNEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_예시값\nCLERK_SECRET_KEY=sk_예시값`}</code></pre></div>
      <div className="course-table-wrap"><table className="course-table"><caption>.env 한 줄을 Vercel의 두 칸으로 나누기</caption><thead><tr><th>.env에서 확인할 부분</th><th>Vercel 입력칸</th><th>예시</th></tr></thead><tbody><tr><th scope="row">= 왼쪽 · 이름</th><td>Key / Name</td><td><code>DATABASE_URL</code></td></tr><tr><th scope="row">= 오른쪽 · 값</th><td>Value</td><td>내 실제 연결 문자열 (바깥 따옴표 제외)</td></tr></tbody></table></div>
      <Activity title="설정 복사 → 저장 → 재배포" steps={["내 앱 폴더의 .env 또는 .env.local을 열어요. 예시 파일이 아니라 앱이 실제 사용하는 값을 확인해요.", "Vercel에서 내 프로젝트 → Settings → Environment Variables를 열어요.", "Add Environment Variable에서 Key에 = 왼쪽 이름을, Value에 오른쪽 값을 붙여 넣어요. 이름의 대소문자는 그대로 쓰고, 값 전체를 복사하되 바깥 따옴표와 주석은 제외해요.", "Environments에서 공개 앱에 적용할 Production을 선택해요. 미리보기 배포에서도 필요하면 Preview도 선택하고 Save로 저장해요.", "앱에서 사용하는 항목을 한 줄씩 반복해요. 위 예시는 DB·Clerk을 쓰는 앱의 예시이며, 내 앱에 없는 항목을 억지로 추가하지 않아요.", "이미 배포했다면 Deployments → 해당 배포의 … → Redeploy를 선택해요. 환경 변수 변경은 기존 배포에 즉시 적용되지 않아요. 첫 배포 전이라면 Import 화면에서 값을 넣고 Deploy를 눌러요.", "Ready가 된 새 배포의 Visit을 눌러 핵심 기능을 시험해요. DB·로그인을 쓰면 로그인, 저장, 새로고침 후 조회까지 확인해요.", "휴대전화에서도 주소를 열어 확인하고, 다음 시간 발표에 사용할 앱 주소와 대표 동작 한 가지를 메모해요."]} />
      <aside className="lesson-takeaway"><h3>내 앱에 맞는 값을 넣어요</h3><p>비밀 키와 DB 연결 문자열은 GitHub나 수업 기록에 붙여 넣지 않아요. <code>NEXT_PUBLIC_</code>으로 시작하는 값은 브라우저에 공개되므로 비밀 키에 이 접두사를 붙이면 안 돼요. localhost를 가리키는 주소는 실제 배포 주소로 바꾸고, Clerk 등 외부 서비스도 배포 도메인과 운영용 키 설정이 필요한지 확인해요.</p></aside>
      <Review items={[
        { question: "환경 변수가 없는 앱은 어떻게 하나요?", answer: "기본 타이머처럼 외부 서비스나 비밀 설정이 없는 앱은 등록할 항목이 없어요. 배포 주소에서 핵심 기능을 확인하면 됩니다." },
        { question: "내 컴퓨터에서는 되는데 Vercel에서는 안 돼요.", answer: "사용하는 환경 변수의 이름·값과 Production 선택 여부를 확인하고 재배포해요. 로그인·DB 서비스의 배포 도메인과 운영 설정도 확인해요. 오류를 공유할 때는 실제 키를 가려요." },
        { question: "코드를 수정한 뒤에는 어떻게 반영하나요?", answer: "같은 앱 폴더에서 저장 → git status → git add . → git commit -m \"앱 수정\" → git push 순서로 보내요. 비밀 파일이 포함되지 않았는지 확인하고 Vercel에서 새 배포가 Ready인지 확인해요." },
        { question: "오늘의 결과물은 무엇인가요?", answer: "복습한 앱 폴더, 내 코드가 들어 있는 GitHub 저장소, 환경 변수 설정과 기능 확인을 마친 Vercel 앱 주소예요." },
      ]} />
      <div className="lesson-references"><span>공식 안내</span><a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">Git 저장소 연결 ↗</a><a href="https://vercel.com/docs/environment-variables" target="_blank" rel="noreferrer">환경 변수 설정 ↗</a><a href="https://vercel.com/docs/deployments/managing-deployments" target="_blank" rel="noreferrer">재배포 방법 ↗</a></div>
    </LessonSection>
  </div>;
}
