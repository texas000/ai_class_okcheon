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
// 5~7회차는 제안한 초안이므로 수업 진행에 맞게 자유롭게 수정하세요.
export const COURSE_SESSIONS = [
  {
    number: 1, label: "함께 시작하기", title: "자기소개와 수업의 목표",
    description: "서로를 알아가고, 8회차 동안 내가 만들고 싶은 애플리케이션을 그려봐요.",
    goals: ["나를 소개하고 8회차의 수업 목표와 흐름을 알아봐요.", "내가 해결하고 싶은 문제와 마지막에 발표할 작품의 목표를 정해요."],
    activities: ["이름, 관심사, AI를 사용해본 경험을 소개해요.", "일상에서 해결하고 싶은 불편함을 하나 골라요.", "마지막 발표 때 보여주고 싶은 작품을 이야기해요."],
    placeholders: [
      { title: "자기소개 활동지", text: "이름 / 관심사 / 수업에 참여한 이유 / 만들고 싶은 것 — 활동지를 여기에 추가해주세요." },
      { title: "수업 목표와 약속", text: "8회차 수업 일정, 준비물, 함께 지킬 약속을 여기에 추가해주세요." },
    ], stepNumbers: [],
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
    number: 5, label: "데이터 연결하기", title: "옥천 식당 데이터로 배우는 AI",
    description: "CSV를 읽고 질문에 필요한 데이터를 골라 AI가 참고하도록 연결해요.",
    goals: ["CSV의 행과 열, 데이터 기준일을 이해해요.", "자료 검색 → AI에 전달 → 답변 생성의 흐름을 설명해요."],
    activities: ["옥천 업소 데이터의 이름과 주소를 확인해요.", "지역이나 업소명으로 검색해요.", "검색한 자료가 AI에게 전달되는 코드를 살펴봐요."],
    placeholders: [
      { title: "데이터 읽기 활동지", text: "CSV에서 찾아볼 업소와 지역, 컬럼 설명 자료를 여기에 추가해주세요." },
      { title: "나의 데이터 계획", text: "내 앱에서 사용할 데이터와 출처, 사용할 수 있는 정보의 범위를 여기에 추가해주세요." },
    ], stepNumbers: ["04", "05", "06", "07"], showDataset: true,
  },
  {
    number: 6, label: "답변 확인하기", title: "AI의 답변을 확인하고 개선하기",
    description: "답변을 원본과 비교하고, 자료에 없는 질문에도 적절하게 답하는지 확인해요.",
    goals: ["AI의 답변과 근거 자료가 일치하는지 확인해요.", "모르는 정보와 오류를 안내하는 방법을 익혀요."],
    activities: ["같은 업소의 답변과 CSV 주소를 비교해요.", "메뉴나 영업시간처럼 자료에 없는 정보를 질문해요.", "개선할 답변 규칙과 화면 안내를 정리해요."],
    placeholders: [
      { title: "답변 확인표", text: "질문 / 기대한 답변 / 실제 답변 / 근거 / 개선할 점 — 확인표를 여기에 추가해주세요." },
      { title: "개선 기록", text: "틀린 답변이나 불편한 동작을 고친 사례를 여기에 추가해주세요." },
    ], stepNumbers: ["08", "09"],
  },
  {
    number: 7, label: "최종 점검·발표 준비", title: "최종 배포를 점검하고 발표 준비하기",
    description: "4회차에 만든 배포 주소에 개선한 화면과 데이터를 반영하고, 친구가 사용할 수 있는지 점검해요.",
    goals: ["GitLab 변경을 Vercel에 반영하고 최종 앱을 점검해요.", "앱의 목적, 주요 기능, 배운 점을 발표로 정리해요."],
    activities: ["데이터와 변경한 코드를 저장소에 올리고 배포해요.", "배포 주소에서 대표 질문을 실행해봐요.", "앱을 시연할 순서와 발표 자료를 준비해요."],
    placeholders: [
      { title: "배포 안내 자료", text: "배포 과정의 화면, 환경변수 설정 방법, 배포 주소를 여기에 추가해주세요." },
      { title: "발표 준비 양식", text: "앱 소개 / 주요 기능 / 시연 질문 / 배운 점 — 발표 자료 양식을 여기에 추가해주세요." },
    ], stepNumbers: ["10"],
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
