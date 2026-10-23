import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import BuildPromptLibrary from "./build-prompt-library.js";
import { CLERK_INSTRUCTION } from "../lib/connection-instructions.js";

export default function LessonSix() {
  return <div className="lesson-content">
    <LessonSchedule number={6} preparation="5회차에 Neon DB를 연결한 앱과 Clerk 계정을 준비해요. 테스트용 두 계정으로 내 데이터와 다른 사람의 데이터가 구분되는지 확인합니다." />
    <LessonSection id="auth-map" eyebrow="00:00–00:10 · 로그인 이해" title="Clerk은 로그인, Neon은 앱 데이터 저장을 맡아요" intro="로그인은 사용자가 누구인지 확인하는 과정이에요. 로그인 뒤 어떤 데이터를 읽고 바꿀 수 있는지도 서버에서 확인해야 합니다.">
      <div className="restaurant-analogy">
        <article><span>01 · Clerk</span><h3>사용자 확인</h3><p>회원가입·로그인·로그아웃과 세션을 관리하고 사용자 ID를 알려줘요.</p></article>
        <article><span>02 · 앱 서버</span><h3>접근 권한 확인</h3><p>로그인한 userId로 데이터 소유자와 관리자 권한을 검사해요.</p></article>
        <article><span>03 · Neon</span><h3>내 데이터 연결</h3><p>일정·기록에 user_id를 저장해 누구의 데이터인지 구분해요. 비밀번호는 저장하지 않아요.</p></article>
      </div>
      <aside className="lesson-takeaway"><h3>로그인 버튼만 붙이면 끝일까요?</h3><p>버튼을 숨겨도 주소나 API로 직접 요청할 수 있어요. 실제 데이터를 읽고 바꾸는 서버 코드가 로그인과 소유권을 확인해야 해요. 로그인한 모든 사람이 관리자가 되는 것도 아니에요.</p></aside>
    </LessonSection>
    <LessonSection id="clerk-setup" eyebrow="00:10–00:30 · Clerk 준비" title="Clerk 앱을 만들고 두 환경변수를 설정해요" intro="먼저 개발용 인스턴스로 실습해요. 공개할 때는 운영 인스턴스와 배포 도메인 설정도 확인합니다.">
      <p><a className="lesson-action" href="https://dashboard.clerk.com/" target="_blank" rel="noreferrer">Clerk 가입·Dashboard 열기 ↗</a></p>
      <Activity title="내 앱의 로그인 준비하기" steps={["Clerk Dashboard에서 애플리케이션을 만들고 이메일 등 수업에서 사용할 로그인 방식을 선택해요.", "API Keys에서 Publishable key와 Secret key를 확인해요.", "VS Code의 .env.local에 아래 이름으로 입력하고 기존 DATABASE_URL은 유지해요.", "Secret key는 AI 채팅·GitHub·브라우저 코드에 넣지 않아요. 개발 서버를 재시작해요."]} />
      <div className="lesson-code-example"><span className="code-file">.env.example · 실제 키는 적지 않아요</span><pre><code>{`DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`}</code></pre></div>
      <p><a href="https://clerk.com/docs/nextjs/getting-started/quickstart" target="_blank" rel="noreferrer">Clerk 공식 Next.js 시작 안내 ↗</a></p>
    </LessonSection>
    <LessonSection id="clerk-instruction" eyebrow="00:30–00:55 · 로그인 Instruction" title="기존 앱에 회원가입·로그인·로그아웃을 연결해요" intro="아래 Instruction을 AI 코딩 도구에 전달하고 파일·설정·확인 결과를 한 단계씩 살펴봐요.">
      <div className="lesson-code-example"><span className="code-file">6회차 Instruction · 전체를 복사해요</span><pre><code>{CLERK_INSTRUCTION}</code></pre></div>
      <p><a href="/materials/connection-instructions.md" download>5·6회차 Instruction 다운로드 ↓</a></p>
      <Activity title="로그인 화면 확인하기" steps={["현재 프로젝트의 Next.js 버전과 Clerk 설정 파일을 확인해요.", "회원가입 화면에서 테스트 계정을 만들고 로그인 뒤 프로필 버튼이 보이는지 확인해요.", "로그아웃한 뒤 로그인 필수 화면을 직접 열어 로그인 안내로 이동하는지 확인해요.", "로그아웃 상태에서 보호된 API에 직접 요청해도 거부되는지 확인해요."]} />
    </LessonSection>
    <LessonSection id="auth-data" eyebrow="01:05–01:30 · 사용자와 DB 연결" title="Clerk 사용자 ID로 Neon의 내 기록을 구분해요" intro="서버가 확인한 사용자 ID를 데이터에 저장하고, 읽기·수정·삭제할 때 같은 사용자 소유인지 검사합니다.">
      <Activity title="내 기록과 다른 사람의 기록 나누기" steps={["일정·작품·목표 등 개인 데이터에 user_id를 연결해요. 입력 화면에서 소유자 ID를 직접 받지 않아요.", "계정 A로 실습 기록을 만들고 새로고침 뒤에도 보이는지 확인해요.", "다른 브라우저의 계정 B에서 A의 비공개 기록이 보이지 않는지 확인해요.", "B가 A의 기록 주소와 수정·삭제 API를 직접 호출해도 차단되는지 확인해요.", "기존 기록은 백업한 뒤 확인된 계정에만 별도 이관해요. 첫 가입자에게 자동으로 배정하지 않아요."]} />
      <aside className="lesson-example"><strong>공개 데이터와 관리 권한은 별도로 정해요</strong><p>공개 행사는 누구나 읽되 등록·수정은 허용한 관리자만 하도록 정할 수 있어요. 개인 일정과 비공개 작품은 소유자만 읽고 수정하게 해요. 기존 관리자 비밀번호를 교체할 때 우회 경로가 남지 않았는지도 확인해요.</p></aside>
    </LessonSection>
    <LessonSection id="auth-test" eyebrow="01:30–01:50 · 배포와 검증" title="배포 주소에서도 로그인과 데이터 권한을 확인해요" intro="로컬에서 통과한 흐름을 Vercel 새 배포에서도 다시 실행해요. 파일 업로드 앱은 영구 파일 저장소 준비도 먼저 확인합니다.">
      <Activity title="배포 후 세 가지 상태로 시험하기" steps={["Vercel Environment Variables에 DATABASE_URL과 Clerk 키·로그인 경로를 알맞은 환경에 설정해요.", "운영 배포라면 Clerk 운영 인스턴스, 도메인과 로그인 방식을 설정하고 운영 키를 사용해요.", "새 배포 후 회원가입 → 로그인 → 내 데이터 저장·조회 → 로그아웃을 확인해요.", "비로그인, 계정 A, 계정 B에서 화면과 API의 접근 결과를 비교해요.", "기존 핵심 기능과 데이터가 유지되는지 확인하고, 비공개 파일도 다른 계정에서 열리지 않는지 확인해요."]} />
    </LessonSection>
    <LessonSection id="feature-expansion" eyebrow="선택 실습 · 앱 확장" title="내 앱에 어떤 기능을 더하면 좋을까요?" intro="4회차에 만든 7개 앱을 바탕으로 추천했어요. 로그인과 내 데이터 확인을 마쳤다면 내 앱을 펼치고 프롬프트를 복사해 기능 하나를 더해 보세요.">
      <aside className="lesson-takeaway"><h3>추천 1개부터 시작해요</h3><p>각 프롬프트에는 먼저 만들 기능, 다음 확장 후보, 완료 확인 방법이 있어요. 기본은 1단계만 구현하고 다음 단계는 결과를 확인한 뒤 요청해요. 외부 연동은 별도 계정·권한 설정이 필요할 수 있어요.</p><p>Google로 앱에 로그인하는 것과 Google Calendar 접근을 허용하는 것은 별개예요. 일정 앱은 간단한 파일 내보내기부터 시작하거나, 준비가 되면 별도 OAuth 동의를 거쳐 API로 연결해요. <a href="https://developers.google.com/workspace/calendar/api/guides/create-events" target="_blank" rel="noreferrer">Google Calendar 공식 연결 안내 ↗</a></p></aside>
      <BuildPromptLibrary promptsUrl="/materials/feature-expansion-prompts.md" sourceLabel="앱 확장 프롬프트 원본 전체 보기 ↗" />
      <Activity title="기능 하나를 끝까지 확장하기" steps={["내 앱을 펼쳐 추천 기능과 다음 확장 후보를 읽어요.", "프롬프트 전체를 내 앱 프로젝트의 AI 코딩 도구에 붙여 넣어요. 수업 홈페이지 프로젝트와 구분해요.", "기본 1단계 또는 내가 선택한 기능 하나를 구현하고 안내된 완료 기준으로 확인해요.", "기존 기능과 두 계정의 데이터 권한도 다시 확인한 뒤 다음 기능을 요청해요."]} />
    </LessonSection>
    <LessonSection id="auth-review" eyebrow="01:50–02:00 · 정리" title="DB와 로그인이 연결된 앱을 발표 준비해요" intro="7회차에는 완성한 앱의 최종 배포를 점검하고 로그인부터 내 데이터 확인까지 시연을 준비합니다.">
      <Activity title="결과 기록하기" steps={["공개 화면·로그인 필수 화면·관리자 화면을 구분해 기록해요.", "다른 두 계정과 비로그인 상태의 권한 확인 결과를 남겨요.", "비밀값 없이 코드와 README를 GitHub에 저장해요.", "발표에 사용할 테스트 계정과 가상 데이터를 준비해요."]} />
      <Review items={[{ question: "로그인했는데 다른 사람 데이터도 보여요", answer: "서버 조회·수정·삭제 조건에 검증된 userId가 포함됐는지 확인해요. 해결되기 전 개인 데이터를 공개하지 않아요." }, { question: "로컬에서는 되는데 배포에서 로그인이 안 돼요", answer: "배포 환경의 Clerk 키, 운영 인스턴스와 도메인, 로그인 경로를 확인하고 환경변수 변경 후 새 배포를 만들어요. 키 원문은 공유하지 않아요." }]} />
    </LessonSection>
  </div>;
}
