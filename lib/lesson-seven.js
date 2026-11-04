export const GITHUB_UPLOAD_PROMPT = `지금 열려 있는 앱 폴더의 코드를 내 GitHub에 올려줘.
나는 비개발자이니 필요한 안내는 한 단계씩 쉽게 설명해줘.

1. 현재 앱 폴더, Git 상태, 연결된 저장소와 로그인 계정을 먼저 확인해줘. 기존 변경 사항과 연결은 보존해줘.
2. .env, .env.local, API 키 등 비밀 정보와 node_modules, .next, .vercel이 올라가지 않도록 .gitignore와 올릴 파일을 확인해줘. 실제 비밀값은 채팅에 출력하지 마.
3. 비밀 정보가 이미 Git에 기록되어 있으면 업로드를 멈추고 알려줘.
4. 기존에 연결된 내 저장소가 있으면 그대로 사용해줘. 연결이 없으면 내 계정에 비공개 저장소를 만들어 연결해줘. 이름이 필요하면 나에게 물어봐.
5. 올릴 계정·저장소·브랜치와 파일 목록을 알려준 뒤, 앱 변경 사항을 커밋하고 push해줘. 기존 기록을 덮어쓰거나 강제 push하지 마.
6. 로그인이나 권한 승인이 필요하면 내가 직접 할 수 있게 안내해줘. 실행 권한이나 도구가 없으면 완료했다고 하지 말고, 내가 해야 할 다음 동작 하나를 알려줘.
7. 끝나면 GitHub 저장소 링크와 업로드된 커밋을 알려줘. 실제로 업로드됐는지 확인해줘.`;

export const GITHUB_UPDATE_PROMPT = `지금 앱에서 수정한 내용을 기존 GitHub 저장소에 반영해줘.
현재 폴더, 로그인 계정, 연결된 저장소와 브랜치를 먼저 확인해줘.
변경 파일과 비밀 정보 포함 여부를 확인하고, 이번 앱 수정에 해당하는 파일만 커밋해서 push해줘.
기존 변경 사항과 기록은 보존하고, 비밀값 출력이나 강제 push는 하지 마.
로그인이나 권한 승인이 필요하면 내가 직접 하도록 안내해줘.
업로드가 끝나면 저장소 링크와 커밋을 알려줘. 실행하지 못했다면 완료했다고 하지 말고 다음 동작을 쉽게 알려줘.`;

export const LESSON_SEVEN_STEPS = [
  {
    id: "publish-prepare", label: "올릴 준비", time: "00:00–00:15", screen: "VS Code", title: "지금 만든 앱 폴더를 열어요",
    description: "내 컴퓨터에서 작업한 앱을 그대로 사용해요. 먼저 GitHub에 올릴 파일을 확인합니다.",
    steps: ["VS Code → File → Open Folder에서 지금까지 만든 앱 폴더를 열어요. 파일을 모두 저장해요.", "브라우저에서 기존 localhost 주소를 열고 앱이 작동하는지 확인해요. 실행 방법이 기억나지 않으면 강사와 확인해요.", "폴더 맨 위의 .gitignore에 아래 목록을 추가하고 저장해요. 이 파일은 ‘올리지 않을 파일 목록’이에요."],
    check: "내 앱이 열리고, .gitignore 파일을 저장했어요.",
  },
  {
    id: "publish-github", label: "GitHub에 올리기", time: "00:15–00:45", screen: "AI 코딩 도구 → GitHub", title: "AI에게 GitHub 업로드를 부탁해요",
    description: "내 앱 폴더를 연 AI 코딩 도구에 아래 프롬프트를 보내요. Git 설정과 코드 업로드는 AI의 도움을 받아 진행합니다.",
    steps: ["지금 만든 앱 폴더를 AI 코딩 도구에서 열어요. 일반 질문용 채팅이 아니라, 내 프로젝트 파일을 읽고 수정할 수 있는 도구를 사용해요.", "아래 ‘GitHub 업로드 프롬프트 복사’를 누르고 AI에게 붙여 넣어 보내요.", "AI가 확인한 내 GitHub 계정과 저장소가 맞는지 확인해요. 저장소 이름을 물으면 my-first-app처럼 영문으로 알려줘요.", "로그인·실행 승인 안내가 나오면 내용을 확인하고 직접 진행해요. 비밀번호나 인증 토큰을 채팅에 붙여 넣지 않아요.", "AI가 알려준 GitHub 링크를 열어 앱 파일과 최신 커밋이 보이는지 확인해요. .env 파일이 없는지도 확인해요."],
    check: "AI가 알려준 내 GitHub 저장소에서 앱 파일과 커밋을 확인했어요.",
  },
  {
    id: "publish-vercel", label: "Vercel 연결", time: "00:55–01:15", screen: "Vercel", title: "방금 올린 저장소를 가져와요",
    description: "GitHub에 둔 내 코드를 Vercel이 읽을 수 있도록 연결해요.",
    steps: ["아래 ‘Vercel 열기’를 눌러 GitHub 계정으로 로그인해요. 대시보드에서는 Add New… → Project로 들어가요.", "Import Git Repository에서 GitHub를 연결해요. 저장소 목록이 안 보이면 Configure GitHub App에서 내 저장소 접근을 허용해요.", "방금 올린 내 계정 / 저장소 이름을 찾고 옆의 Import(가져오기)를 눌러요.", "Framework Preset이 내 앱에 맞는지 확인해요. Next.js 앱이라면 Next.js예요. Root Directory는 package.json이 있는 폴더로 정해요. 나머지 빌드 설정은 자동값을 사용해요."],
    check: "내 저장소 이름이 보이는 프로젝트 설정 화면에 도착했어요.",
  },
  {
    id: "publish-deploy", label: "설정하고 배포", time: "01:15–01:40", screen: "Vercel · 프로젝트 설정", title: "필요한 설정을 넣고 Deploy를 눌러요",
    description: "내 컴퓨터의 .env.local은 자동으로 옮겨지지 않아요. 앱에서 쓰는 설정만 Vercel에 따로 넣습니다.",
    steps: ["DB·로그인·AI API를 쓰는 앱은 내 .env.local(또는 .env)에서 필요한 이름과 값을 확인해요. 설정이 없는 앱은 바로 Deploy로 가요.", "Import 화면의 Environment Variables를 펼쳐요. Key / Name에는 = 왼쪽 이름을, Value에는 = 오른쪽 값을 넣어요. 값 바깥의 따옴표는 빼고 실제 값 전체를 복사해요.", "내 앱이 사용하는 항목을 하나씩 추가하고 Deploy(배포)를 눌러요. 설정 이름과 값은 다른 사람에게 보여주지 않아요.", "배포가 끝나고 Ready가 보일 때까지 기다려요. 오류가 나오면 Build Logs의 첫 오류를 강사와 확인해요."],
    check: "Vercel에 Ready가 표시되고 Visit으로 앱을 열 수 있어요.",
  },
  {
    id: "publish-check", label: "열고 수정하기", time: "01:40–02:00", screen: "브라우저 → VS Code", title: "휴대전화에서 열어보고 한 번 고쳐요",
    description: "공유할 것은 GitHub 저장소 주소가 아니라 완성된 앱의 웹 주소예요.",
    steps: ["Visit을 눌러 https://내프로젝트.vercel.app 형태의 주소를 열어요. 휴대전화에서도 같은 주소를 열어봐요.", "내 앱의 대표 기능을 직접 사용해요. DB·로그인이 있다면 로그인 → 저장 → 새로고침 후 조회까지 확인해요.", "앱 제목 같은 작은 부분을 AI에게 수정해 달라고 요청해요. 로컬에서 수정 결과를 확인한 뒤 아래 ‘수정 반영 프롬프트’를 보내 GitHub에 올려요.", "Vercel의 Deployments에서 새 배포가 Ready가 되는지 확인해요. 연결된 배포 브랜치(보통 main)에 올린 수정이 반영되면 앱 주소를 다시 열어 확인해요."],
    check: "휴대전화에서 앱이 열리고, 수정한 내용도 배포됐어요.",
  },
];
