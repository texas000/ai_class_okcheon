import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonWorksheet from "./lesson-worksheet.js";
import ScreenPlayground from "./screen-playground.js";
import DeploymentChecklist from "./deployment-checklist.js";
import { DEPLOY_TROUBLESHOOTING, GITLAB_STEPS, LESSON_FOUR_REFERENCES, PROJECT_MAP, VERCEL_STEPS } from "../lib/lesson-four.js";

const REACT_EXAMPLE = `"use client"; // Next.js에서 클릭·state를 사용하는 화면
import { useState } from "react";

export default function DemoButton({ name }) { // name은 부모가 주는 props
  const [count, setCount] = useState(0); // count: 현재 값, setCount: 바꾸는 함수
  return (
    <button onClick={() => setCount((previous) => previous + 1)}>
      {name} · {count}번 클릭
    </button>
  );
}`;

function DeploySteps({ steps }) {
  return <ol className="deploy-step-list">{steps.map((step, index) => <li key={step.title}><span className="deploy-step-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p><aside><strong>확인</strong> {step.check}</aside></div></li>)}</ol>;
}

export default function LessonFour({ codePractice }) {
  return <div className="lesson-content">
    <LessonSchedule number={4} preparation="수업 전에 GitLab·Vercel 가입과 로그인, NVIDIA API 키 발급을 완료해요. 강사는 가져올 최신 템플릿과 테스트용 모델 접근을 확인해요. 오늘은 브라우저 편집기로 진행하며, 로컬 개발은 아래 선택 실습으로 제공해요. 가입·권한 문제 해결이나 빌드 대기가 길어지면 강사의 시연을 따라 기록하고 나중에 이어서 완성해요." />
    <LessonSection id="build-ready" eyebrow="00:00–00:10 · 준비" title="오늘은 내가 바꾼 앱을 주소로 공유해요" intro="3회차 설계도를 꺼내세요. 완성 목표는 ‘내 이름과 첫 인사가 있는 챗봇 + GitLab 변경 기록 + 접속 가능한 Vercel 주소’예요.">
      <div className="release-pipeline" aria-label="화면 변경, GitLab 커밋, Vercel 빌드, 배포 주소 순서"><article><span>01 · 만들기</span><h3>React·Next.js</h3><p>화면과 서버 코드를 작성</p></article><article><span>02 · 기록하기</span><h3>GitLab</h3><p>저장소에 코드와 커밋 보관</p></article><article><span>03 · 실행 준비</span><h3>Vercel 빌드</h3><p>설치하고 배포용 결과 생성</p></article><article><span>04 · 사용하기</span><h3>배포 주소</h3><p>브라우저에서 실제 앱 실행</p></article></div>
      <aside className="lesson-example"><strong>Git · GitLab · 배포는 서로 다른 일이에요</strong><p>Git은 코드 변경을 기록하는 도구, GitLab은 Git 저장소를 보관하고 협업하는 서비스예요. 커밋은 한 번의 변경 기록이에요. Vercel 배포는 그 코드로 앱을 실행할 수 있게 만드는 과정이에요. 파일을 편집한 것만으로 배포 화면이 바뀌지는 않아요.</p></aside>
      <Activity title="준비물과 목표 확인하기" steps={["GitLab·Vercel에 로그인돼 있는지, NVIDIA API 키를 발급받았는지 확인해요. 키는 본인이 관리하고 서로 공유하지 않아요.", "강사가 공유한 프로젝트 주소를 확인하고 내 앱의 이름과 첫 인사를 정해요.", "오늘은 개인 namespace의 내 GitLab 프로젝트로 진행해요. 발표 때 보여줄 배포 주소는 마지막 활동지에 기록해요."]} />
    </LessonSection>
    <LessonSection id="react-basics" eyebrow="00:10–00:25 · React" title="React는 작은 화면 조각을 조립해요" intro="컴포넌트는 다시 사용할 수 있는 화면 조각이에요. 입력창·전송 버튼·대화 목록을 조립하면 챗봇 화면이 돼요.">
      <div className="react-building-blocks"><span>Chat 화면</span><div><strong>질문 입력창</strong><strong>전송 버튼</strong><strong>대화 목록</strong><strong>참고 자료</strong></div></div>
      <div className="teaching-grid"><article><h3>JSX · 화면을 표현하는 문법</h3><p>JavaScript 안에 HTML처럼 보이는 태그를 써요. <code>{"<h1>안녕하세요</h1>"}</code>는 제목이고, <code>{"{name}"}</code>처럼 중괄호 안에는 JavaScript 값을 넣어요. CSS 연결은 JSX에서 <code>className</code>을 사용해요.</p></article><article><h3>props · 부모가 건네는 값</h3><p><code>{'<DemoButton name="옥천 도우미" />'}</code>에서 name이 props예요. 부모가 이름·설정 같은 정보를 자식 컴포넌트에 전달하고, 자식은 그 값으로 화면을 보여줘요.</p></article><article><h3>state · 화면이 기억하는 값</h3><p>입력한 질문, 대화 목록, 생성 중 여부처럼 바뀌는 값이에요. <code>useState</code>가 현재 값과 바꾸는 함수를 제공하고, 그 함수로 변경하면 React가 화면을 다시 그려요.</p></article><article><h3>이벤트 · 사용자의 행동에 반응</h3><p><code>onClick</code>은 클릭, <code>onChange</code>는 입력 변화에 반응해요. 우리 챗봇에서는 입력 → state 변경 → 전송 요청 → 답변 state 변경 → 화면 갱신이 이어져요. state가 자동으로 서버에 저장되는 것은 아니에요.</p></article></div>
      <div className="lesson-code-example"><span className="code-file">학습용 예제 · 컴포넌트 이름은 대문자로 시작해요</span><pre><code>{REACT_EXAMPLE}</code></pre></div>
      <Activity title="코드의 역할을 찾아요" steps={["예제에서 부모가 주는 값(name), 화면이 기억하는 값(count), 클릭할 때 실행되는 부분(onClick)을 찾아요.", "다음 화면 실험실에서 전송 버튼을 두 번 누르세요. 클릭 횟수만 바뀌고 실제 AI 요청은 보내지 않는 것을 확인해요."]} />
    </LessonSection>
    <LessonSection id="next-basics" eyebrow="00:25–00:40 · Next.js" title="Next.js는 화면과 서버를 한 프로젝트로 연결해요" intro="React가 화면을 구성한다면, Next.js는 페이지 주소, 서버에서 할 일, 빌드 등을 함께 다루는 프레임워크예요. 이 프로젝트는 app 폴더를 사용하는 App Router 방식이에요.">
      <div className="teaching-grid"><article><h3>page.js · 사용자가 여는 페이지</h3><p><code>app/page.js</code>는 <code>/</code>, <code>app/guide/[session]/page.js</code>는 <code>/guide/4</code> 같은 주소를 만들어요. <code>layout.js</code>는 페이지를 감싸는 공통 틀이에요.</p></article><article><h3>route.js · 서버가 받는 요청</h3><p><code>app/api/chat/route.js</code>는 <code>POST /api/chat</code>을 처리해요. 브라우저가 질문을 보내면 서버가 CSV를 읽고 API 키로 NVIDIA에 요청해요.</p></article></div>
      <div className="runtime-map" aria-label="React 화면에서 Next.js 서버에 질문을 보내면 CSV 자료를 검색하여 NVIDIA에 전달하고, 답변 스트림이 서버를 거쳐 React 화면으로 돌아옵니다"><article><span>브라우저</span><h3>React 화면</h3><p>질문 입력 · 대기 표시<br />답변 조각을 state에 추가</p></article><div aria-hidden="true">질문 →<br />← 답변 조각</div><article><span>Vercel에서 실행</span><h3>Next.js 서버</h3><p>/api/chat · CSV 검색<br />API 키로 외부 서비스 호출</p></article><div aria-hidden="true">자료 + 질문 →<br />← 답변 조각</div><article><span>외부 서비스</span><h3>NVIDIA 모델</h3><p>이미 학습된 LLM<br />참고 자료로 답변 생성</p></article></div>
      <aside className="lesson-takeaway"><h3>어떤 코드는 어디에서 실행될까요?</h3><p>App Router의 페이지·레이아웃은 기본적으로 서버 컴포넌트예요. 클릭과 useState를 쓰는 <code>components/chat.js</code>는 <code>{'"use client"'}</code>로 상호작용 경계를 지정해요. 첫 화면은 서버에서 준비할 수도 있지만, 사용자 입력에 반응하는 일은 브라우저에서 해요. 키를 사용하는 API 요청과 CSV 읽기는 서버가 담당해요.</p></aside>
      <details className="project-map-details"><summary>우리 프로젝트 파일 지도 펼치기</summary><div className="project-file-map">{PROJECT_MAP.map((item) => <article key={item.file}><span>{item.area}</span><code>{item.file}</code><h3>{item.role}</h3><p>{item.text}</p></article>)}</div></details>
      <Activity title="질문이 이동하는 곳 짚어보기" steps={["‘풍미당 주소 알려줘’를 보내면 화면의 어떤 값이 바뀌고 어떤 서버 주소로 이동하는지 설명해요.", "CSV 검색, NVIDIA 호출, 스트리밍 글자 표시를 각각 서버·외부 서비스·브라우저에 연결해요.", "‘NVIDIA를 브라우저에서 바로 부르면 키는 어디에 보일까?’를 생각하고 서버 역할의 이유를 말해요."]} />
    </LessonSection>
    <LessonSection id="screen-lab" eyebrow="00:40–01:00 · 화면 변경안" title="내 이름·첫 인사·색상으로 바꿔봐요" intro="아래에서 props와 state의 변화를 체험하고 원하는 변경안을 정해요. 휴식 후 GitLab의 실제 파일에 적용합니다.">
      <ScreenPlayground />
      <Activity title="작은 변경 세 가지 정하기" steps={["챗봇 이름과 첫 인사에 누구를 돕는 앱인지 드러나게 써요. 이름은 40자, 체험용 첫 인사는 120자까지 입력할 수 있어요.", "강조 색상을 선택하고 전송 버튼을 눌러 입력·클릭 → state → 화면 갱신을 관찰해요.", "변경할 파일과 문구를 메모해요. AI의 첫 역할 문장을 바꾸더라도 CSV 사실만 사용하고 모르는 것을 추측하지 않는 기존 규칙은 유지해요."]} />
      {codePractice}
      <p className="course-note">01~03의 코드는 수정할 부분만 보여주는 발췌예요. 파일 전체를 이 짧은 예제로 덮어쓰지 않고 기존 객체·문자열·:root 안의 해당 부분만 바꿔요.</p>
    </LessonSection>
    <LessonSection id="gitlab-lab" eyebrow="01:10–01:30 · GitLab" title="내 저장소에 변경을 기록해요" intro="휴식 후, 내 프로젝트를 만들고 앞에서 정한 변경안을 적용해요. 오늘의 기본 경로는 GitLab 웹 편집기예요.">
      <DeploySteps steps={GITLAB_STEPS} />
      <aside className="lesson-example"><strong>GitHub 템플릿을 GitLab으로 가져오는 경우</strong><p>Repository by URL에 <code>https://github.com/texas000/ai_class_okcheon.git</code> 또는 강사가 공유한 최신 공개 저장소 주소를 넣어요. 가져오기는 그 시점의 코드를 복사하는 것이므로 원본의 이후 변경은 자동으로 따라오지 않아요. GitLab 템플릿이 이미 있다면 내 개인 공간에 Fork하는 경로를 사용해요.</p></aside>
      <div className="teaching-grid"><article><h3>저장소에 포함할 것</h3><p>app/, components/, lib/, 공개 CSV, package.json, package-lock.json, next.config.mjs, .gitignore, .env.example처럼 코드·데이터·설정 예시를 포함해요. .env.example에는 실제 키를 적지 않아요.</p></article><article><h3>컴퓨터·배포 환경에 둘 것</h3><p>실제 키가 있는 .env·.env.local, 설치 폴더 node_modules, 빌드 결과 .next는 올리지 않아요. 이 프로젝트의 .gitignore가 로컬 Git에서 제외하지만 웹 편집기로 직접 올리는 파일은 본인이 확인해야 해요.</p></article></div>
      <details className="project-map-details"><summary>선택 실습 · 로컬에서 개발하고 GitLab에 push하기</summary><div className="local-dev-instructions"><p>강사가 준비한 Node.js 24와 편집기가 있다면 아래 경로도 사용할 수 있어요. 주소와 계정명을 본인 값으로 바꾸고, 브랜치 이름은 실제 기본 브랜치에 맞춰요.</p><pre><code>{`# 내 GitLab 프로젝트를 새 작업 폴더로 복사
git clone https://gitlab.com/내계정/ai-class-my-chatbot.git
cd ai-class-my-chatbot
npm ci

# .env.example을 복사해 .env.local을 만들고 키를 넣어요.
# 편집기에서 복사할 수 있어요. 이 파일은 커밋하지 않아요.
npm run dev
# 터미널에 나온 로컬 주소에서 수정 결과를 확인해요.
# 종료는 Ctrl+C. 그다음 코드 규칙과 빌드를 검사해요.
npm run lint
npm run build

# 필요한 변경 파일만 선택하고 내용을 확인해요.
git add lib/chat-config.js lib/ai-config.js app/globals.css
git diff --staged
git commit -m "챗봇 이름과 테마 수정"
git push origin main`}</code></pre><p>git add는 다음 커밋에 넣을 변경 선택, commit은 로컬 기록, push는 그 기록을 GitLab에 전송하는 명령이에요. 이미 원격 저장소가 있는 기존 폴더라면 origin 주소를 무작정 바꾸지 말고 위처럼 내 GitLab 프로젝트를 새 폴더에 복사해요. 인증은 GitLab의 안내를 따르고 토큰을 코드나 URL에 넣지 않아요.</p></div></details>
    </LessonSection>
    <LessonSection id="vercel-lab" eyebrow="01:30–01:50 · Vercel" title="저장소를 연결하고 첫 배포 주소를 만들어요" intro="Vercel이 GitLab의 코드를 가져와 Next.js 화면과 서버 기능을 배포해요. 이번 경로는 대시보드의 GitLab Import이며 별도 GitLab CI 파이프라인을 작성할 필요가 없어요.">
      <DeploySteps steps={VERCEL_STEPS} />
      <div className="course-table-wrap"><table className="course-table"><caption>이 프로젝트의 배포 설정 확인표</caption><thead><tr><th>항목</th><th>설정</th></tr></thead><tbody><tr><th scope="row">Framework / Root</th><td>Next.js / package.json이 있는 최상위 폴더</td></tr><tr><th scope="row">Build / Output</th><td>npm run build / Next.js 기본값 유지</td></tr><tr><th scope="row">Node.js</th><td>24.x · 프로젝트가 지원하는 버전</td></tr><tr><th scope="row">NVIDIA_API_KEY</th><td>본인 키를 Vercel 환경변수 입력란에만 등록 · 서버 전용</td></tr><tr><th scope="row">NVIDIA_MODEL</th><td>z-ai/glm-5.3-flash · 선택 사항</td></tr><tr><th scope="row">Environment</th><td>Production · 미리보기 테스트를 하면 Preview에도 설정</td></tr></tbody></table></div>
      <aside className="lesson-takeaway"><h3>로컬 주소와 배포 주소의 차이</h3><p>localhost는 내 컴퓨터의 개발 서버예요. Vercel 주소는 Vercel이 제공하는 화면과 서버에 접속해요. 내 컴퓨터의 .env.local 값이 Vercel로 자동 복사되는 것은 아니므로 환경변수를 별도로 등록해요. 환경변수를 변경하면 새 배포를 실행해야 적용돼요.</p></aside>
      <p className="course-note">수업은 본인 개인 공간의 저장소로 진행해요. Vercel Hobby는 비공개 GitLab 그룹 저장소를 지원하지 않으며 자동 배포 시 커밋 작성자와 계정 연결도 확인해요. 저장소를 공개로 바꾸기 전에 강사와 수업 계정 구성을 확인하세요.</p>
    </LessonSection>
    <LessonSection id="deploy-review" eyebrow="01:50–02:00 · 확인과 재배포" title="Ready 다음에는 실제 동작을 확인해요" intro="빌드 성공은 실행 준비가 끝났다는 뜻이에요. 실제 질문과 근거가 정상적으로 표시되는지는 배포된 앱에서 확인해야 해요.">
      <DeploymentChecklist />
      <Activity title="수정 → 커밋 → 새 배포를 한 번 더" steps={["배포 주소에서 새 이름과 첫 인사를 확인하고 ‘풍미당 주소 알려줘’를 보내요. 생성되는 글자가 조금씩 보이는지, 참고 자료의 주소와 같은지 확인해요.", "GitLab에서 greeting의 한 단어를 바꾸고 기본 브랜치에 커밋해요. Vercel Deployments에 새 배포가 생기는지 확인해요.", "새 배포가 Ready가 되면 Production 주소를 새로고침해 문구를 대조해요. 다른 브랜치는 보통 Preview 배포가 되므로 Production Branch를 확인해요.", "배포가 수업 시간 안에 끝나지 않으면 커밋·현재 상태·다음 확인 행동을 기록해 이어서 마무리해요."]} />
      <div className="lesson-section-heading deployment-help-heading"><span className="eyebrow">막혔을 때</span><h2>어느 단계에서 멈췄나요?</h2><p>로그에서 원인을 찾고 수정한 뒤 다시 시도해요. 로그를 공유할 때 키 값은 포함하지 않아요.</p></div>
      <Review items={DEPLOY_TROUBLESHOOTING} />
      <LessonWorksheet id="lesson-4-release-notes" title="4회차 · 화면 변경과 배포 기록" fields={[
        { key: "changes", label: "바꾼 화면과 수정 파일", example: "챗봇 이름 / 첫 인사 / 색상 / 바꾼 파일과 이유" },
        { key: "repository", label: "내 GitLab 프로젝트와 커밋", example: "프로젝트 주소 / 기본 브랜치 / 커밋 메시지 또는 짧은 ID" },
        { key: "deployment", label: "Vercel 배포 주소와 확인 결과", example: "Production 주소 / 화면 확인 / 질문 결과 / 참고 자료 확인 (API 키는 적지 않아요)" },
        { key: "next", label: "재배포 결과와 다음 행동", example: "수정한 첫 인사 / 새 배포 상태 / 해결한 오류 또는 남은 문제 / 다음 확인할 일" },
      ]} />
      <div className="deployment-review-questions"><Review items={[
        { question: "props와 state는 무엇이 다른가요?", answer: "props는 부모가 건네는 값, state는 컴포넌트가 기억하고 변경하는 값이에요. 오늘 이름 입력과 클릭 횟수 변경이 state를 갱신하고, 미리보기에는 props로 전달돼요." },
        { question: "GitLab에 코드를 저장하면 Vercel도 즉시 같은 화면인가요?", answer: "Git 연동이 된 프로젝트에서 커밋된 변경을 감지하면 새 배포를 시작해요. 해당 브랜치의 빌드가 성공하고 배포가 완료돼야 새 화면을 볼 수 있어요." },
        { question: "API 키를 React 화면 코드에 넣어도 되나요?", answer: "브라우저로 전달되므로 키를 노출하게 돼요. 서버 환경변수에 보관하고 Next.js의 /api/chat 서버 기능이 NVIDIA를 호출하게 해요." },
      ]} /></div>
      <aside className="lesson-example"><strong>다음 시간 · 데이터 연결을 더 자세히</strong><p>오늘은 이미 준비된 CSV 검색과 API를 이용해 첫 배포를 했어요. 5회차에는 CSV의 행과 열, 검색 조건, 참고 자료를 만드는 코드를 직접 살펴봐요. 7회차에는 개선된 데이터와 화면의 최종 배포를 점검하고 발표를 준비해요.</p></aside>
      <div className="lesson-references"><span>공식 문서 · 2026-10-05 확인</span>{LESSON_FOUR_REFERENCES.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</div>
    </LessonSection>
  </div>;
}
