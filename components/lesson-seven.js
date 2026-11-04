import { Activity, LessonSchedule, Review } from "./lesson-blocks.js";
import LessonPublishPrompt from "./lesson-publish-prompt.js";
import { GITHUB_UPLOAD_PROMPT, GITHUB_UPDATE_PROMPT, LESSON_SEVEN_STEPS } from "../lib/lesson-seven.js";

export default function LessonSeven() {
  return <div className="lesson-content publish-lesson">
    <section className="publish-start" aria-label="오늘의 배포 순서">
      <span className="eyebrow">내 컴퓨터에서 인터넷으로</span>
      <h2>만든 앱, 이제 주소로 공유해요.</h2>
      <p>지금 작업한 앱 폴더를 열고 시작하세요.<br />오늘은 이 흐름만 따라가면 됩니다.</p>
      <div className="publish-route"><span>내 컴퓨터<small>작업한 앱</small></span><b aria-hidden="true">→</b><span>GitHub<small>코드 보관함</small></span><b aria-hidden="true">→</b><span>Vercel<small>공유할 웹 주소</small></span></div>
    </section>
    <nav className="publish-nav" aria-label="배포 5단계 바로가기">{LESSON_SEVEN_STEPS.map((step, index) => <a key={step.id} href={`#${step.id}`}><span>{index + 1}</span>{step.label}</a>)}</nav>
    <p className="publish-preparation">준비물 · 기존 앱 폴더 / AI 코딩 도구 / Git 설치 / GitHub·Vercel 로그인</p>
    {LESSON_SEVEN_STEPS.map((step, index) => <section className="publish-step" id={step.id} key={step.id} aria-labelledby={`${step.id}-title`}>
      <header><span className="publish-step-number">{String(index + 1).padStart(2, "0")}</span><div><span className="eyebrow">{step.screen} · {step.time}</span><h2 id={`${step.id}-title`}>{step.title}</h2></div></header>
      <p className="publish-description">{step.description}</p>
      <Activity title="이 순서대로 해보세요" steps={step.steps} />
      {index === 0 && <div className="lesson-code-example"><span className="code-file">.gitignore · 올리지 않을 파일 목록</span><pre><code>{`.env*\n!.env.example\nnode_modules/\n.next/\n.vercel/`}</code></pre><p className="course-note">.env.example에는 실제 키를 넣지 않아요. 이미 Git에 기록된 비밀 파일은 이 목록만으로 사라지지 않아요. 발견하면 업로드를 멈추고 강사와 키 폐기·재발급부터 진행해요.</p></div>}
      {index === 1 && <><LessonPublishPrompt title="AI에게 보낼 GitHub 업로드 요청" buttonLabel="GitHub 업로드 프롬프트 복사" prompt={GITHUB_UPLOAD_PROMPT} /><details className="publish-help"><summary>AI가 직접 올리지 못한다고 하나요?</summary><p>도구마다 파일 접근·명령 실행·GitHub 연결 권한이 달라요. AI가 안내하는 로그인이나 연결을 먼저 진행해요. 계속 막히면 현재 안내를 강사에게 보여주세요. 완료했다는 답변만 믿지 말고 GitHub 링크에서 파일을 확인해요.</p></details></>}
      {index === 2 && <a className="lesson-primary-action" href="https://vercel.com/new" target="_blank" rel="noreferrer">Vercel 열기 ↗</a>}
      {index === 3 && <><div className="publish-env-example" aria-label="환경 변수 입력 예시"><span>예시 · 실제 값은 내 앱의 설정을 사용해요</span><code>DATABASE_URL=내_DB_연결주소</code><div><p><small>Key / Name · 이름</small><strong>DATABASE_URL</strong></p><p><small>Value · 값</small><strong>내_DB_연결주소</strong></p></div></div><p className="course-note">Clerk 앱은 공개 키와 비밀 키, AI 앱은 API 키 등 내 앱이 쓰는 항목만 넣어요. 비밀 키 이름에 NEXT_PUBLIC_을 붙이면 안 돼요. 외부 서비스에서도 배포 도메인·운영 설정을 확인해요.</p><details className="publish-help"><summary>이미 배포한 뒤 설정을 추가하려면?</summary><p>내 프로젝트 → Settings → Environment Variables에서 이름과 값을 넣고 Production을 선택해 저장해요. 미리보기에도 필요하면 Preview를 선택해요. 그다음 Deployments → 해당 배포의 … → Redeploy로 다시 배포해야 적용돼요.</p></details></>}
      {index === 4 && <LessonPublishPrompt title="수정한 뒤 AI에게 보내요" buttonLabel="수정 반영 프롬프트 복사" prompt={GITHUB_UPDATE_PROMPT} />}
      <div className="publish-check"><strong>여기까지 됐나요?</strong><p>{step.check}</p></div>
      {index === 1 && <p className="publish-break">잠깐 쉬어요 · 00:45–00:55 · GitHub에 내 파일이 보이면 10분 휴식</p>}
    </section>)}
    <section className="publish-faq" aria-labelledby="publish-faq-title"><h2 id="publish-faq-title">막혔다면 여기부터 확인해요</h2><Review items={[
      { question: "Vercel에 내 저장소가 안 보여요.", answer: "GitHub에 파일이 올라갔는지 확인해요. Vercel에서 로그인한 GitHub 계정과 Configure GitHub App의 저장소 접근 권한을 확인해요." },
      { question: "내 컴퓨터에서는 되는데 배포하면 안 돼요.", answer: "Build Logs의 첫 오류를 확인해요. 내 앱이 쓰는 환경 변수 이름·값과 Production 적용 여부, Root Directory를 확인하고 다시 배포해요. 키를 가린 오류 화면으로 강사에게 도움을 요청해요." },
      { question: "수정했는데 웹 주소의 내용이 그대로예요.", answer: "저장만으로는 반영되지 않아요. Commit 다음 Push까지 했는지, 연결된 배포 브랜치인지, 새 배포가 Ready인지 확인해요. 환경 변수만 바꿨다면 Redeploy가 필요해요." },
    ]} /></section>
    <details className="publish-schedule"><summary>2시간 수업 시간표 펼치기</summary><LessonSchedule number={7} preparation="기존 앱 폴더, VS Code와 Git, GitHub·Vercel 계정을 준비해요." /></details>
    <div className="lesson-references"><span>공식 안내</span><a href="https://code.visualstudio.com/docs/sourcecontrol/quickstart" target="_blank" rel="noreferrer">VS Code에서 올리기 ↗</a><a href="https://vercel.com/docs/git/vercel-for-github" target="_blank" rel="noreferrer">GitHub 연결 ↗</a><a href="https://vercel.com/docs/environment-variables" target="_blank" rel="noreferrer">환경 변수 ↗</a></div>
  </div>;
}
