import { SignIn } from "@clerk/nextjs";
import AuthScreen from "../../../components/auth-screen.js";
import { isClerkConfigured } from "../../../lib/auth-config.js";

export const metadata = { title: "로그인 | AI Class" };

export default function SignInPage() {
  return (
    <AuthScreen title="다시 만나 반가워요" configured={isClerkConfigured()}>
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </AuthScreen>
  );
}
