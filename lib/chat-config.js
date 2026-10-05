// [수정 1] 화면에 표시할 이름과 소개를 바꿔 나만의 챗봇을 만드세요.
// 이 파일은 브라우저에서도 읽습니다. API 키는 절대 넣지 마세요!
export const CHAT_CONFIG = {
  name: "AI Class",
  subtitle: "옥천 식당 데이터와 함께하는 AI",
  greeting: "옥천의 어떤 식당이 궁금하세요?",
  description:
    "우리 동네 데이터를 읽고 대답하는 AI.\n지역과 가게 이름으로 물어보고, 답변의 출처도 확인해 보세요.",
  maxInputLength: 2000,
  // 최근 10번의 질문과 답변을 보내 문맥을 기억하게 합니다.
  maxHistoryMessages: 20,
};

// [수정 2] 첫 화면의 예시 질문입니다. title은 제목, prompt는 실제 질문입니다.
export const STARTER_PROMPTS = [
  {
    icon: "sparkles",
    title: "옥천 식당 찾기",
    description: "CSV에 있는 식당을 만나보세요",
    prompt: "옥천에 어떤 식당이 있는지 CSV를 참고해서 5곳 알려줘.",
  },
  {
    icon: "code",
    title: "동네별로 둘러보기",
    description: "옥천읍부터 청산면까지",
    prompt: "청산면에 어떤 식당이 있는지 3곳과 주소를 알려줘.",
  },
  {
    icon: "bulb",
    title: "식당 주소 확인",
    description: "원본 데이터와 비교해보세요",
    prompt: "풍미당 주소 알려줘.",
  },
  {
    icon: "pen",
    title: "데이터로 배우기",
    description: "나의 파일을 아는 AI 만들기",
    prompt:
      "CSV가 무엇인지, AI에게 파일의 내용을 알려줘야 하는 이유를 초보자도 이해하기 쉽게 설명해줘.",
  },
];
