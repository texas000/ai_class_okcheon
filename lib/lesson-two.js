// [수정 10] 2회차 AI 개념과 참고 자료입니다. LLM 그림의 설명은 lib/llm-journey.js에서 바꾸세요.
export const AI_CONCEPTS = [
  { title: "AI · 인공지능", text: "컴퓨터가 언어, 이미지, 예측처럼 사람의 지능이 필요한 일을 수행하도록 만드는 기술이에요. 번역, 추천, 사진 속 사물 찾기 등이 예시예요." },
  { title: "머신러닝 · 데이터로 배우기", text: "AI를 만드는 방법 중 하나예요. 모든 규칙을 사람이 직접 적는 대신, 데이터에서 패턴을 배우게 해요. 딥러닝은 여러 층의 신경망을 사용하는 머신러닝 방법이에요." },
  { title: "LLM · 대규모 언어 모델", text: "많은 텍스트로 학습한 언어 모델이에요. 지금까지의 문맥을 참고해 다음에 올 텍스트 조각을 예측하며, 질문 답변·요약·글쓰기 등에 사용돼요." },
];

// 수업용 선택 가이드입니다. 실제 결과·비용은 대표 작업으로 비교해요.
export const LLM_MODEL_CHOICES = [
  { purpose: "복잡한 PPT 제작의 기본 모델", openai: "gpt-6.1-sol", claude: "claude-opus-5-5" },
  { purpose: "어려운 자료 분석·논리 구성, 품질 최우선", openai: "gpt-6-astra", claude: "claude-fable-5-1" },
  { purpose: "정해진 템플릿으로 빠르게 대량 생성", openai: "gpt-6-luna", claude: "claude-sonnet-5-5" },
];

export const LLM_USAGE_REFERENCES = [
  { title: "OpenAI · 모델과 API 요금", url: "https://developers.openai.com/api/docs/models" },
  { title: "Claude · 모델과 API 요금", url: "https://platform.claude.com/docs/en/models/overview" },
  { title: "NVIDIA · 무료 체험 모델", url: "https://build.nvidia.com/nvidia/nemotron-3.5-lightning-30b-a3b/build" },
  { title: "NVIDIA · 체험 한도와 운영용 이용 조건", url: "https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf" },
];

// LLM 제작의 상세 설명은 lib/llm-journey.js에 있습니다.
export const LESSON_TWO_REFERENCES = [
  { title: "Google · Transformer와 LLM", url: "https://developers.google.com/machine-learning/crash-course/llm/transformers" },
  { title: "Hugging Face · 지도 미세조정", url: "https://huggingface.co/learn/llm-course/chapter11/1" },
  { title: "Hugging Face · 선호 데이터와 DPO", url: "https://huggingface.co/docs/trl/dpo_trainer" },
  { title: "Google · 언어 모델과 토큰", url: "https://developers.google.com/machine-learning/crash-course/llm" },
  { title: "Hugging Face · 모델 학습 과정", url: "https://huggingface.co/learn/llm-course/chapter1/4" },
  { title: "Google · 추가 학습과 프롬프트", url: "https://developers.google.com/machine-learning/crash-course/llm/tuning" },
];
