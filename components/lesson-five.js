import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";

const ENV_EXAMPLE = `AI_PROVIDER=nvidia

# 선택한 공급자의 키와 모델만 입력해요.
NVIDIA_API_KEY=
NVIDIA_MODEL=
OPENAI_API_KEY=
OPENAI_MODEL=
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=

# Vercel에서 DB·Blob을 연결하면 자동으로 생기는 값을 사용해요.
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=`;

const PROVIDER_PROMPT = `현재 앱의 AI 호출 코드를 서버 전용 모듈로 분리해줘.
AI_PROVIDER 값에 따라 nvidia, openai, anthropic 중 하나를 사용하게 해줘.

- NVIDIA: NVIDIA_API_KEY, NVIDIA_MODEL
- OpenAI API: OPENAI_API_KEY, OPENAI_MODEL, 공식 openai SDK와 Responses API
- Claude API: ANTHROPIC_API_KEY, ANTHROPIC_MODEL, 공식 @anthropic-ai/sdk와 Messages API

API 키는 서버 환경변수에서만 읽고 브라우저 코드, 로그, GitHub에 노출하지 마.
공급자별 응답을 앱이 사용하는 같은 형식으로 변환해줘.
키나 모델이 없거나 요청이 실패하면 다른 공급자로 몰래 바꾸지 말고 이해하기 쉬운 오류를 보여줘.
변경 후 가짜 응답 테스트와 프로덕션 빌드를 실행해줘.`;

const DATABASE_PROMPT = `현재 로컬 SQLite 저장 코드를 Vercel에서 사용할 Postgres 저장 모듈로 교체해줘.
Vercel Marketplace에서 연결한 Postgres의 DATABASE_URL 환경변수를 서버에서만 사용해줘.
기존 데이터 구조를 표로 정리하고 마이그레이션과 seed 명령을 만들어줘.
SQL은 파라미터 바인딩을 사용하고 필요한 인덱스와 트랜잭션을 적용해줘.
기존 로컬 데이터를 삭제하지 말고, 전환 전 백업과 확인 방법을 README에 적어줘.
연결 실패·빈 데이터·저장·조회·수정·삭제를 테스트해줘.`;

const BLOB_PROMPT = `현재 로컬 업로드 폴더를 Vercel Blob 저장 모듈로 교체해줘.
공식 @vercel/blob 패키지와 BLOB_READ_WRITE_TOKEN 환경변수를 사용해줘.
파일 내용은 Blob에, 파일 이름·URL·크기·MIME·소유 정보는 DB에 저장해줘.
허용 확장자와 최대 크기를 서버에서도 검사하고 파일 이름을 그대로 저장 경로로 신뢰하지 마.
공개 파일과 비공개 파일 중 현재 앱에 맞는 방식을 설명하고 하나를 선택해줘.
업로드 실패 시 DB 기록과 Blob 파일이 어긋나지 않게 처리하고 업로드·열기·삭제를 테스트해줘.`;

export default function LessonFive() {
  return <div className="lesson-content">
    <LessonSchedule number={5} preparation="4회차에 만든 앱의 GitHub 저장소와 Vercel 프로젝트를 준비해요. API 키는 채팅이나 코드에 붙이지 않고 Vercel 환경변수 입력 화면에서만 사용합니다." />

    <LessonSection id="connect-map" eyebrow="00:00–00:10 · 연결 지도" title="오늘은 앱에 세 가지 바깥 기능을 연결해요" intro="AI는 답변을 만들고, DB는 표처럼 정리된 정보를 저장하고, Blob은 사진·영상·문서 파일을 보관해요.">
      <div className="restaurant-analogy">
        <article><span>01 · AI API</span><h3>NVIDIA·OpenAI·Claude</h3><p>앱 서버가 질문을 보내고 생성된 답변을 받아요.</p><small>환경변수: 공급자별 API 키</small></article>
        <article><span>02 · Database</span><h3>Marketplace Postgres</h3><p>사용자 입력, 일정, 작품 정보처럼 검색하고 수정할 데이터를 저장해요.</p><small>환경변수: DATABASE_URL 등</small></article>
        <article><span>03 · File storage</span><h3>Vercel Blob</h3><p>사진, 영상, PDF처럼 큰 파일을 저장하고 URL로 다시 꺼내요.</p><small>환경변수: BLOB_READ_WRITE_TOKEN</small></article>
      </div>
      <aside className="lesson-takeaway"><h3>Vercel 서버 안의 폴더에 저장하면 안 되나요?</h3><p>배포된 함수의 로컬 파일은 영구 저장소가 아니에요. 구조화된 정보는 DB, 업로드 파일은 Blob처럼 배포와 분리된 저장소에 보관해요.</p></aside>
    </LessonSection>

    <LessonSection id="ai-provider" eyebrow="00:10–00:30 · AI 공급자" title="NVIDIA, OpenAI, Claude 중 연결할 API를 정해요" intro="세 서비스 모두 앱의 서버에서 호출해요. ChatGPT·Claude 구독과 개발자 API 키·사용 요금은 별개일 수 있으므로 각 개발자 콘솔에서 확인해요.">
      <div className="course-table-wrap"><table className="course-table"><caption>AI API 연결에 필요한 값</caption><thead><tr><th>화면에서 부르는 이름</th><th>앱에서 연결하는 것</th><th>환경변수</th><th>서버 호출 방식</th></tr></thead><tbody>
        <tr><th scope="row">NVIDIA</th><td>NVIDIA Build/NIM API</td><td><code>NVIDIA_API_KEY</code><br /><code>NVIDIA_MODEL</code></td><td>OpenAI 호환 endpoint</td></tr>
        <tr><th scope="row">ChatGPT</th><td>OpenAI API</td><td><code>OPENAI_API_KEY</code><br /><code>OPENAI_MODEL</code></td><td>공식 SDK의 Responses API</td></tr>
        <tr><th scope="row">Claude</th><td>Claude API</td><td><code>ANTHROPIC_API_KEY</code><br /><code>ANTHROPIC_MODEL</code></td><td>공식 SDK의 Messages API</td></tr>
      </tbody></table></div>
      <aside className="lesson-example"><strong>서비스 이름과 API 이름을 구분해요</strong><p>수업에서는 익숙하게 “ChatGPT 연결”이라고 말하지만, 코드에서는 OpenAI 개발자 API를 연결해요. ChatGPT 로그인이나 유료 구독만으로 API 키가 자동 생성되지는 않아요.</p></aside>
      <Activity title="연결 전 안전 확인" steps={["사용할 공급자 한 곳과 모델을 정하고 해당 개발자 콘솔에서 API 키를 준비해요.", "API 사용 한도와 과금 설정을 확인해요.", "키를 AI 대화, 코드, README, GitHub에 붙여 넣지 않아요.", "로컬은 .env.local, 배포 앱은 Vercel Environment Variables에 저장해요."]} />
    </LessonSection>

    <LessonSection id="ai-api" eyebrow="00:30–00:55 · API 연결" title="앱 서버에 AI 공급자 선택 기능을 만들어요" intro="브라우저가 API 회사를 직접 호출하지 않도록, 앱 서버가 환경변수를 읽고 요청을 대신 보내요.">
      <div className="lesson-code-example"><span className="code-file">.env.example · 실제 키는 적지 않아요</span><pre><code>{ENV_EXAMPLE}</code></pre></div>
      <div className="lesson-code-example"><span className="code-file">AI 코딩 도구에 보낼 연결 프롬프트</span><pre><code>{PROVIDER_PROMPT}</code></pre></div>
      <Activity title="한 공급자부터 연결하고 확인하기" steps={["선택한 공급자의 공식 SDK와 서버 모듈을 추가해요.", "환경변수 이름만 .env.example에 적고 실제 값은 .env.local과 Vercel에 넣어요.", "정상 질문, 빈 질문, 잘못된 키, 시간 초과를 확인해요.", "답변이 나오면 어떤 공급자와 모델을 사용했는지 서버 설정에서 확인해요."]} />
    </LessonSection>

    <LessonSection id="vercel-db" eyebrow="01:05–01:25 · Vercel DB" title="구조화된 데이터는 Marketplace Postgres에 연결해요" intro="현재 Vercel Postgres라는 새 제품을 만드는 방식이 아니라, Vercel Marketplace에서 Neon·Supabase 같은 Postgres 공급자를 선택해 프로젝트에 연결해요.">
      <Activity title="Vercel에서 DB 연결하기" steps={["Vercel 프로젝트의 Storage 또는 Marketplace에서 Postgres 공급자를 선택해요.", "무료·유료 범위, 리전과 데이터 보관 조건을 확인한 뒤 데이터베이스를 만들어요.", "내 Vercel 프로젝트에 연결하고 자동으로 추가된 환경변수를 확인해요.", "환경변수가 추가된 뒤 새 배포를 만들어요.", "앱에서 샘플 한 건을 저장하고 새로고침·재배포 후에도 남아 있는지 확인해요."]} />
      <div className="lesson-code-example"><span className="code-file">AI 코딩 도구에 보낼 DB 전환 프롬프트</span><pre><code>{DATABASE_PROMPT}</code></pre></div>
      <aside className="lesson-takeaway"><h3>DB에 넣기 좋은 것</h3><p>행사명·날짜, 작품 제목, 사용자 설정, 파일의 URL과 설명처럼 검색·수정해야 하는 정보를 저장해요. 이미지나 영상의 실제 파일 내용은 Blob에 저장해요.</p></aside>
    </LessonSection>

    <LessonSection id="vercel-blob" eyebrow="01:25–01:45 · 파일 저장소" title="사진·영상·문서는 Vercel Blob에 연결해요" intro="Vercel Blob은 배포가 다시 되어도 업로드 파일을 별도로 보관하고, 앱이 사용할 URL을 돌려줘요.">
      <Activity title="Vercel Blob 연결하기" steps={["Vercel 프로젝트의 Storage에서 Blob store를 만들고 Public 또는 Private 접근 방식을 정해요.", "프로젝트 연결 후 BLOB_READ_WRITE_TOKEN이 추가됐는지 확인해요.", "공식 @vercel/blob 패키지로 서버 업로드 기능을 연결해요.", "작은 테스트 파일을 업로드하고 열기·목록·삭제를 확인해요.", "파일 크기·형식 제한과 누가 업로드·열람·삭제할 수 있는지 확인해요."]} />
      <div className="lesson-code-example"><span className="code-file">AI 코딩 도구에 보낼 Blob 전환 프롬프트</span><pre><code>{BLOB_PROMPT}</code></pre></div>
      <aside className="lesson-example"><strong>파일과 파일 정보는 나눠 저장해요</strong><p>Blob에는 파일 내용, DB에는 Blob URL·원본 이름·크기·MIME·소유 정보를 저장해요. 둘 중 하나만 삭제되어 고아 파일이나 깨진 기록이 생기지 않도록 함께 확인해요.</p></aside>
    </LessonSection>

    <LessonSection id="connection-test" eyebrow="01:45–01:55 · 통합 테스트" title="로컬과 배포 주소에서 같은 흐름을 확인해요" intro="각 연결이 따로 동작해도 전체 흐름이 실패할 수 있어요. 실제 사용 순서로 한 번 끝까지 시험해요.">
      <div className="course-table-wrap"><table className="course-table"><caption>연결 완료 확인표</caption><thead><tr><th>연결</th><th>정상 확인</th><th>오류 확인</th></tr></thead><tbody>
        <tr><th scope="row">AI API</th><td>질문에 선택한 공급자의 답변 표시</td><td>키 없음·잘못된 키·시간 초과 안내</td></tr>
        <tr><th scope="row">Postgres</th><td>저장 후 새로고침·재배포에도 조회</td><td>연결 실패·잘못된 입력 안내</td></tr>
        <tr><th scope="row">Blob</th><td>업로드·열기·삭제 정상 동작</td><td>크기 초과·금지 형식·권한 오류 안내</td></tr>
      </tbody></table></div>
      <Activity title="배포까지 마무리하기" steps={["환경변수 이름과 대상 환경(Development·Preview·Production)을 확인해요.", "새 배포를 만들고 Vercel 로그에 키나 입력 전문이 출력되지 않는지 확인해요.", "배포 주소에서 핵심 사용자 흐름을 실행해요.", "실패하면 어느 연결에서 멈췄는지 구분해 오류 문구와 함께 AI에게 전달해요."]} />
    </LessonSection>

    <LessonSection id="connection-review" eyebrow="01:55–02:00 · 정리" title="무엇을 어디에 저장하는지 설명해봐요" intro="서비스 이름보다 역할과 비밀 정보의 위치를 기억하면 다른 앱에도 같은 구조를 적용할 수 있어요.">
      <Review items={[
        { question: "AI API 키는 어디에 저장하나요?", answer: "브라우저 코드나 GitHub가 아니라 서버의 환경변수에 저장해요. 로컬은 .env.local, 배포는 Vercel Environment Variables를 사용해요." },
        { question: "Vercel DB와 Blob은 어떻게 다른가요?", answer: "Marketplace Postgres는 검색·수정할 구조화된 정보를 저장하고, Blob은 사진·영상·문서 같은 파일 내용을 저장해요." },
        { question: "Storage 연결 후 바로 이전 배포에 적용되나요?", answer: "새 환경변수가 생겼다면 새로 배포한 뒤 확인해야 해요." },
      ]} />
      <div className="lesson-references"><span>공식 참고 자료</span>
        <a href="https://docs.nvidia.com/nim/large-language-models/latest/api-reference.html" target="_blank" rel="noreferrer">NVIDIA NIM API ↗</a>
        <a href="https://developers.openai.com/api/docs/quickstart" target="_blank" rel="noreferrer">OpenAI API 시작하기 ↗</a>
        <a href="https://platform.claude.com/docs/en/api/typescript/messages/create" target="_blank" rel="noreferrer">Claude Messages API ↗</a>
        <a href="https://vercel.com/docs/marketplace-storage" target="_blank" rel="noreferrer">Vercel Marketplace Storage ↗</a>
        <a href="https://vercel.com/docs/vercel-blob/using-blob-sdk" target="_blank" rel="noreferrer">Vercel Blob ↗</a>
      </div>
    </LessonSection>
  </div>;
}
