// [수정 11] 2~4회차의 시간표입니다. minutes를 바꾸면 시간 구간과 합계가 자동으로 바뀝니다.
// target은 각 수업 본문의 id와 같아야 시간표를 눌러 해당 내용으로 이동할 수 있어요.
export const LESSON_PLANS = {
  2: [
    { minutes: 10, title: "생활 속 AI 찾아보기", activity: "개인 생각 3분 → 짝 대화 4분 → 사례 공유 3분", target: "ai-warmup", kind: "대화" },
    { minutes: 20, title: "AI·머신러닝·LLM 이해", activity: "개념 설명 10분 → 규칙과 학습 분류 5분 → 정리 5분", target: "ai-basics", kind: "개념" },
    { minutes: 25, title: "LLM이 만들어지는 6단계", activity: "그림 탐색 15분 → 이어쓰기 체험 5분 → 학습·추론 비교 5분", target: "llm-creation", kind: "체험" },
    { minutes: 10, title: "쉬는 시간", activity: "눈과 손을 쉬고, 궁금한 점을 하나 메모해요.", kind: "휴식" },
    { minutes: 25, title: "좋은 질문 만들기", activity: "예시 비교 5분 → 질문 실험 12분 → 짝과 결과 비교 8분", target: "prompt-lab", kind: "실습" },
    { minutes: 20, title: "답변을 확인하는 습관", activity: "주소·영업시간 실험 8분 → 원본 비교 7분 → 검증 기록 5분", target: "ai-check", kind: "실습" },
    { minutes: 10, title: "오늘의 정리와 공유", activity: "확인 질문 5분 → 가장 유용했던 질문과 배운 점 공유 5분", target: "ai-review", kind: "정리" },
  ],
  3: [
    { minutes: 10, title: "내가 쓰는 앱 관찰하기", activity: "앱 선택 2분 → 입력·결과 찾기 4분 → 짝에게 설명 4분", target: "app-warmup", kind: "대화" },
    { minutes: 20, title: "앱의 입력·처리·결과", activity: "개념과 사례 10분 → 내 앱 분석 7분 → 공유 3분", target: "app-basics", kind: "개념" },
    { minutes: 20, title: "화면·서버·데이터·API", activity: "식당 비유 10분 → 역할 카드 활동 7분 → 도구 정리 3분", target: "app-structure", kind: "개념" },
    { minutes: 10, title: "쉬는 시간", activity: "잠깐 쉬며 만들고 싶은 앱의 사용자를 떠올려요.", kind: "휴식" },
    { minutes: 25, title: "챗봇의 동작 따라가기", activity: "5단계 탐색 10분 → 사람 역할극 8분 → 오류 상황 토론 7분", target: "app-flow", kind: "체험" },
    { minutes: 25, title: "나의 앱 첫 설계도", activity: "기획 활동지 10분 → 종이 화면 8분 → 짝 테스트 7분", target: "app-design", kind: "설계" },
    { minutes: 10, title: "내 앱 설명하고 정리하기", activity: "1분 설명을 짝과 나누기 5분 → 확인 질문·다음 수업 준비 5분", target: "app-review", kind: "정리" },
  ],
  4: [
    { minutes: 10, title: "준비와 오늘의 완성 목표", activity: "계정·키 준비 확인 5분 → 코드·저장소·배포 역할 정리 5분", target: "build-ready", kind: "준비" },
    { minutes: 15, title: "React로 화면 만들기", activity: "컴포넌트·JSX·props 7분 → state와 클릭 체험 8분", target: "react-basics", kind: "개념" },
    { minutes: 15, title: "Next.js와 앱의 동작", activity: "파일과 주소 연결 7분 → 질문·서버·스트리밍 흐름 8분", target: "next-basics", kind: "개념" },
    { minutes: 20, title: "내 화면 변경안 만들기", activity: "이름·첫 인사·색상 미리보기 10분 → 코드 수정 지점 기록 10분", target: "screen-lab", kind: "실습" },
    { minutes: 10, title: "쉬는 시간", activity: "변경할 문구를 메모해두고 잠깐 쉬어요.", kind: "휴식" },
    { minutes: 20, title: "GitLab 저장소에 적용하기", activity: "개인 프로젝트 가져오기 8분 → 파일 수정·커밋 12분", target: "gitlab-lab", kind: "실습" },
    { minutes: 20, title: "Vercel에서 첫 배포", activity: "GitLab 연결·설정 8분 → 환경변수·빌드·접속 12분", target: "vercel-lab", kind: "배포" },
    { minutes: 10, title: "동작 확인과 변경 반영", activity: "화면·답변·근거 확인 5분 → 재배포·결과 공유 5분", target: "deploy-review", kind: "정리" },
  ],
};

// 실제 API를 호출하지 않는 설명용 흐름입니다. 운영 앱의 기능과 구분해 보여줍니다.
export const APPLICATION_FLOW = [
  { label: "질문 입력", place: "사용자 · 브라우저", icon: "pen", title: "사용자가 원하는 것을 알려줘요", text: "질문 입력창에 ‘풍미당 주소 알려줘’를 쓰고 전송해요. 화면은 질문을 대화 목록에 추가하고 답변을 기다리는 상태를 보여줘요.", input: "사용자가 쓴 질문", output: "서버에 보낼 대화 메시지", file: "components/chat.js", note: "입력창과 전송 버튼은 프런트엔드예요. 빈 질문은 보내지 않도록 안내해요." },
  { label: "서버에 요청", place: "브라우저 → 우리 서버", icon: "external", title: "화면이 서버에 일을 부탁해요", text: "브라우저는 /api/chat으로 대화 메시지를 보내요. 우리 서버는 요청 형식과 길이를 검사하고 다음 작업을 준비해요. 요청은 부탁하는 내용, 응답은 돌아오는 결과예요.", input: "대화 메시지가 담긴 요청", output: "검사한 질문", file: "app/api/chat/route.js", note: "NVIDIA API 키는 서버의 환경변수에 보관해요. 브라우저에 보내는 코드에 키를 넣지 않아요." },
  { label: "자료 검색", place: "우리 서버 · CSV", icon: "book", title: "모델에 보내기 전에 근거를 찾아요", text: "서버가 CSV를 읽고 업소명·지역·업종에 맞는 행을 골라요. ‘풍미당’ 행에서 업소명과 도로명 주소를 찾고, 데이터 기준일도 함께 준비해요.", input: "질문 + 옥천 식당 CSV", output: "관련 행과 검색 건수", file: "lib/restaurants.js", note: "CSV는 표 데이터예요. 모델이 스스로 파일을 여는 것이 아니라 우리 코드가 검색해요. 못 찾았다고 존재하지 않는 식당이라고 단정하지 않아요." },
  { label: "AI에 전달", place: "우리 서버 → NVIDIA", icon: "sparkles", title: "찾은 자료와 질문을 함께 보내요", text: "서버가 역할 설명·검색한 자료·대화 메시지를 NVIDIA API에 전달해요. 이미 학습된 LLM이 이를 참고해 답변을 생성해요. 우리가 자료를 전달하는 과정과 모델을 학습시키는 과정은 달라요.", input: "질문 + 역할 규칙 + 참고 자료", output: "생성되는 답변 조각", file: "app/api/chat/route.js", note: "외부 AI 서비스가 응답하지 않으면 앱도 오류를 안내해야 해요. 요청에 포함한 질문과 참고 자료는 외부 서비스로 전달돼요." },
  { label: "결과 표시", place: "NVIDIA → 서버 → 브라우저", icon: "chat", title: "답변과 근거를 화면에 보여줘요", text: "서버가 답변 조각을 중계하고 브라우저가 조금씩 이어 붙여 보여줘요. 이것이 스트리밍이에요. 사용자는 ‘참고한 CSV 자료’를 펼쳐 이름과 주소를 확인할 수 있어요.", input: "답변 조각 + 참고 자료", output: "읽고 확인할 수 있는 대화 화면", file: "components/chat.js", note: "전송 전·생성 중·완료·오류는 서로 다른 화면 상태예요. 일부 글자가 보인 뒤에도 생성이 계속될 수 있어요." },
];
