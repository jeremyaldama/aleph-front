import { notFound } from "next/navigation";
import AuthPanel from "@/components/auth/AuthPanel";
import type { UserRole } from "@/lib/aleph-auth";

type AuthPageProps = {
  params: Promise<{
    role: string;
  }>;
};

function isSupportedRole(role: string): role is UserRole {
  return role === "retailer" || role === "supplier";
}

export default async function AuthRolePage({ params }: AuthPageProps) {
  const { role } = await params;

  if (!isSupportedRole(role)) {
    notFound();
  }

  const roleLabel = role === "supplier" ? "Supplier" : "Retailer";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7fafc] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(9,129,255,0.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.12),transparent_35%)]" />

      <section className="relative mx-auto grid w-full max-w-6xl gap-8 px-6 pb-16 pt-14 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 shadow-sm">
            Bodega Gente Onboarding
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {roleLabel} Access and Wallet Setup
          </h1>

          <p className="text-slate-600">
            Sign up or log in with email or Google. New accounts automatically
            trigger wallet creation in the backend through the signup endpoints.
          </p>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_-30px_rgba(15,23,42,0.8)]">
            <h2 className="text-base font-semibold text-slate-900">
              How It Works
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-slate-600">
              <li>1. Choose login or sign up and complete authentication.</li>
              <li>
                2. Google sign-in sends your ID token to the backend auth
                endpoint.
              </li>
              <li>
                3. Signup creates your user and Fuji wallet in backend
                automatically.
              </li>
              <li>
                4. You are redirected to your role dashboard after
                authentication.
              </li>
            </ol>
          </div>
        </div>

        <AuthPanel role={role} />
      </section>
    </main>
  );
}
