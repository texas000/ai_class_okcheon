"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useAuthEnabled } from "./auth-provider.js";

function ClerkAccount() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <div className="profile" role="status">계정 확인 중…</div>;
  if (!isSignedIn) return <LoginLinks />;

  return (
    <div className="profile account-profile">
      <UserButton />
      <div>
        <strong>{user.fullName || user.primaryEmailAddress?.emailAddress || "메이커"}</strong>
        <small>AI Class · 로그인됨</small>
      </div>
      <Link className="account-manage" href="/manage" prefetch={false}>관리</Link>
    </div>
  );
}

function LoginLinks() {
  return (
    <div className="profile account-links">
      <Link className="auth-button" href="/sign-in" prefetch={false}>로그인</Link>
      <Link href="/sign-up" prefetch={false}>회원가입</Link>
    </div>
  );
}

export default function AccountMenu() {
  const enabled = useAuthEnabled();
  return enabled ? <ClerkAccount /> : <LoginLinks />;
}
