# AI Class — 나의 첫 번째 AI 챗봇

코드를 처음 접하는 사람도 **질문하기 → 코드 바꾸기 → 배포하기**를 경험하는 한국어 AI 수업용 프로젝트입니다. React와 Next.js로 화면과 서버를 만들고, **okcheon_restaurant.csv의 옥천 업소 데이터를 검색해 NVIDIA AI가 참고하도록 연결합니다.** 기본 모델은 `z-ai/glm-5.3-flash`이며 답변은 스트리밍됩니다.

**아래 버튼은 [texas000/ai_class_okcheon](https://github.com/texas000/ai_class_okcheon) 저장소에 연결되어 있습니다. `NVIDIA_API_KEY`를 입력하면 Vercel에서 배포할 수 있습니다.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftexas000%2Fai_class_okcheon&env=NVIDIA_API_KEY&envDescription=NVIDIA%EC%97%90%EC%84%9C+%EB%B0%9C%EA%B8%89%EB%B0%9B%EC%9D%80+API+%ED%82%A4%EB%A5%BC+%EC%9E%85%EB%A0%A5%ED%95%98%EC%84%B8%EC%9A%94.+%ED%82%A4%EB%8A%94+%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C%EB%A7%8C+%EC%82%AC%EC%9A%A9%EB%90%A9%EB%8B%88%EB%8B%A4.&envLink=https%3A%2F%2Fbuild.nvidia.com%2Fz-ai%2Fglm-5-3-flash&project-name=ai-class-chatbot&repository-name=ai-class-chatbot)

## 이 프로젝트로 할 수 있는 것

- 생성되는 답변을 즉시 표시하는 한국어 스트리밍 대화와 후속 질문: AI에 최근 20개 메시지를 전달합니다.
- 예시 질문 카드, 답변의 코드·표·목록 표시, 답변 복사.
- 새 대화, 답변 대기 표시, 실패한 질문 복원과 재전송.
- 컴퓨터와 휴대폰에 맞는 화면, 한글 조합 중 Enter 오전송 방지.
- CSV를 이용한 지역·업소명·업종 검색과 답변 아래 원본 참고 자료 표시.
- 한글 주석과 예시 질문을 실행할 수 있는 **10단계 실습 가이드**.
- NVIDIA API 키를 서버에서만 사용하는 Vercel 배포.

식당 질문과 관련된 CSV 행도 답변 생성을 위해 NVIDIA에 함께 전송됩니다.

대화는 현재 화면의 메모리에만 있습니다. 새로고침하거나 새 대화를 시작하면 사라집니다. 최근 20개보다 오래된 메시지는 화면에 남아도 AI가 기억하지 못합니다. 입력한 대화는 답변 생성을 위해 NVIDIA로 전송됩니다.

## 1. 강사용 준비: 배포 버튼 연결하기

이 저장소의 배포 버튼은 이미 연결되어 있습니다. 다른 저장소로 수업을 진행하려면 아래 순서로 주소를 바꾸세요. 배포 버튼은 GitHub에 올라간 저장소를 가져오므로 로컬 폴더만으로는 사용할 수 없습니다.

1. GitHub에 공개 저장소를 만듭니다. 예: `ai-class-chatbot`.
2. 이 폴더의 파일을 업로드합니다. `package-lock.json`과 `.env.example`도 포함하세요. `node_modules`, `.next`, `.env.local`은 올리지 않습니다.
3. Node.js가 설치된 터미널에서 자신의 실제 주소로 다음 명령을 실행합니다.

   ```bash
   npm run deploy:button -- https://github.com/내계정/ai-class-chatbot
   ```

4. 변경된 `README.md`를 저장소에 다시 올립니다.
5. GitHub README에서 버튼을 클릭해 Vercel 배포 화면과 `NVIDIA_API_KEY` 입력란이 나오는지 확인합니다.

명령은 README의 버튼 주소만 바꿉니다. 자동으로 GitHub에 업로드하거나 배포하지 않습니다. Node.js 없이 수정하려면 버튼의 `repository-url` 값을 아래처럼 실제 주소의 URL 인코딩 값으로 바꿔도 됩니다.

```text
실제 주소: https://github.com/my-account/ai-class-chatbot
인코딩 값: https%3A%2F%2Fgithub.com%2Fmy-account%2Fai-class-chatbot
```

## 2. 학생용: Vercel로 바로 배포하기

로컬 설치 없이도 위의 연결된 버튼으로 배포할 수 있습니다.

1. GitHub 계정과 Vercel 계정을 준비합니다.
2. [NVIDIA 모델 페이지](https://build.nvidia.com/z-ai/glm-5-3-flash)에 로그인하고 API 사용 화면에서 키를 발급받습니다. 모델 접근에 필요한 약관·권한을 확인합니다.
3. 위의 **Deploy with Vercel** 버튼을 클릭합니다.
4. Vercel 안내에 따라 GitHub 연결과 새 저장소 생성을 진행합니다.
5. `NVIDIA_API_KEY`에 발급받은 키를 입력하고 **Deploy**를 클릭합니다. 프로젝트는 Next.js로 감지되며 기본 빌드 설정을 사용합니다.
6. 배포된 주소를 열어 “안녕! 한국어로 자기소개해줘.”라고 질문합니다.

**기본 모델은 `z-ai/glm-5.3-flash`입니다.** 기존 `.env`, `.env.local` 또는 Vercel에 `NVIDIA_MODEL`이 설정되어 있다면 그 값이 우선합니다. 새 기본 모델을 쓰려면 `NVIDIA_MODEL=z-ai/glm-5.3-flash`로 바꾸거나 해당 환경변수를 삭제하고 로컬 서버를 재시작하거나 Vercel을 다시 배포하세요.

API 키는 버튼 URL이나 코드에 적지 않습니다. Vercel의 환경변수 입력란에만 넣습니다. 모델을 바꾸려면 Vercel 프로젝트의 **Settings → Environment Variables**에서 `NVIDIA_MODEL`을 추가하고 다시 배포하세요.

## 3. 내 컴퓨터에서 실행하기

### 준비물

- [Node.js](https://nodejs.org/) 22.13 이상(22 LTS 또는 24 이상). 처음 설치한다면 최신 LTS 버전을 선택하세요. Node.js를 설치하면 npm도 함께 설치됩니다.
- 코드 편집기(예: Visual Studio Code), NVIDIA API 키.

### 실행 순서

프로젝트 폴더를 편집기로 열고 터미널에서 실행합니다.

```bash
npm install
```

`.env.example`을 복사해 `.env.local`이라는 이름으로 저장하세요. macOS/Linux 터미널에서는 다음 명령을 사용할 수 있습니다. Windows에서는 편집기의 파일 복사 기능을 사용해도 됩니다.

```bash
cp .env.example .env.local
```

`.env.local`의 내용을 바꿉니다.

```dotenv
NVIDIA_API_KEY=실제로_발급받은_키
NVIDIA_MODEL=z-ai/glm-5.3-flash
```

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)을 엽니다. 코드를 수정하고 저장하면 개발 화면에 반영됩니다. `.env.local`을 바꿨다면 터미널에서 `Ctrl+C`로 종료한 뒤 `npm run dev`를 다시 실행하세요.

### 명령어 뜻

| 명령어                                | 역할                                                      |
| ------------------------------------- | --------------------------------------------------------- |
| `npm install`                         | 프로젝트에 필요한 라이브러리를 설치합니다.                |
| `npm run dev`                         | 수정 내용을 바로 확인하는 개발 서버를 켭니다.             |
| `npm run build`                       | 실제 배포용 파일을 만듭니다.                              |
| `npm start`                           | 빌드한 배포용 서버를 실행합니다. 먼저 build를 실행하세요. |
| `npm run lint`                        | 코드의 규칙과 잠재적인 문제를 검사합니다.                 |
| `npm test`                            | 실제 NVIDIA 호출 없이 서버 동작을 검사합니다.             |
| `npm run deploy:button -- GitHub주소` | README 버튼에 실제 저장소 주소를 넣습니다.                |

## 4. 처음 배우는 사람을 위한 구조 설명

React는 화면을 구성하고, Next.js는 React 화면과 서버 코드를 같은 프로젝트에서 실행합니다. API는 다른 서비스에 요청을 보내고 결과를 받는 통로입니다. 환경변수는 코드 밖에서 설정하는 값입니다.

```text
사용자가 질문 입력
    ↓
components/chat.js       React가 질문과 대화를 화면에 표시
    ↓ POST /api/chat     질문 데이터를 우리 서버로 전송
lib/restaurants.js      CSV에서 관련 업소 검색 (최대 12곳 + 전체 건수)
app/api/chat/route.js    서버가 CSV 참고 자료, API 키와 AI 역할 설명을 추가
    ↓ POST
https://integrate.api.nvidia.com/v1/chat/completions
    ↓ AI 답변
우리 서버 → 채팅 화면
```

**브라우저는 NVIDIA를 직접 호출하지 않습니다.** 키를 가진 Next.js 서버가 대신 호출합니다. API 키에 `NEXT_PUBLIC_` 접두사를 붙이면 브라우저에 노출될 수 있으니 붙이지 마세요.

```text
app/
  page.js                 홈페이지: 채팅 컴포넌트를 불러옵니다.
  layout.js               한국어 설정, 브라우저 탭 제목, 공통 구조입니다.
  globals.css             색상, 여백, 메뉴와 채팅의 배치입니다.
  icon.svg                브라우저 탭에 표시할 아이콘입니다.
  api/chat/route.js       질문을 받아 NVIDIA에 요청하는 서버입니다.
components/
  chat.js                 입력, 실습 가이드, 대화 상태, 답변 표시를 담당합니다.
  restaurant-sources.js   답변 아래에서 참고한 원본 CSV 행을 보여줍니다.
  icon.js                 작은 SVG 아이콘을 그립니다.
lib/
  chat-config.js          이름, 첫 인사, 예시 질문을 수정하는 곳입니다.
  ai-config.js            AI 역할, 기본 모델, 답변 생성 설정입니다.
  event-stream.js         한글과 SSE 이벤트를 조각에서 복원하는 공통 함수입니다.
  restaurants.js          CSV 읽기, 검증, 검색, 집계, AI 참고 자료 생성입니다.
  practice-guide.js       10단계 실습 문구와 예시 질문입니다.
scripts/deploy-button.js README 배포 버튼을 만드는 도구입니다.
tests/chat.test.js       서버 요청·스트리밍·오류 처리를 검증합니다.
tests/event-stream.test.js 한글과 이벤트의 조각 복원을 검증합니다.
tests/restaurants.test.js CSV 파싱과 실제 데이터 검색을 검증합니다.
okcheon_restaurant.csv    제공된 옥천 업소 데이터입니다.
next.config.mjs           Vercel 서버 함수에 CSV를 포함하는 설정입니다.
.env.example              환경변수의 빈 양식입니다.
.gitignore                GitHub에 올리지 않을 파일 목록입니다.
package.json              라이브러리와 실행 명령 목록입니다.
package-lock.json         설치하는 라이브러리 버전을 고정합니다.
```

## 5. 수업 중 바꿔볼 부분

코드 안의 **[수정 1]~[수정 7]** 주석을 찾아보세요. 작은 부분부터 바꾸고, 저장한 뒤 화면을 확인합니다.

| 만들고 싶은 변화      | 파일                              | 수정할 부분                                             |
| --------------------- | --------------------------------- | ------------------------------------------------------- |
| 나만의 이름과 첫 인사 | `lib/chat-config.js`              | `name`, `subtitle`, `greeting`, `description`           |
| 질문 카드의 주제      | `lib/chat-config.js`              | `STARTER_PROMPTS`의 `title`, `description`, `prompt`    |
| 챗봇의 역할과 말투    | `lib/ai-config.js`                | `SYSTEM_PROMPT`                                         |
| 답변의 다양성과 길이  | `lib/ai-config.js`                | `AI_OPTIONS.temperature`, `AI_OPTIONS.max_tokens`       |
| 브라우저 탭 제목      | `app/layout.js`                   | `metadata.title`, `metadata.description`                |
| 버튼과 강조 색상      | `app/globals.css`                 | `:root`의 `--accent`, `--accent-hover`, `--accent-soft` |
| AI 모델               | `.env.local` 또는 Vercel 환경변수 | `NVIDIA_MODEL`                                          |

### 실습 A: 옥천 식당 도우미

`lib/chat-config.js`의 `name`을 `"옥천 식당 도우미"`로, `greeting`을 `"옥천의 어떤 식당이 궁금하세요?"`로 바꾸세요. `lib/ai-config.js`의 `SYSTEM_PROMPT` 첫 문장도 원하는 역할로 바꿉니다. 식당 정보는 CSV만 근거로 답하고 없는 정보는 추측하지 않는 기존 규칙을 함께 유지하세요.

```js
// SYSTEM_PROMPT의 첫 문장을 바꿔보세요.
당신은 옥천 식당 CSV를 참고하는 친절한 지역 안내 도우미입니다.
```

“풍미당 주소 알려줘.”를 질문하고 **참고한 CSV 자료**를 펼쳐 실제 주소와 비교하세요. 메뉴·영업시간·가격은 데이터에 없습니다.

### 실습 B: 내 스타일의 챗봇

`app/globals.css`의 `--accent`를 `#54765b`로 바꾸고, 질문 카드 하나의 `prompt`를 내가 자주 묻는 질문으로 바꿉니다. 역할 설명을 바꾸기 전과 후에 같은 질문을 보내 답변이 어떻게 달라지는지 비교합니다.

## 6. CSV를 참고하는 옥천 식당 챗봇

### 제공된 데이터

프로젝트 루트의 `okcheon_restaurant.csv`를 그대로 사용합니다. 현재 파일에는 **1,013개 등록 업소**가 있습니다. 일반음식점 811개, 휴게음식점 184개, 제과점영업 18개이며 기준일은 **2026-09-16**입니다. 전체 업소 수를 모두 일반음식점 수라고 설명하지 않도록 구분합니다. 화면의 건수와 기준일은 코드에 고정하지 않고 CSV에서 읽습니다.

| CSV 컬럼       | 담긴 정보            | 예시                               |
| -------------- | -------------------- | ---------------------------------- |
| 연번           | 각 행의 고유 번호    | 3                                  |
| 업종명         | CSV에 등록된 업종    | 일반음식점                         |
| 업소명         | 업소 이름            | 풍미당                             |
| 소재지(도로명) | 도로명 주소          | 충청북도 옥천군 옥천읍 중앙로 23-1 |
| 데이터기준일   | 자료가 작성된 기준일 | 2026-09-16                         |

CSV에는 **메뉴, 가격, 전화번호, 영업시간, 별점, 현재 영업 여부**가 없습니다. AI는 이 내용을 추측하지 않고 자료에서 확인할 수 없다고 안내합니다. 추천 결과도 맛이나 평점의 순위가 아닌 등록 업소의 예시입니다.

### 검색 후 답하는 순서

1. 서버가 CSV 파일을 읽고 `csv-parse`로 행을 JavaScript 객체로 바꿉니다.
2. `searchRestaurants()`가 질문의 지역(옥천읍·청산면 등), 정확한 업소명, 주소 키워드, 업종으로 행을 검색합니다.
3. 선택한 **최대 12개 행**과 전체·지역·업종별 집계, 검색 건수를 AI의 시스템 프롬프트에 추가합니다. `RESTAURANT_RESULT_LIMIT`에서 전달할 행 수를 바꿀 수 있습니다.
4. 서버는 화면에 원본 출처를 먼저 보내고, NVIDIA가 생성하는 답변 조각을 스트리밍합니다.
5. 사용자가 답변 아래 **참고한 CSV 자료**를 펼쳐 업소명과 주소를 직접 확인합니다.

AI는 로컬 파일을 스스로 열지 않습니다. 서버가 관련 내용을 찾아 요청에 넣어주는 방식입니다. 수업용 키워드 검색이므로 별도의 데이터베이스, 임베딩 API, 인터넷 검색은 필요하지 않습니다. 자연어의 모든 표현을 이해하는 검색은 아니므로 결과가 없으면 지역명이나 가게 이름을 구체적으로 바꿔보세요.

카페 검색은 업소명에 `카페`, `커피`, `coffee`, `cafe`가 포함되는 후보를 찾습니다. 간판의 글자 검색이며 실제 메뉴나 전문 업종을 확인한 결과가 아닙니다. 빵집 질문은 CSV의 `제과점영업` 업종을 찾습니다. “그곳 주소는?”처럼 짧은 후속 질문은 이전 사용자의 식당 질문을 함께 참고합니다.

### 화면의 10단계 실습 가이드

| 단계 | 실습                                           |
| ---- | ---------------------------------------------- |
| 01   | 챗봇 이름과 첫 인사 바꾸기                     |
| 02   | AI 역할과 자료 사용 규칙 정하기                |
| 03   | 버튼과 강조 색상 바꾸기                        |
| 04   | CSV의 다섯 컬럼 살펴보기                       |
| 05   | 서버에서 파일을 읽고 표를 객체로 바꾸기        |
| 06   | 지역·업소명·업종으로 필요한 행 검색하기        |
| 07   | 검색한 자료를 AI 요청에 추가하기               |
| 08   | 답변과 원본 출처 비교하기                      |
| 09   | 원본에 없는 정보와 존재하지 않는 가게 질문하기 |
| 10   | CSV를 수정하고 Vercel에 다시 배포하기          |

가이드의 예시 질문을 클릭하면 채팅으로 이동해 실제 질문을 전송합니다.

```text
옥천에 어떤 식당이 있는지 5곳 알려줘.
청산면에 등록된 업소는 몇 개야?
풍미당 주소 알려줘.
옥천읍에 이름에 카페나 커피가 들어간 업소 3곳 알려줘.
풍미당의 영업시간과 메뉴 가격 알려줘.
옥천 우주정거장식당 주소 알려줘.
```

### CSV 수정과 배포

- 파일을 UTF-8 CSV로 저장하고 **다섯 컬럼 이름을 유지**하세요. 각 행의 값을 채우고 연번은 중복 없이 정하세요. CSV 안에서 쉼표나 줄바꿈이 있는 값은 큰따옴표로 감쌉니다.
- 로컬에서는 CSV를 수정하고 화면을 새로고침한 뒤 같은 질문을 보내 비교합니다. 개발 서버는 `npm run dev`로 실행합니다.
- GitHub에 **CSV도 함께 업로드**하고 Vercel을 다시 배포하세요. 배포된 데이터는 그 배포에 포함된 파일입니다.
- `next.config.mjs`의 `outputFileTracingIncludes`는 `/api/chat` 서버 함수에 CSV를 포함하도록 설정합니다. 배포 후에만 파일 미발견 오류가 나면 이 설정과 파일명이 일치하는지 확인하세요.

```js
outputFileTracingIncludes: {
  "/api/chat": ["./okcheon_restaurant.csv"]
}
```

## 7. NVIDIA 요청 이해하기

`app/api/chat/route.js`에는 다음 데이터를 NVIDIA로 보내는 코드가 있습니다.

```js
{
  model: "z-ai/glm-5.3-flash", // 어떤 AI 모델을 사용할지
  messages: [
    { role: "system", content: "친절한 한국어 도우미로 답하세요." }, // AI 역할
    { role: "user", content: "AI가 뭐야?" } // 사용자의 질문
  ],
  temperature: 0.7, // 답변의 다양성
  max_tokens: 1024, // 답변의 최대 길이
  stream: true // 생성되는 답변을 조금씩 바로 받기
}
```

실제 코드는 환경변수와 설정 파일의 값을 사용합니다. `assistant` 역할은 이전 AI 답변입니다. 이전 대화를 함께 보내면 “조금 더 쉽게 설명해줘” 같은 후속 질문을 이해할 수 있습니다. `stream: true`이므로 NVIDIA가 보내는 답변 조각을 받을 때마다 화면이 갱신됩니다. 첫 답변 조각이 오기 전에는 대기 표시가 나오고, 이후에는 “답변 작성 중” 표시와 함께 내용이 이어집니다.

스트리밍은 SSE(Server-Sent Events) 형식으로 전송합니다. 서버는 NVIDIA의 `choices[0].delta.content`만 꺼내 다음처럼 전달합니다.

```text
data: {"delta":"안녕"}

data: {"delta":"하세요!"}

data: {"done":true}

```

`lib/event-stream.js`는 네트워크에서 여러 조각으로 나뉜 이벤트와 한글을 복원합니다. `components/chat.js`의 `for await` 반복문은 답변 조각을 계속 이어 붙여 React 상태를 갱신합니다. 중간 오류는 `{"error":"안내 문구"}` 이벤트로 전달합니다. 완료 신호 없이 끝나면 중단으로 처리합니다.

긴 답변을 위해 NVIDIA 요청은 최대 240초, 브라우저는 250초, Vercel 함수는 300초까지 허용합니다. 배포는 기본으로 활성화되는 Fluid compute를 전제로 합니다. 기존 Vercel 프로젝트에서 Fluid compute를 껐다면 활성화하거나 해당 요금제의 함수 제한에 맞게 시간을 줄이세요. [Vercel 함수 실행 시간 안내](https://vercel.com/docs/functions/configuring-functions/duration)

기본 GLM 모델은 첫 답변 대기를 줄이도록 `reasoning_effort: "low"`와 `clear_thinking: true`를 적용합니다. 모델의 내부 추론(`reasoning_content`)은 화면에 표시하지 않습니다. 생성이 시작되기 전에는 모델 처리 시간이 필요하며 스트리밍 자체가 그 시간을 없애지는 않습니다. 모델을 바꾸면 해당 모델에 맞는 전용 옵션만 보냅니다. [NVIDIA GLM 모델 안내](https://docs.api.nvidia.com/nim/re/reference/z-ai-glm-5-3-flash)

모델을 바꿀 때는 [NVIDIA 모델 카탈로그](https://build.nvidia.com/)의 API 예제에 나온 정확한 `model` 값과 지원 매개변수를 확인하세요. 모델에 따라 접근 권한, 지원 옵션, 응답 시간, 사용 한도가 다릅니다.

## 8. 막혔을 때

| 문제                             | 확인할 내용                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `node` 또는 `npm`을 찾을 수 없음 | Node.js LTS를 설치하고 터미널을 다시 엽니다.                                               |
| API 키 미설정 안내               | `.env.local` 파일명과 `NVIDIA_API_KEY`를 확인합니다. 로컬 서버를 재시작합니다.             |
| 키 또는 접근 권한 오류           | NVIDIA에서 키의 유효성과 모델 접근 권한을 확인합니다.                                      |
| 모델 오류                        | `NVIDIA_MODEL`을 NVIDIA API 예제의 정확한 값으로 바꿉니다.                                 |
| 사용 한도 오류                   | NVIDIA 사용량과 제한을 확인하고 잠시 후 재시도합니다.                                      |
| 응답 시간 초과                   | 질문을 줄이거나 더 빠른 모델을 선택합니다. 서버는 스트리밍 완료까지 최대 240초 기다립니다. |
| Vercel에서만 키 오류             | 프로젝트 환경변수의 적용 환경(Production 등)을 확인하고 Redeploy합니다.                    |
| 배포 버튼이 열리지 않음          | 예시 계정명/저장소이름을 실제 공개 저장소 주소로 바꿨는지 확인합니다.                      |

오류가 나면 질문이 입력창으로 돌아옵니다. 스트리밍 도중 끊기면 이미 받은 내용은 “응답 중단” 표시와 함께 남고, 미완성 질문·답변은 다음 요청의 대화 기록에서 제외됩니다. 문제를 해결한 뒤 전송을 누르면 다시 시도할 수 있습니다.

## 9. 운영 범위와 확인

이 프로젝트는 **개인 실습과 수업용 기본 예제**입니다. 로그인과 사용자별 요청 제한은 포함하지 않습니다. 배포 주소를 아는 사람은 서버의 API 키를 통해 요청할 수 있으므로, 수업용 접근 범위를 정하고 NVIDIA 사용량을 확인하세요. Vercel Deployment Protection을 사용할 경우 수업 참여자의 접근 가능 여부도 확인합니다. 공개 서비스로 확장하려면 인증과 외부 저장소를 사용한 요청 제한을 추가하세요.

입력은 질문당 2,000자, 서버 요청은 최근 20개 메시지와 100KB 이하로 제한합니다. AI 답변의 HTML은 직접 실행하지 않고 마크다운으로 표시합니다. 이런 제한은 사용자별 요청 횟수를 제한하는 기능과는 다릅니다.

```bash
npm run lint
npm test
npm run build
```

자동 테스트는 실제 CSV의 파싱·검색·집계와 NVIDIA에 전달하는 참고 자료를 검사합니다. NVIDIA 응답은 가짜 데이터로 대체합니다. 실제 연결은 본인의 API 키를 설정한 뒤 직접 질문해서 확인하세요.

## 공식 참고 자료

- [Next.js 설치와 프로젝트 구조](https://nextjs.org/docs/app/getting-started/installation)
- [NVIDIA Chat Completions API](https://docs.api.nvidia.com/nim/reference/llm-apis)
- [NVIDIA 기본 모델 페이지와 API 키 준비](https://build.nvidia.com/z-ai/glm-5-3-flash)
- [CSV 읽기 라이브러리의 Sync API](https://csv.js.org/parse/api/sync/)
- [Next.js 서버 파일 포함 설정](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
- [Vercel Deploy Button](https://vercel.com/docs/deploy-button)
- [배포 버튼에서 필수 환경변수 입력받기](https://vercel.com/docs/deploy-button/environment-variables)
