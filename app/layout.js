import "./globals.css";

// [수정 5] 브라우저 탭 제목과 검색 결과의 소개입니다.
export const metadata = {
  title: "AI Class | 나의 첫 번째 AI 챗봇",
  description:
    "코딩을 처음 배우는 사람들을 위한 한국어 AI 챗봇 실습. React, Next.js, NVIDIA API로 시작하세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
