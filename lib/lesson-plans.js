// 2~6회차 시간표입니다. target은 각 본문의 id와 일치해야 해요.
export const LESSON_PLANS = {
  2: [
    {"minutes": 10, "title": "타이머 앱 돌아보기", "activity": "요청 → 만들기 → 확인 과정과 오늘의 결과물 확인", "target": "vibe-review", "kind": "대화"},
    {"minutes": 15, "title": "바이브 코딩 방법", "activity": "작게 요청하고 실행·테스트·수정하는 반복 이해", "target": "vibe-method", "kind": "개념"},
    {"minutes": 15, "title": "타이머 완료 모습 정하기", "activity": "사용자·입력·결과·완료 기준 작성", "target": "timer-plan", "kind": "계획"},
    {"minutes": 25, "title": "타이머 앱 만들기", "activity": "첫 프롬프트 전송 → 파일 생성 → 로컬 실행", "target": "timer-build", "kind": "실습"},
    {"minutes": 10, "title": "쉬는 시간", "activity": "실행 중인 서버 터미널은 켜 두고 쉬어요.", "kind": "휴식"},
    {"minutes": 20, "title": "타이머 직접 테스트", "activity": "시작·일시정지·다시 시작·초기화와 잘못된 입력 확인", "target": "timer-test", "kind": "테스트"},
    {"minutes": 15, "title": "한 가지 개선하기", "activity": "구체적으로 요청 → 수정 → 기본 기능 다시 확인", "target": "timer-change", "kind": "바이브코딩"},
    {"minutes": 10, "title": "제작 과정 정리", "activity": "프롬프트·테스트 결과 저장과 다음 수업 준비", "target": "timer-review", "kind": "정리"},
  ],
  3: [
    {"minutes": 10, "title": "앱과 계정 준비 확인", "activity": "타이머 실행·GitHub 가입·Vercel 로그인·.gitignore 확인", "target": "deploy-ready", "kind": "준비"},
    {"minutes": 15, "title": "가입 후 개발 도구와 GitHub 이해", "activity": "VS Code 설치·.env·commit·push와 GitHub → Vercel 흐름 이해", "target": "github-basics", "kind": "개념"},
    {"minutes": 25, "title": "GitHub에 코드 올리기", "activity": "빈 저장소 생성 → 비밀 파일 확인 → 첫 commit과 push", "target": "github-push", "kind": "실습"},
    {"minutes": 10, "title": "쉬는 시간", "activity": "GitHub 저장소에 코드가 보이는지 확인해요.", "kind": "휴식"},
    {"minutes": 20, "title": "Vercel에 배포하기", "activity": "GitHub 저장소 Import → 설정 확인 → Deploy", "target": "vercel-deploy", "kind": "배포"},
    {"minutes": 10, "title": "공개 주소 테스트", "activity": "새 브라우저와 휴대전화에서 타이머 기능 확인", "target": "deploy-check", "kind": "테스트"},
    {"minutes": 30, "title": "목표 앱 프롬프트 만들기", "activity": "사용자·문제·핵심 기능·입력과 결과·완료 기준 작성", "target": "target-app-prompt", "kind": "설계"},
  ],
  4: [
    {"minutes": 10, "title": "설계와 준비 상태 확인", "activity": "VS Code 설치·프로젝트 폴더·첫 요청 확인", "target": "vscode-setup", "kind": "준비"},
    {"minutes": 15, "title": "첫 개발 요청 보내기", "activity": "핵심 기능과 완료 기준 전달", "target": "build-first-request", "kind": "요청"},
    {"minutes": 25, "title": "AI와 첫 앱 만들기", "activity": "생성 결과 확인·의존성 설치·로컬 실행", "target": "build-local", "kind": "실습"},
    {"minutes": 10, "title": "쉬는 시간", "activity": "실행 중인 서버 터미널은 켜 두고 쉬어요.", "kind": "휴식"},
    {"minutes": 25, "title": "시험하고 오류 고치기", "activity": "대표 동작 시험·오류 전달·재확인", "target": "build-test", "kind": "실습"},
    {"minutes": 20, "title": "작은 변화 하나 적용하기", "activity": "요청 → 수정 → 같은 동작으로 비교", "target": "build-change", "kind": "바이브코딩"},
    {"minutes": 15, "title": "결과 저장과 다음 수업 준비", "activity": "실행 방법·확인 결과·Neon DB 연결 계획 기록", "target": "build-review", "kind": "정리"},
  ],
  5: [
    {"minutes": 10, "title": "DB와 저장 흐름 이해", "activity": "브라우저 → 서버 → Neon과 영구 저장 이해", "kind": "개념", "target": "db-map"},
    {"minutes": 20, "title": "Neon DB 준비", "activity": "프로젝트 생성·연결 문자열·DATABASE_URL 설정", "kind": "준비", "target": "neon-setup"},
    {"minutes": 25, "title": "Neon 연결 Instruction", "activity": "기존 데이터 백업·스키마 확인·DB 연결", "kind": "실습", "target": "neon-instruction"},
    {"minutes": 10, "title": "쉬는 시간", "activity": "연결 문자열이 코드나 GitHub에 포함되지 않았는지 확인해요.", "kind": "휴식"},
    {"minutes": 25, "title": "저장·조회·수정·삭제", "activity": "앱 화면과 Neon 테이블에서 같은 기록 확인", "kind": "DB", "target": "db-crud"},
    {"minutes": 20, "title": "오류와 데이터 이전 확인", "activity": "빈 결과·연결 실패·기존 데이터 보존 확인", "kind": "테스트", "target": "db-test"},
    {"minutes": 10, "title": "연결 결과와 다음 수업 준비", "activity": "환경변수 이름·확인 결과·Clerk 연결 계획 기록", "kind": "정리", "target": "db-review"},
  ],
  6: [
    {"minutes": 10, "title": "로그인과 데이터 권한 이해", "activity": "Clerk 사용자 확인·서버 권한 검사·Neon 역할 구분", "kind": "개념", "target": "auth-map"},
    {"minutes": 20, "title": "Clerk 앱과 키 준비", "activity": "로그인 방식 선택·개발용 키·환경변수 설정", "kind": "준비", "target": "clerk-setup"},
    {"minutes": 25, "title": "Clerk 로그인 연결 Instruction", "activity": "회원가입·로그인·프로필·로그아웃 구현", "kind": "실습", "target": "clerk-instruction"},
    {"minutes": 10, "title": "쉬는 시간", "activity": "Secret key가 공개되지 않았는지 확인해요.", "kind": "휴식"},
    {"minutes": 25, "title": "사용자별 Neon 데이터 연결", "activity": "검증한 userId와 데이터 소유권 연결", "kind": "DB", "target": "auth-data"},
    {"minutes": 20, "title": "배포와 접근 권한 확인", "activity": "비로그인·계정 A·계정 B의 화면과 API 확인", "kind": "테스트", "target": "auth-test"},
    {"minutes": 10, "title": "결과 저장과 발표 준비", "activity": "검증 결과 기록·앱별 API·자동화 기능 아이디어 살펴보기", "kind": "정리", "target": "auth-review"},
  ],
};

// 실제 API를 호출하지 않는 설명용 흐름입니다. 운영 앱의 기능과 구분해 보여줍니다.
export const APPLICATION_FLOW = [
  { label: "질문 입력", place: "사용자 · 브라우저", icon: "pen", title: "사용자가 원하는 것을 알려줘요", text: "질문 입력창에 ‘풍미당 주소 알려줘’를 쓰고 전송해요. 화면은 질문을 대화 목록에 추가하고 답변을 기다리는 상태를 보여줘요.", input: "사용자가 쓴 질문", output: "서버에 보낼 대화 메시지", file: "components/chat.js", note: "입력창과 전송 버튼은 프런트엔드예요. 빈 질문은 보내지 않도록 안내해요." },
  { label: "서버에 요청", place: "브라우저 → 우리 서버", icon: "external", title: "화면이 서버에 일을 부탁해요", text: "브라우저는 /api/chat으로 대화 메시지를 보내요. 우리 서버는 요청 형식과 길이를 검사하고 다음 작업을 준비해요. 요청은 부탁하는 내용, 응답은 돌아오는 결과예요.", input: "대화 메시지가 담긴 요청", output: "검사한 질문", file: "app/api/chat/route.js", note: "NVIDIA API 키는 서버의 환경변수에 보관해요. 브라우저에 보내는 코드에 키를 넣지 않아요." },
  { label: "자료 검색", place: "우리 서버 · CSV", icon: "book", title: "모델에 보내기 전에 근거를 찾아요", text: "서버가 CSV를 읽고 사업장명·지역·업태·영업 상태에 맞는 행을 골라요. ‘풍미당’ 행에서 도로명 주소와 전화번호, 데이터 갱신 시점을 함께 준비해요.", input: "질문 + 옥천 식당 CSV", output: "관련 행과 검색 건수", file: "lib/restaurants.js", note: "CSV는 표 데이터예요. 모델이 스스로 파일을 여는 것이 아니라 우리 코드가 검색해요. 못 찾았다고 존재하지 않는 식당이라고 단정하지 않아요." },
  { label: "AI에 전달", place: "우리 서버 → NVIDIA", icon: "sparkles", title: "찾은 자료와 질문을 함께 보내요", text: "서버가 역할 설명·검색한 자료·대화 메시지를 NVIDIA API에 전달해요. 이미 학습된 LLM이 이를 참고해 답변을 생성해요. 우리가 자료를 전달하는 과정과 모델을 학습시키는 과정은 달라요.", input: "질문 + 역할 규칙 + 참고 자료", output: "생성되는 답변 조각", file: "app/api/chat/route.js", note: "외부 AI 서비스가 응답하지 않으면 앱도 오류를 안내해야 해요. 요청에 포함한 질문과 참고 자료는 외부 서비스로 전달돼요." },
  { label: "결과 표시", place: "NVIDIA → 서버 → 브라우저", icon: "chat", title: "답변과 근거를 화면에 보여줘요", text: "서버가 답변 조각을 중계하고 브라우저가 조금씩 이어 붙여 보여줘요. 이것이 스트리밍이에요. 사용자는 ‘참고한 CSV 자료’를 펼쳐 이름과 주소를 확인할 수 있어요.", input: "답변 조각 + 참고 자료", output: "읽고 확인할 수 있는 대화 화면", file: "components/chat.js", note: "전송 전·생성 중·완료·오류는 서로 다른 화면 상태예요. 일부 글자가 보인 뒤에도 생성이 계속될 수 있어요." },
];
