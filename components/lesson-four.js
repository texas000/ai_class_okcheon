import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonWorksheet from "./lesson-worksheet.js";
import DeploymentChecklist from "./deployment-checklist.js";
import { DEPLOY_TROUBLESHOOTING, GITHUB_REPOSITORY_URL, GITHUB_SIGNUP_STEPS, LESSON_FOUR_REFERENCES, NVIDIA_BUILD_URL, NVIDIA_KEY_STEPS, VERCEL_DEPLOY_URL, VERCEL_STEPS } from "../lib/lesson-four.js";

function DeploySteps({ steps }) {
  return <ol className="deploy-step-list">{steps.map((step, index) => <li key={step.title}><span className="deploy-step-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p><aside><strong>확인</strong> {step.check}</aside></div></li>)}</ol>;
}

export default function LessonFour() {
  return <div className="lesson-content">
    <LessonSchedule number={4} preparation="GitHub와 NVIDIA 가입에 사용할 이메일과 휴대전화를 준비해요. 계정이 이미 있다면 로그인해 둡니다. NVIDIA API 키는 수업 중에 직접 발급받고, 코드는 수정하지 않은 채 준비된 앱을 그대로 배포해요." />
    <LessonSection id="deploy-ready" eyebrow="00:00–00:15 · 오늘의 목표" title="오늘은 버튼을 눌러 내 앱 주소를 만들어요" intro="어려운 코드 공부는 잠시 미뤄둡니다. 준비된 챗봇을 복사해 인터넷에서 열 수 있는 주소를 만드는 것이 오늘의 목표예요.">
      <div className="release-pipeline" aria-label="GitHub 가입, NVIDIA API 키 발급, Vercel 배포, 완성된 앱 열기 순서"><article><span>01</span><h3>GitHub 가입</h3><p>무료 계정을 만들어요</p></article><article><span>02</span><h3>API 키 발급</h3><p>NVIDIA에서 키를 만들어요</p></article><article><span>03</span><h3>Vercel 배포</h3><p>키를 넣고 실행해요</p></article><article><span>04</span><h3>내 앱 열기</h3><p>완성된 주소를 확인해요</p></article></div>
      <aside className="lesson-example"><strong>오늘 기억할 두 가지</strong><p><b>GitHub</b>는 앱을 만드는 데 필요한 파일이 놓인 온라인 보관함이고, <b>Vercel</b>은 그 파일을 실제 웹사이트로 실행해 주는 서비스예요. 오늘은 보관함 속 파일을 고치지 않고 그대로 사용합니다.</p></aside>
      <Activity title="완성 목표 확인하기" steps={["GitHub 계정을 만들어요.", "NVIDIA Build에서 개인용 API 키를 발급받아요.", "수업용 저장소에서 Deploy with Vercel 버튼을 누르고 API 키를 입력해요.", "완성된 앱 주소에서 질문을 한 번 보내요."]} />
    </LessonSection>
    <LessonSection id="github-signup" eyebrow="00:15–00:35 · 계정 만들기" title="GitHub는 가입만 하면 돼요" intro="GitHub를 배울 필요는 없어요. Vercel이 수업 코드를 복사할 수 있도록 무료 계정을 하나 준비합니다.">
      <a className="lesson-primary-action" href="https://github.com/signup" target="_blank" rel="noreferrer">GitHub 가입 화면 열기 ↗</a>
      <DeploySteps steps={GITHUB_SIGNUP_STEPS} />
      <aside className="lesson-takeaway"><h3>낯선 영어가 보여도 괜찮아요</h3><p><b>Sign up</b>은 가입, <b>Sign in</b>은 로그인이에요. 가입이 끝나면 아래 수업 저장소를 열고 이름만 확인합니다. 초록색 Code 버튼, 브랜치, 커밋 같은 메뉴는 오늘 사용하지 않아요.</p></aside>
    </LessonSection>
    <LessonSection id="nvidia-key" eyebrow="00:35–00:55 · API 키 발급" title="NVIDIA Build에서 내 API 키를 만들어요" intro="API 키는 앱이 NVIDIA의 AI 모델을 사용할 수 있게 해주는 개인용 열쇠예요. Vercel에 배포할 때 이 키가 꼭 필요합니다.">
      <a className="lesson-primary-action" href={NVIDIA_BUILD_URL} target="_blank" rel="noreferrer">NVIDIA Build 열기 ↗</a>
      <DeploySteps steps={NVIDIA_KEY_STEPS} />
      <aside className="lesson-example"><strong>API 키는 비밀번호처럼 다뤄요</strong><p>발급받은 키는 본인만 사용합니다. GitHub 파일, 활동지, 단체 채팅방에 붙여 넣거나 화면 캡처로 공유하지 않아요. 이 수업에서는 Vercel의 <code>NVIDIA_API_KEY</code> 입력칸에만 붙여 넣습니다.</p></aside>
    </LessonSection>
    <LessonSection id="repository-check" eyebrow="00:55–01:05 · 원본 확인" title="선생님이 준비한 앱을 열어요" intro="이 링크에는 오늘 배포할 완성된 코드가 들어 있습니다. 파일을 누르거나 수정할 필요는 없어요.">
      <a className="lesson-primary-action" href={GITHUB_REPOSITORY_URL} target="_blank" rel="noreferrer">수업용 GitHub 저장소 열기 ↗</a>
      <div className="teaching-grid"><article><h3>확인할 것</h3><p>화면 위쪽에 <b>texas000 / ai_class_okcheon</b>이 보이면 맞게 들어온 거예요.</p></article><article><h3>하지 않아도 되는 것</h3><p>코드 읽기, 파일 다운로드, Fork, Git 설치, 명령어 입력은 모두 하지 않아도 됩니다.</p></article></div>
    </LessonSection>
    <LessonSection id="vercel-deploy" eyebrow="01:15–01:45 · 바로 배포" title="버튼 하나로 Vercel에 배포해요" intro="아래 버튼은 수업 코드를 Vercel로 바로 가져갑니다. 프로젝트 이름이나 빌드 설정은 기본값 그대로 두세요.">
      <a className="lesson-primary-action lesson-deploy-action" href={VERCEL_DEPLOY_URL} target="_blank" rel="noreferrer">Deploy with Vercel ↗</a>
      <DeploySteps steps={VERCEL_STEPS} />
      <aside className="lesson-example"><strong>API 키는 비밀번호예요</strong><p><code>NVIDIA_API_KEY</code>라는 이름은 그대로 두고 값 칸에 내 키를 붙여 넣어요. 키를 GitHub 파일, 활동지, 단체 채팅방에 적거나 화면 캡처로 공유하면 안 됩니다.</p></aside>
    </LessonSection>
    <LessonSection id="deploy-review" eyebrow="01:45–02:00 · 확인과 정리" title="완성된 앱을 열고 질문해요" intro="배포가 끝나면 Visit을 눌러 내 앱을 엽니다. 주소를 복사해 두면 다음 수업에도 다시 들어갈 수 있어요.">
      <DeploymentChecklist />
      <Activity title="내 앱 사용해보기" steps={["완성된 앱에서 ‘풍미당 주소 알려줘’라고 질문해요.", "답변 아래 참고 자료를 펼쳐 주소가 같은지 확인해요.", "휴대전화에서도 내 앱 주소를 열어봐요.", "앱 주소만 활동지에 적고 API 키는 절대 적지 않아요."]} />
      <div className="lesson-section-heading deployment-help-heading"><span className="eyebrow">막혔을 때</span><h2>어느 화면에서 멈췄나요?</h2><p>오류를 혼자 해결하려고 설정을 많이 바꾸지 말고, 현재 화면을 강사에게 보여주세요.</p></div>
      <Review items={DEPLOY_TROUBLESHOOTING} />
      <LessonWorksheet id="lesson-4-release-notes" title="4회차 · 나의 첫 배포 기록" fields={[
        { key: "github", label: "GitHub 가입 확인", example: "가입 완료 / 로그인 완료" },
        { key: "nvidia", label: "NVIDIA API 키 발급 확인", example: "발급 완료 여부만 기록해요. 실제 키는 절대 적지 않아요." },
        { key: "deployment", label: "내 Vercel 앱 주소", example: "https://내-프로젝트.vercel.app (API 키는 적지 않아요)" },
        { key: "test", label: "질문해 본 내용과 결과", example: "풍미당 주소 질문 / 답변 확인 / 참고 자료 확인" },
        { key: "help", label: "막힌 화면 또는 다음에 할 일", example: "어느 버튼에서 멈췄는지 간단히 기록" },
      ]} />
      <Review items={[
        { question: "GitHub에서 코드를 수정해야 하나요?", answer: "아니요. 4회차에서는 가입하고 수업 저장소를 확인하기만 해요. 준비된 코드를 그대로 배포합니다." },
        { question: "GitHub와 Vercel은 무엇이 다른가요?", answer: "GitHub는 코드가 놓인 온라인 보관함이고, Vercel은 그 코드를 실행해 웹 주소를 만들어 주는 서비스예요." },
        { question: "다른 사람에게 무엇을 공유하면 되나요?", answer: "완성된 Vercel 앱 주소만 공유해요. NVIDIA API 키는 누구에게도 공유하지 않습니다." },
      ]} />
      <div className="lesson-references"><span>바로가기</span>{LESSON_FOUR_REFERENCES.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</div>
    </LessonSection>
  </div>;
}
