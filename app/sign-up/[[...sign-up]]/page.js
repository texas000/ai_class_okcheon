import { SignUp } from "@clerk/nextjs";
import AuthScreen from "../../../components/auth-screen.js";
import { isClerkConfigured } from "../../../lib/auth-config.js";

export const metadata = { title: "회원가입 | AI Class" };

export default function SignUpPage() {
  return (
    <AuthScreen title="나의 AI 수업을 시작하세요" configured={isClerkConfigured()}>
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </AuthScreen>
  );
}
