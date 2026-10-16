// 키 값은 서버에서만 확인하고 브라우저에는 설정 여부만 전달합니다.
export function isClerkConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
}
