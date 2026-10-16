import Link from "next/link";

export default function AuthScreen({ title, configured, children }) {
  return (
    <main className="auth-screen">
      <Link className="auth-home" href="/">← AI Class 홈으로</Link>
      <div className="auth-heading">
        <span className="eyebrow">AI CLASS · ACCOUNT</span>
        <h1>{title}</h1>
        <p>로그인하고 나의 관리 공간으로 이동하세요.</p>
      </div>
      {configured ? children : (
        <section className="auth-setup" role="status">
          <h2>로그인 설정이 필요합니다</h2>
          <p>서비스의 로그인 연결을 준비하고 있습니다. 설정을 마치면 로그인과 회원가입을 이용할 수 있습니다.</p>
          <Link href="/">수업 화면으로 돌아가기</Link>
        </section>
      )}
    </main>
  );
}
