import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { isClerkConfigured } from "../../lib/auth-config.js";
import { getRestaurantSummary, loadRestaurants } from "../../lib/restaurants.js";
import { COURSE_SESSIONS } from "../../lib/practice-guide.js";

export const metadata = {
  title: "관리 | AI Class",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function ManagePage() {
  if (!isClerkConfigured()) redirect("/sign-in");
  // 관리 데이터를 읽기 전에 매 요청마다 서버에서 세션을 검증합니다.
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn({ returnBackUrl: "/manage" });

  const user = await currentUser();
  if (!user) return redirectToSignIn({ returnBackUrl: "/manage" });
  const summary = getRestaurantSummary(await loadRestaurants());
  const name = user.firstName || user.fullName || "메이커";

  return (
    <main className="manage-page">
      <header className="manage-header">
        <Link href="/" className="auth-home">← AI Class 홈으로</Link>
        <div className="manage-account"><span>{name} 님</span><UserButton /></div>
      </header>
      <section className="manage-intro">
        <span className="eyebrow">MY WORKSPACE</span>
        <h1>나의 관리 공간</h1>
        <p>{name} 님, 환영합니다. 계정과 수업, 서비스 현황을 한곳에서 확인하세요.</p>
      </section>
      <div className="manage-stats">
        <article><span>전체 수업</span><strong>{COURSE_SESSIONS.length}<small>회차</small></strong></article>
        <article><span>등록된 옥천 업소</span><strong>{summary.total.toLocaleString("ko-KR")}<small>개</small></strong></article>
        <article><span>데이터 최신 갱신일</span><strong className="manage-date">{summary.dates[0] || "미확인"}</strong></article>
      </div>
      <section className="manage-card">
        <h2>내 계정</h2>
        <dl className="manage-details">
          <div><dt>이름</dt><dd>{user.fullName || "등록된 이름 없음"}</dd></div>
          <div><dt>이메일</dt><dd>{user.primaryEmailAddress?.emailAddress || "등록된 이메일 없음"}</dd></div>
        </dl>
        <p className="manage-hint">오른쪽 위 프로필을 눌러 계정 정보를 수정하거나 로그아웃할 수 있습니다.</p>
      </section>
      <section className="manage-card">
        <h2>수업 바로가기</h2>
        <nav className="manage-courses" aria-label="수업 관리">
          {COURSE_SESSIONS.map((session) => (
            <Link key={session.number} href={`/guide/${session.number}`}>
              <span>{session.number}회차</span><strong>{session.label}</strong><span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </section>
      <section className="manage-card">
        <h2>식당 데이터 현황</h2>
        <dl className="manage-details">
          {Object.entries(summary.byStatus).map(([status, count]) => (
            <div key={status}><dt>{status}</dt><dd>{count.toLocaleString("ko-KR")}개</dd></div>
          ))}
        </dl>
      </section>
    </main>
  );
}
