// GitHub 주소를 받아 README의 배포 버튼을 실제 저장소에 연결합니다.
// 실행 예: npm run deploy:button -- https://github.com/my-account/ai-class-chatbot
import { readFile, writeFile } from "node:fs/promises";

const repository = process.argv[2]?.replace(/\.git\/?$/, "").replace(/\/$/, "");
if (
  !repository ||
  !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)
) {
  console.error(
    "사용법: npm run deploy:button -- https://github.com/계정명/저장소이름",
  );
  process.exit(1);
}

// 비밀 키의 값은 URL에 넣지 않습니다. env에는 환경변수 이름만 넣습니다.
const params = new URLSearchParams({
  "repository-url": repository,
  env: "NVIDIA_API_KEY",
  envDescription:
    "NVIDIA에서 발급받은 API 키를 입력하세요. 키는 서버에서만 사용됩니다.",
  envLink: "https://build.nvidia.com/z-ai/glm-5-3-flash",
  "project-name": "ai-class-chatbot",
  "repository-name": "ai-class-chatbot",
});
const button = `[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?${params})`;
const readmeUrl = new URL("../README.md", import.meta.url);
const readme = await readFile(readmeUrl, "utf8");
const pattern = /^\[!\[Deploy with Vercel\].*$/m;
if (!pattern.test(readme)) {
  console.error("README에서 Deploy with Vercel 버튼을 찾지 못했습니다.");
  process.exit(1);
}
await writeFile(
  readmeUrl,
  readme.replace(pattern, () => button),
);
console.log(
  "README의 배포 버튼을 업데이트했습니다. README.md를 GitHub에 올리세요.",
);
console.log(button);
