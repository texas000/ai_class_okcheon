// [수정 1] 화면에 표시할 이름과 소개를 바꿔 나만의 챗봇을 만드세요.
// 이 파일은 브라우저에서도 읽습니다. API 키는 절대 넣지 마세요!
export const CHAT_CONFIG = {
  name: "옥천 식당 전문가",
  subtitle: "옥천 식당 데이터를 안내하는 AI",
  greeting: "옥천의 어떤 식당이 궁금하세요?",
  description:
    "옥천 식당 데이터를 읽고 대답하는 AI.\n지역과 가게 이름으로 물어보고, 답변의 출처도 확인해 보세요.",
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
    title: "식당 상세 정보 확인",
    description: "인허가일자와 면적도 물어보세요",
    prompt: "풍미당의 주소, 인허가일자, 소재지면적, 시설총규모를 알려줘.",
  },
  {
    icon: "pen",
    title: "데이터로 배우기",
    description: "나의 파일을 아는 AI 만들기",
    prompt:
      "CSV가 무엇인지, AI에게 파일의 내용을 알려줘야 하는 이유를 초보자도 이해하기 쉽게 설명해줘.",
  },
];

// [수정 8] 버튼 이름은 이용자에게 익숙한 말로, 실제 무작위 선택은 서버에서 합니다.
export const RECOMMENDATION_PROMPTS = ["고깃집", "치킨", "한식", "분식", "중국식"].map((category) => ({
  title: `${category} 추천해줘`,
  prompt: `옥천 영업 중인 ${category} 식당을 랜덤으로 3곳 추천해줘.`,
}));

// CSV의 업태 이름은 유지하고 화면에 표시할 때만 친숙한 이름으로 바꿉니다.
export function restaurantTypeLabel(type) {
  return type.replaceAll("식육", "고깃집");
}
