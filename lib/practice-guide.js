// 기존 코드 실습 10개입니다. 아래 COURSE_SESSIONS의 stepNumbers로 회차에 배치합니다.
export const GUIDE_STEPS = [
  {
    number: "01",
    title: "챗봇의 이름을 바꿔보세요",
    file: "lib/chat-config.js",
    text: "name과 greeting을 바꾸면 나만의 이름과 첫 인사로 화면이 달라져요.",
    code: 'name: "옥천 식당 도우미",\ngreeting: "옥천의 어떤 식당이 궁금하세요?",',
  },
  {
    number: "02",
    title: "AI에게 역할을 알려주세요",
    file: "lib/ai-config.js",
    text: "SYSTEM_PROMPT는 AI의 역할 설명서예요. 식당 정보는 CSV에 있는 사실만 사용하고, 모르는 것은 모른다고 답하게 해보세요.",
    code: "CSV에 나온 업소명과 주소를 정확하게 안내하세요.\n메뉴와 영업시간은 CSV에 없으므로 추측하지 마세요.",
  },
  {
    number: "03",
    title: "화면에 나만의 색을 입혀보세요",
    file: "app/globals.css",
    text: "--accent 색상을 바꾸고 저장해 보세요. 화면으로 돌아와 버튼과 강조 색상이 어떻게 달라지는지 확인하세요.",
    code: "/* 나만의 테마 색상 */\n--accent: #54765b;",
  },
  {
    number: "04",
    title: "옥천 식당 CSV를 살펴보세요",
    file: "okcheon_restaurant.csv",
    text: "CSV는 쉼표로 칸을 나누는 표예요. 연번, 업종명, 업소명, 도로명 주소, 데이터 기준일의 다섯 컬럼을 확인하세요. 원본에는 메뉴와 영업시간이 없어요.",
    code: "연번,업종명,업소명,소재지(도로명),데이터기준일\n3,일반음식점,풍미당,충청북도 옥천군 옥천읍 중앙로 23-1,2026-09-16",
  },
  {
    number: "05",
    title: "서버에서 CSV를 읽어보세요",
    file: "lib/restaurants.js",
    text: "readFile로 파일을 읽고 parse로 JavaScript 데이터로 바꿔요. split(',')만 쓰면 따옴표 안의 쉼표나 줄바꿈을 잘못 나눌 수 있어 CSV 라이브러리를 사용해요.",
    code: 'const csv = await readFile("okcheon_restaurant.csv", "utf8");\nconst rows = parse(csv, {\n  bom: true, columns: true, skip_empty_lines: true\n});',
  },
  {
    number: "06",
    title: "질문에 맞는 식당을 찾아보세요",
    file: "lib/restaurants.js",
    text: "옥천읍·청산면 같은 지역, 업소 이름, 업종으로 관련 행을 찾아요. 한 번에 최대 12곳만 AI에 보내고, 전체 검색 건수는 따로 알려줘요. 카페는 이름에 카페·커피 등이 들어간 후보를 찾아요.",
    code: "const result = searchRestaurants(restaurants, messages);\n// result.sources: 선택한 업소\n// result.info.matched: 전체 검색 건수",
    prompts: [
      "옥천읍에 어떤 식당이 있는지 5곳 알려줘.",
      "청산면에 등록된 업소는 몇 개야?",
    ],
  },
  {
    number: "07",
    title: "검색한 자료를 AI에게 건네주세요",
    file: "app/api/chat/route.js",
    text: "AI는 내 파일을 스스로 열 수 없어요. 서버가 관련 데이터를 찾아 역할 설명과 함께 보내야 해요. 이것이 검색한 자료를 참고해 답하는 챗봇의 기본 흐름이에요.",
    code: 'messages: [\n  { role: "system",\n    content: SYSTEM_PROMPT + restaurantContext(result) },\n  ...messages\n],\nstream: true',
  },
  {
    number: "08",
    title: "답변과 원본 데이터를 비교해보세요",
    file: "components/chat.js",
    text: "질문을 눌러 대화해보고 답변 아래의 ‘참고한 CSV 자료’를 펼쳐보세요. AI가 말한 업소명과 주소가 원본과 같은지 확인해요. 결과는 실시간으로 스트리밍돼요.",
    code: "질문: 풍미당 주소 알려줘.\n원본: 충청북도 옥천군 옥천읍 중앙로 23-1\n확인: 답변과 CSV의 주소가 같은가요?",
    prompts: [
      "풍미당 주소 알려줘.",
      "옥천읍에 이름에 카페나 커피가 들어간 업소 3곳 알려줘.",
    ],
  },
  {
    number: "09",
    title: "데이터에 없는 정보도 질문해보세요",
    file: "lib/ai-config.js",
    text: "영업시간·메뉴·가격·별점은 원본에 없어요. AI가 모른다고 말하는지 확인하세요. 가게 이름만 보고 메뉴를 단정하지 않고, 실제 방문 전에는 최신 정보를 직접 확인해요.",
    code: "CSV에 없는 항목: 메뉴, 영업시간, 가격, 전화번호, 별점\n검색 결과가 0개: 다른 조건으로 다시 질문하기",
    prompts: [
      "풍미당의 영업시간과 메뉴 가격 알려줘.",
      "옥천 우주정거장식당 주소 알려줘.",
    ],
  },
  {
    number: "10",
    title: "데이터를 바꾸고 다시 배포해보세요",
    file: "next.config.mjs",
    text: "CSV의 행을 추가하거나 주소를 수정한 뒤 같은 질문으로 비교해보세요. 연번은 중복 없이, 다섯 컬럼은 그대로 유지하세요. GitLab 저장소에는 CSV도 함께 올리고 Vercel을 다시 배포해야 반영돼요. 이 설정은 서버 함수에 CSV를 포함해요.",
    code: 'outputFileTracingIncludes: {\n  "/api/chat": ["./okcheon_restaurant.csv"]\n}',
  },
];

// [수정 8] 회차별 제목·목표·활동·자료 자리입니다.
// placeholder 문구를 실제 수업 자료로 바꾸면 해당 회차 페이지에 반영됩니다.
// 6회차는 제안한 초안이며, 5회차와 7회차는 별도 수업 본문을 사용합니다.
export const COURSE_SESSIONS = [
  {
    number: 1, label: "함께 시작하기", title: "자기소개와 첫 앱 아이디어",
    description: "서로를 알아가고, 내가 관심 있는 것과 만들어 보고 싶은 애플리케이션을 이야기해요.",
    goals: ["나의 관심사와 AI를 사용해 본 경험을 소개해요.", "내가 해결하고 싶은 문제와 만들어 보고 싶은 앱을 떠올려요."],
    activities: ["이름, 관심사, AI를 사용해본 경험을 소개해요.", "일상에서 해결하고 싶은 불편함을 하나 골라요.", "마지막 발표 때 보여주고 싶은 작품을 이야기해요."],
    placeholders: [], stepNumbers: [],
  },
  {
    number: 2, label: "AI와 LLM 이해하기", title: "AI와 LLM, 질문하고 확인하기",
    description: "AI의 기본부터 LLM이 만들어지는 과정까지 알아보고, 좋은 질문과 믿을 수 있는 답변을 직접 실험해요.",
    duration: 120,
    goals: ["AI·머신러닝·LLM의 관계와 학습·추론의 차이를 설명해요.", "목적·맥락·출력 형식을 넣어 질문하고, 답변의 근거를 확인해요."],
    activities: ["생활 속 AI 사례를 분류하고 글쓰기 학교의 6단계를 탐색해요.", "조건이 다른 질문을 비교하고 결과를 활동지에 기록해요.", "옥천 식당의 주소와 영업시간 질문으로 사실·불확실성을 구분해요."],
    placeholders: [], stepNumbers: [],
  },
  {
    number: 3, label: "Application 이해하기", title: "Application, 화면 뒤의 동작 이해하기",
    description: "익숙한 앱을 입력·처리·결과로 나누고, 화면·서버·데이터·API가 협력하는 모습을 살펴봐요. 마지막에는 내 앱의 첫 설계도를 만들어요.",
    duration: 120,
    goals: ["앱의 입력·처리·결과와 프런트엔드·백엔드·API의 역할을 구분해요.", "정상·빈 결과·오류 상황을 포함해 나만의 앱 사용자 흐름을 설계해요."],
    activities: ["자주 쓰는 앱을 분석하고 식당의 홀과 주방에 비유해 구조를 설명해요.", "질문부터 스트리밍 답변까지 챗봇의 5단계를 따라가요.", "사용자·핵심 기능·화면을 설계하고 짝과 종이 앱을 시험해요."],
    placeholders: [], stepNumbers: [],
  },
  {
    number: 4, label: "바로 배포하기", title: "준비된 챗봇을 Vercel에 배포하기",
    description: "GitHub에 가입하고 NVIDIA API 키를 발급받은 뒤, 선생님이 준비한 코드를 수정 없이 Vercel에 배포해 내 앱 주소를 만들어요.",
    duration: 120,
    goals: ["GitHub, NVIDIA API 키, Vercel의 역할을 쉬운 말로 구분해요.", "API 키를 발급받고 코드 수정 없이 Vercel 배포와 동작 확인을 완료해요."],
    activities: ["GitHub에 가입하고 수업용 저장소를 확인해요.", "NVIDIA Build에 로그인해 Get API Key와 Generate Key를 차례로 눌러요.", "Deploy with Vercel 버튼을 누르고 발급받은 NVIDIA API 키를 입력해요.", "완성된 앱 주소에서 질문과 참고 자료를 확인해요."],
    placeholders: [], stepNumbers: [],
  },
  {
    number: 5, label: "나의 AI Agent 만들기", title: "데이터·이름·역할을 바꿔 AI 에이전트 만들기",
    description: "4회차에 설계한 내용을 바탕으로 데이터, 화면 이름과 system prompt를 바꿔 나만의 AI 에이전트를 만들어요.",
    duration: 120,
    goals: ["에이전트가 답변에 사용할 데이터와 역할 규칙을 구분해요.", "에이전트 이름과 첫인사, 데이터와 system prompt를 목적에 맞게 바꿔요.", "예상 질문과 실제 답변을 비교해 에이전트가 설계대로 동작하는지 확인해요."],
    activities: ["4회차의 에이전트 설계 질문지를 검토해요.", "준비한 데이터를 표로 정리하고 질문에 필요한 내용이 있는지 확인해요.", "에이전트 이름·첫인사와 system prompt를 바꿔요.", "데이터에 있는 질문과 없는 질문을 보내 답변 규칙을 시험해요."],
    placeholders: [], stepNumbers: ["04", "05", "06", "07", "08", "09"], showDataset: true,
  },
  {
    number: 6, label: "AI로 바이브코딩", title: "내 AI 서비스와 함께 앱 개선하기",
    description: "각자 사용하는 AI 서비스에 원하는 변화를 설명하고, 한 번에 하나씩 적용하며 앱을 개선해요.",
    duration: 120,
    goals: ["원하는 변화를 AI가 이해할 수 있는 구체적인 요청으로 작성해요.", "AI가 제안한 변경을 한 단계씩 적용하고 결과를 확인해요.", "기존 기능과 비밀 키를 안전하게 유지하며 개선한 앱을 배포해요."],
    activities: ["ChatGPT, Claude, Gemini, Copilot 등 각자 사용하는 AI 서비스를 열어요.", "바꾸고 싶은 한 가지와 성공 기준을 설명해요.", "수정 파일과 범위를 확인하고 한 단계씩 적용해요.", "기존 기능과 새 기능을 시험한 뒤 Vercel에 배포해요."],
    placeholders: [], stepNumbers: [],
  },
  {
    number: 7, label: "최종 점검·발표 준비", title: "최종 배포를 점검하고 발표 준비하기",
    description: "완성한 AI 에이전트의 데이터·답변·화면과 배포 주소를 최종 점검하고 발표를 연습해요.",
    duration: 120,
    goals: ["최종 배포 주소에서 데이터·답변·화면이 모두 정상인지 확인해요.", "앱의 목적, 주요 기능과 배운 점을 3분 발표로 정리해요."],
    activities: ["대표 질문과 데이터에 없는 질문으로 최종 답변을 점검해요.", "휴대전화와 컴퓨터에서 배포 주소와 화면을 확인해요.", "발표에 사용할 질문과 시연 순서를 정해요.", "짝과 발표를 연습하고 피드백을 반영해요."],
    placeholders: [], stepNumbers: [],
  },
  {
    number: 8, label: "내 작품 발표하기", title: "내가 만든 애플리케이션 발표",
    description: "직접 만든 앱을 소개하고 시연하며, 함께 만든 경험과 다음 아이디어를 나눠요.",
    goals: ["내 앱이 누구에게 어떤 도움을 주는지 설명해요.", "작품을 시연하고 서로의 피드백을 나눠요."],
    activities: ["앱 이름, 만들게 된 이유, 주요 기능을 소개해요.", "배포한 앱을 열어 대표 기능을 직접 시연해요.", "만들면서 배운 점과 다음에 개선할 점을 이야기해요.", "친구의 발표를 듣고 좋았던 점과 질문을 나눠요."],
    placeholders: [
      { title: "작품 발표 자료", text: "발표 순서, 발표 시간, 작품 소개 슬라이드 양식을 여기에 추가해주세요." },
      { title: "작품 모음과 피드백", text: "참여자별 앱 이름과 배포 링크, 서로에게 남길 피드백 양식을 여기에 추가해주세요." },
    ], stepNumbers: [],
  },
];
