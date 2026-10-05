// [수정 12] 4회차 파일 지도, 배포 단계와 참고 자료입니다.
// 실습용 GitLab 템플릿이 준비되면 강사가 공유하는 주소를 수업 안내에 추가하세요.
export const PROJECT_MAP = [
  { file: "app/layout.js", role: "전체 페이지의 공통 틀", area: "Next.js", text: "한국어 문서 설정과 브라우저 탭 제목을 지정하고 공통 CSS를 불러와요." },
  { file: "app/page.js", role: "홈페이지 /", area: "서버", text: "서버에서 CSV 요약을 읽어 대화 화면에 props로 전달해요." },
  { file: "app/guide/[session]/page.js", role: "회차 주소 /guide/4", area: "서버", text: "주소의 회차 번호에 맞는 수업 페이지를 열어요. 폴더와 page.js가 페이지 주소를 만들어요." },
  { file: "components/chat.js", role: "입력창·버튼·대화 목록", area: "브라우저", text: "React가 질문과 대기 상태를 기억하고, /api/chat에 요청한 뒤 답변 조각을 화면에 이어 붙여요." },
  { file: "lib/chat-config.js", role: "챗봇 이름·첫 인사", area: "화면 설정", text: "오늘 바꿀 문구가 모여 있어요. 브라우저에서도 읽는 파일이므로 API 키를 넣지 않아요." },
  { file: "app/globals.css", role: "색상·간격·반응형 화면", area: "디자인", text: "--accent 같은 CSS 변수를 바꾸면 버튼과 강조 색상이 달라져요." },
  { file: "app/api/chat/route.js", role: "POST /api/chat", area: "서버", text: "요청을 검사하고 CSV 검색 결과와 질문을 NVIDIA API에 보내요. 받은 스트림을 브라우저로 중계해요." },
  { file: "lib/ai-config.js · lib/restaurants.js", role: "AI 규칙·CSV 검색", area: "서버", text: "역할 설명과 검색을 담당해요. 데이터 연결은 5회차에서 더 자세히 살펴봐요." },
  { file: "package.json · package-lock.json", role: "설치와 빌드의 설명서", area: "배포", text: "필요한 React·Next.js 버전과 실행 명령을 지정해요. GitLab에 두 파일을 함께 보관해요." },
];

export const GITLAB_STEPS = [
  { title: "내 개인 프로젝트로 가져오기", text: "강사가 공유한 GitLab 프로젝트라면 Fork로 내 개인 공간에 복사해요. GitHub 템플릿을 사용할 경우 GitLab의 New project/repository → Import project → Repository by URL에서 공개 저장소의 .git 주소를 입력해요. 이름은 ai-class-my-chatbot처럼 정하고 개인 namespace를 선택해요.", check: "app/, components/, lib/, package.json과 CSV가 보이나요?" },
  { title: "브랜치와 파일 위치 확인하기", text: "Code → Repository에서 기본 브랜치 이름을 확인해요. main이면 이번 실습도 main에서 진행해요. 가져온 프로젝트가 다른 기본 브랜치 이름을 쓴다면 그 이름을 사용해요. 수정할 파일에서 Edit → Edit single file을 선택해 웹 편집기를 열어요.", check: "강사의 원본이 아니라 내 계정의 프로젝트인가요?" },
  { title: "화면 변경을 코드에 적용하기", text: "lib/chat-config.js의 name과 greeting, app/globals.css의 :root 안 색상 변수를 수정해요. lib/ai-config.js에서는 기존 CSV 규칙을 유지하면서 첫 역할 문구를 바꿔요. 웹 편집기는 코드의 저장 공간이며 실행 화면은 배포 후 확인해요.", check: "문자열의 따옴표와 항목 뒤의 쉼표를 유지했나요?" },
  { title: "커밋으로 변경 기록 남기기", text: "변경 전후를 비교하고 ‘챗봇 이름과 테마 수정’처럼 내용을 알 수 있는 커밋 메시지를 써요. 웹 편집기에서 Commit changes를 선택하면 GitLab 저장소에 기록돼요. 여러 파일은 Web IDE에서 한 커밋으로 묶거나 각 파일을 차례로 커밋해도 괜찮아요.", check: "최근 커밋에서 내가 바꾼 파일과 변경 내용이 보이나요?" },
];

export const VERCEL_STEPS = [
  { title: "GitLab 연결하고 프로젝트 가져오기", text: "Vercel 대시보드에서 Add New → Project를 열어요. GitLab을 연결하고 내 프로젝트 옆 Import를 선택해요. 저장소를 읽고 자동 배포를 연결할 권한을 확인해요. GitLab 프로젝트에 Maintainer 이상의 권한이 필요해요.", check: "가져올 저장소의 계정과 프로젝트 이름이 맞나요?" },
  { title: "Next.js 빌드 설정 확인하기", text: "Framework Preset은 Next.js, Root Directory는 package.json이 있는 프로젝트 루트로 설정해요. 이 저장소는 최상위 폴더예요. Build Command는 기본값(npm run build), Install Command와 Output Directory는 프레임워크 기본값을 사용해요. Node.js는 프로젝트가 지원하는 24.x를 선택해요.", check: "HTML 파일 업로드가 아니라 Next.js 프로젝트 빌드인가요?" },
  { title: "서버 환경변수 등록하기", text: "NVIDIA_API_KEY에는 본인이 발급받은 실제 키를 Vercel의 환경변수 입력란에만 넣어요. NVIDIA_MODEL은 z-ai/glm-5.3-flash로 지정하거나 생략해 기본값을 사용해요. Production에 적용하고, Preview에서도 대화 테스트를 할 경우 Preview에도 설정해요.", check: "키 이름에 NEXT_PUBLIC_을 붙이지 않았나요? 키 값은 활동지에 쓰지 않아요." },
  { title: "Deploy하고 빌드 상태 살펴보기", text: "Deploy를 누르면 Vercel이 코드 가져오기 → 라이브러리 설치 → 빌드 → 배포를 진행해요. Deployments에서 로그와 완료 상태를 확인하고 Visit으로 앱을 열어요. 첫 배포에는 몇 분이 걸릴 수 있어요.", check: "Ready 상태와 앱에 접속할 수 있는 주소를 확인했나요?" },
  { title: "운영 주소와 배포 버전 확인하기", text: "공유할 주소는 프로젝트의 Production 도메인이에요. 미리보기 주소는 브랜치 변경을 시험할 때 사용해요. Settings → Git에서 Production Branch가 오늘 커밋한 기본 브랜치인지 확인하고, 배포의 커밋 기록과 GitLab 기록을 대조해요.", check: "화면의 이름·첫 인사·색상이 내 변경과 일치하나요?" },
];

export const DEPLOY_TROUBLESHOOTING = [
  { question: "Vercel에서 GitLab 저장소가 보이지 않아요", answer: "연결한 GitLab 계정과 개인 namespace를 확인해요. 저장소에 Maintainer 이상의 권한이 있어야 해요. 그룹 프로젝트라면 그룹 권한도 확인해요. Hobby에서 비공개 그룹 저장소는 지원되지 않으므로, 수업은 본인 개인 공간의 프로젝트로 진행해요." },
  { question: "빌드가 실패했어요", answer: "Build Logs에서 처음 발생한 오류와 파일·줄 번호를 찾아요. 따옴표·쉼표·괄호, 파일명 대소문자, package.json이 있는 Root Directory를 확인해요. 수정 커밋 후 다시 배포해요. .next나 node_modules를 업로드하는 것으로 해결하지 않아요." },
  { question: "화면은 열리는데 AI 답변이 오지 않아요", answer: "Production/Preview 중 현재 접속한 환경에 NVIDIA_API_KEY가 설정됐는지 확인해요. 키·모델 접근 권한이나 호출 한도 문제는 대화 화면의 안내와 서버 로그를 확인해요. 환경변수를 바꾼 뒤에는 다시 배포해야 새 값이 적용돼요." },
  { question: "코드를 바꿨는데 예전 화면이 보여요", answer: "변경을 GitLab에 커밋했는지, Vercel이 그 커밋을 배포했는지, Production Branch와 접속 주소가 맞는지 차례로 확인해요. 빌드가 아직 진행 중이거나 실패했다면 기존 정상 배포가 계속 보일 수 있어요." },
  { question: "배포 후 CSV 파일을 못 찾는다고 해요", answer: "okcheon_restaurant.csv가 저장소의 루트에 있는지 확인해요. next.config.mjs의 outputFileTracingIncludes가 /api/chat 서버 함수에 ./okcheon_restaurant.csv를 포함해야 해요. 파일명 대소문자도 같아야 해요." },
];

export const LESSON_FOUR_REFERENCES = [
  { title: "React · 빠르게 시작하기", url: "https://react.dev/learn" },
  { title: "Next.js · 화면과 서버", url: "https://nextjs.org/docs/app/getting-started/server-and-client-components" },
  { title: "GitLab · 저장소 URL로 가져오기", url: "https://docs.gitlab.com/user/import/third_party_systems/repo_by_url/" },
  { title: "GitLab · 웹 편집기", url: "https://docs.gitlab.com/user/project/repository/web_editor/" },
  { title: "Vercel · GitLab 연결", url: "https://vercel.com/docs/git/vercel-for-gitlab" },
  { title: "Vercel · 빌드 설정", url: "https://vercel.com/docs/builds/configure-a-build" },
  { title: "Vercel · Node.js 버전", url: "https://vercel.com/docs/functions/runtimes/node-js/node-js-versions" },
  { title: "Vercel · 환경변수", url: "https://vercel.com/docs/environment-variables" },
  { title: "Vercel · Git 배포와 권한", url: "https://vercel.com/docs/git" },
];
