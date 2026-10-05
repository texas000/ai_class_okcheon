// Vercel 서버 함수에도 CSV 파일을 함께 넣습니다.
// 저장소에 CSV를 올리는 것과 서버 함수에 포함하는 것은 별도 설정입니다.
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/chat": ["./okcheon_restaurant.csv"],
  },
};

export default nextConfig;
