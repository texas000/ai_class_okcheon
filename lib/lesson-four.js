// 4회차는 비개발자가 코드를 수정하지 않고 완성된 예제 앱을 배포하는 수업입니다.
export const GITHUB_REPOSITORY_URL = "https://github.com/texas000/ai_class_okcheon";
export const NVIDIA_BUILD_URL = "https://build.nvidia.com/";

export const VERCEL_DEPLOY_URL = "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftexas000%2Fai_class_okcheon&env=NVIDIA_API_KEY&envDescription=NVIDIA%EC%97%90%EC%84%9C+%EB%B0%9C%EA%B8%89%EB%B0%9B%EC%9D%80+API+%ED%82%A4%EB%A5%BC+%EC%9E%85%EB%A0%A5%ED%95%98%EC%84%B8%EC%9A%94.+%ED%82%A4%EB%8A%94+%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C%EB%A7%8C+%EC%82%AC%EC%9A%A9%EB%90%A9%EB%8B%88%EB%8B%A4.&envLink=https%3A%2F%2Fbuild.nvidia.com%2Fz-ai%2Fglm-5-3-flash&project-name=ai-class-chatbot&repository-name=ai-class-chatbot";

export const GITHUB_SIGNUP_STEPS = [
  { title: "GitHub 가입 화면 열기", text: "github.com에서 Sign up을 누릅니다. 이메일 주소, 비밀번호, 사용할 이름을 입력해요.", check: "본인이 확인할 수 있는 이메일을 사용했나요?" },
  { title: "이메일 인증하기", text: "GitHub가 보낸 메일을 열고 인증 번호나 링크로 가입을 마칩니다.", check: "GitHub 화면에 내 프로필 아이콘이 보이나요?" },
  { title: "로그인 상태 확인하기", text: "수업 저장소 주소를 열어 파일 목록이 보이는지만 확인합니다. 파일의 뜻은 몰라도 괜찮고, 오늘 코드를 수정하지도 않아요.", check: "ai_class_okcheon이라는 이름이 보이나요?" },
];

export const NVIDIA_KEY_STEPS = [
  { title: "NVIDIA Build 열기", text: "NVIDIA Build 웹사이트에 접속한 뒤 화면 오른쪽 위의 Sign In 버튼을 누릅니다.", check: "https://build.nvidia.com/ 주소가 맞나요?" },
  { title: "로그인 또는 회원가입하기", text: "NVIDIA 계정이 있으면 로그인하고, 계정이 없으면 안내에 따라 무료 회원가입을 진행해요.", check: "로그인한 계정이 화면 오른쪽 위에 보이나요?" },
  { title: "사용할 AI 모델 열기", text: "수업에서 사용할 AI 모델의 상세 페이지로 이동합니다. NVIDIA Build에는 Llama, Mistral 등 여러 모델이 있어요.", check: "모델의 설명과 체험 화면이 보이나요?" },
  { title: "Get API Key 누르기", text: "모델 페이지 위쪽의 Get API Key 버튼을 누른 뒤 Generate Key를 선택합니다.", check: "개인용 API 키가 화면에 생성됐나요?" },
  { title: "API 키 안전하게 복사하기", text: "생성된 키를 복사해 잠시 안전한 곳에 보관합니다. 곧 Vercel의 NVIDIA_API_KEY 입력칸에 붙여 넣을 거예요.", check: "키를 단체 채팅이나 활동지에 적지 않았나요?" },
];

export const VERCEL_STEPS = [
  { title: "Deploy with Vercel 누르기", text: "아래 파란 배포 버튼을 누릅니다. 준비된 수업 코드를 Vercel이 자동으로 복사하고 실행 준비를 시작해요.", check: "주소를 직접 복사하거나 코드를 내려받을 필요가 없어요." },
  { title: "Vercel 시작하기", text: "Vercel 계정이 없으면 Continue with GitHub를 선택하고 연결을 허용합니다. 계정이 있으면 로그인해요.", check: "Vercel의 새 프로젝트 화면이 보이나요?" },
  { title: "API 키 한 개 입력하기", text: "NVIDIA_API_KEY 칸에 수업 전에 발급받은 키를 붙여 넣습니다. 키는 비밀번호처럼 다른 사람에게 보여주거나 활동지에 적지 않아요.", check: "키는 GitHub 파일이 아니라 Vercel 입력칸에만 넣었나요?" },
  { title: "Deploy 누르고 기다리기", text: "다른 설정은 바꾸지 않고 Deploy를 누릅니다. 완료 화면이 나올 때까지 몇 분 기다려요.", check: "배포 상태가 Ready 또는 Congratulations인가요?" },
  { title: "내 앱 열어보기", text: "Visit 또는 Continue to Dashboard를 누른 뒤 완성된 주소를 엽니다. 챗봇에 ‘풍미당 주소 알려줘’라고 질문해요.", check: "질문에 답이 나오고 참고 자료를 펼칠 수 있나요?" },
];

export const DEPLOY_TROUBLESHOOTING = [
  { question: "GitHub 가입이 안 돼요", answer: "이메일 인증 메일의 스팸함을 확인하고, 이미 사용 중인 이름이라면 다른 사용자 이름을 입력해요. 어려우면 강사와 함께 가입 화면부터 다시 확인합니다." },
  { question: "Vercel에서 GitHub 연결을 요청해요", answer: "정상적인 과정이에요. Continue with GitHub를 선택하고 Vercel이 새 저장소를 만들 수 있도록 안내에 따라 허용해요." },
  { question: "NVIDIA_API_KEY 칸이 비어 있어요", answer: "수업 전에 발급받은 키를 붙여 넣어요. 키가 없다면 임의의 값을 넣지 말고 강사에게 발급 과정을 요청합니다." },
  { question: "Get API Key 버튼이 보이지 않아요", answer: "먼저 NVIDIA 계정에 로그인했는지 확인하고 모델 상세 페이지를 다시 열어요. 그래도 보이지 않으면 현재 화면을 강사에게 보여주세요." },
  { question: "배포가 실패했어요", answer: "화면을 닫지 말고 오류 화면을 강사에게 보여주세요. 먼저 API 키가 입력되었는지 확인하고, Retry 또는 Redeploy는 강사와 함께 눌러요." },
  { question: "앱은 열리는데 답변이 안 나와요", answer: "대부분 API 키 문제예요. Vercel의 프로젝트 설정에서 NVIDIA_API_KEY가 저장됐는지 확인한 뒤 다시 배포해야 합니다." },
];

export const LESSON_FOUR_REFERENCES = [
  { title: "GitHub 가입하기", url: "https://github.com/signup" },
  { title: "수업용 GitHub 저장소", url: GITHUB_REPOSITORY_URL },
  { title: "Vercel로 바로 배포하기", url: VERCEL_DEPLOY_URL },
  { title: "NVIDIA Build · API 키 발급", url: NVIDIA_BUILD_URL },
];
