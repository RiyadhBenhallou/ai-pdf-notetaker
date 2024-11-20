import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignUp
        forceRedirectUrl={"/api/check-user"}
        signInForceRedirectUrl={"/api/check-user"}
      />
    </div>
  );
}
