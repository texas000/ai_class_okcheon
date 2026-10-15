// 2~4회차 시간표입니다. target은 각 본문의 id와 일치해야 해요.
export const LESSON_PLANS = {
  2: [
    {"minutes": 10, "title": "생활 속 AI 찾아보기", "activity": "AI 경험과 입력·결과 공유", "target": "ai-warmup", "kind": "대화"},
    {"minutes": 10, "title": "AI·머신러닝·LLM 이해", "activity": "규칙과 학습을 구분하고 LLM의 뜻 이해하기", "target": "ai-basics", "kind": "개념"},
    {"minutes": 15, "title": "LLM은 어떻게 배울까요?", "activity": "글쓰기 학교의 다섯 장면 → 이미 배운 AI 사용하기", "target": "llm-creation", "kind": "체험"},
    {"minutes": 10, "title": "어떤 LLM을 사용할까요?", "activity": "복잡한 결과물과 간단한 작업에 맞는 모델 선택", "target": "llm-models", "kind": "선택"},
    {"minutes": 5, "title": "Application은 무엇인가요?", "activity": "생활 도구 비유와 계산기·지도·기록 앱 예시로 이해하기", "target": "app-warmup", "kind": "개념"},
    {"minutes": 10, "title": "앱의 입력·처리·결과", "activity": "앱과 AI 모델의 역할 구분하기", "target": "app-basics", "kind": "개념"},
    {"minutes": 10, "title": "쉬는 시간", "activity": "만들고 싶은 앱의 구조를 떠올려요.", "kind": "휴식"},
    {"minutes": 15, "title": "화면·서버·DB·파일 서버·API", "activity": "식당 비유와 기록·사진 예시로 역할 연결하기", "target": "app-structure", "kind": "개념"},
    {"minutes": 15, "title": "챗봇 동작과 역할·참고 자료", "activity": "풍미당 질문의 이동 → system prompt·context → 짧은 역할극", "target": "app-flow", "kind": "체험"},
    {"minutes": 10, "title": "좋은 질문 만들기", "activity": "A·B·C 질문 비교와 나의 질문 작성", "target": "prompt-lab", "kind": "실습"},
    {"minutes": 5, "title": "답변의 근거 확인하기", "activity": "주소 대조와 자료에 없는 정보 확인", "target": "ai-check", "kind": "실습"},
    {"minutes": 5, "title": "AI와 앱 구조 정리", "activity": "모델과 앱의 역할, 다음 수업 준비", "target": "ai-review", "kind": "정리"},
  ],
  3: [
    {"minutes": 10, "title": "첫 앱의 범위 정하기", "activity": "사용자·문제·핵심 기능 하나 선택", "target": "build-scope", "kind": "대화"},
    {"minutes": 30, "title": "나의 앱 첫 설계도", "activity": "설계 질문 토론 12분 → 종이 화면 10분 → 짝 테스트 8분", "target": "app-design", "kind": "설계"},
    {"minutes": 10, "title": "첫 개발 요청 준비하기", "activity": "수강생별 프롬프트와 확인 기준 정리", "target": "build-request", "kind": "준비"},
    {"minutes": 10, "title": "쉬는 시간", "activity": "설치할 도구와 로그인 계정을 준비해요.", "kind": "휴식"},
    {"minutes": 15, "title": "내 앱 설명하고 정리하기", "activity": "1분 소개·짝 피드백·설계와 요청 저장", "target": "app-review", "kind": "공유"},
    {"minutes": 45, "title": "내 컴퓨터에서 바이브코딩 준비하기", "activity": "Node.js 10분 → AI 도구 설치·로그인 20분 → 폴더·프롬프트·준비 상태 확인 15분", "target": "vibe-windows", "kind": "환경 준비"},
  ],
  4: [
    {"minutes": 10, "title": "설계와 준비 상태 확인", "activity": "프로젝트 폴더·로그인·첫 요청 확인", "target": "build-ready", "kind": "준비"},
    {"minutes": 15, "title": "첫 개발 요청 보내기", "activity": "핵심 기능과 완료 기준 전달", "target": "build-first-request", "kind": "요청"},
    {"minutes": 25, "title": "AI와 첫 앱 만들기", "activity": "생성 결과 확인·의존성 설치·로컬 실행", "target": "build-local", "kind": "실습"},
    {"minutes": 10, "title": "쉬는 시간", "activity": "실행 중인 서버 터미널은 켜 두고 쉬어요.", "kind": "휴식"},
    {"minutes": 25, "title": "시험하고 오류 고치기", "activity": "대표 동작 시험·오류 전달·재확인", "target": "build-test", "kind": "실습"},
    {"minutes": 20, "title": "작은 변화 하나 적용하기", "activity": "요청 → 수정 → 같은 동작으로 비교", "target": "build-change", "kind": "바이브코딩"},
    {"minutes": 15, "title": "결과 저장과 다음 수업 준비", "activity": "실행 방법·확인 결과·AI 에이전트 설계 기록", "target": "build-review", "kind": "정리"},
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
