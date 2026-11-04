export const LESSON_SEVEN_STEPS = [
  {
    id: "publish-prepare", label: "올릴 준비", time: "00:00–00:15", screen: "VS Code", title: "지금 만든 앱 폴더를 열어요",
    description: "내 컴퓨터에서 작업한 앱을 그대로 사용해요. 먼저 GitHub에 올릴 파일을 확인합니다.",
    steps: ["VS Code → File → Open Folder에서 지금까지 만든 앱 폴더를 열어요. 파일을 모두 저장해요.", "브라우저에서 기존 localhost 주소를 열고 앱이 작동하는지 확인해요. 실행 방법이 기억나지 않으면 강사와 확인해요.", "폴더 맨 위의 .gitignore에 아래 목록을 추가하고 저장해요. 이 파일은 ‘올리지 않을 파일 목록’이에요."],
    check: "내 앱이 열리고, .gitignore 파일을 저장했어요.",
  },
  {
    id: "publish-github", label: "GitHub에 올리기", time: "00:15–00:45", screen: "VS Code → GitHub", title: "버튼으로 GitHub에 올려요",
    description: "VS Code에서 저장소를 만들고 올릴 수 있어요. GitHub에서 빈 저장소를 따로 만들 필요가 없어요.",
    steps: ["VS Code 왼쪽 Source Control(소스 제어 · 가지 모양)을 눌러요. Initialize Repository(리포지토리 초기화)가 보이면 눌러요. 이미 변경 파일 목록이 보이면 그대로 진행해요.", "Changes(변경 사항)에서 올릴 파일을 확인해요. .env·.env.local·node_modules가 보이면 멈추고 강사에게 알려주세요.", "Changes 옆 +로 파일을 준비해요. Staged Changes(스테이징된 변경 사항)를 다시 확인한 뒤 메시지에 ‘앱 배포 준비’를 쓰고 Commit(커밋)을 눌러요. 커밋은 내 컴퓨터에 변경 기록을 남기는 일이에요.", "View → Command Palette(명령 팔레트)를 열어 Publish to GitHub를 검색하고 실행해요. 브라우저 로그인 안내가 나오면 본인 GitHub 계정으로 로그인한 뒤 VS Code로 돌아와요.", "저장소 이름을 my-first-app처럼 영문으로 쓰고 Publish to GitHub private repository(비공개)를 선택해요. 업로드가 끝나면 Open on GitHub를 눌러 파일이 보이는지 확인해요."],
    check: "내 GitHub 저장소에 앱 파일이 보여요. .env 파일은 없어요.",
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
    steps: ["Visit을 눌러 https://내프로젝트.vercel.app 형태의 주소를 열어요. 휴대전화에서도 같은 주소를 열어봐요.", "내 앱의 대표 기능을 직접 사용해요. DB·로그인이 있다면 로그인 → 저장 → 새로고침 후 조회까지 확인해요.", "VS Code에서 앱 제목 같은 작은 부분을 바꾸고 저장해요. 소스 제어에서 변경 확인 → + → 메시지 입력 → Commit → … → Push 순서로 올려요.", "Vercel의 Deployments에서 새 배포가 Ready가 되는지 확인해요. 연결된 배포 브랜치(보통 main)에 올린 수정이 반영되면 앱 주소를 다시 열어 확인해요."],
    check: "휴대전화에서 앱이 열리고, 수정한 내용도 배포됐어요.",
  },
];
