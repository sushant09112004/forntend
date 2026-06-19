import { HRLoginForm } from "@/components/hr-login-form";

export default function HRLoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <HRLoginForm />
      </div>
    </div>
  );
}
