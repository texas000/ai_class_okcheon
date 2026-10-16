import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isClerkConfigured } from "./lib/auth-config.js";

const clerkProxy = clerkMiddleware();

export default function proxy(request, event) {
  // 설정 전에도 공개 수업은 열리지만 보호된 페이지는 열리지 않습니다.
  if (!isClerkConfigured()) {
    if (request.nextUrl.pathname === "/manage" || request.nextUrl.pathname.startsWith("/manage/")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }
  return clerkProxy(request, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
