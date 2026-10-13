import "./globals.css";

// [수정 5] 브라우저 탭 제목과 검색 결과의 소개입니다.
export const metadata = {
  title: "옥천 식당 전문가",
  description:
    "옥천군 식당 데이터를 바탕으로 답변하는 AI 에이전트입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
