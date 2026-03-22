"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type UserRole,
  loginWithEmail,
  loginWithGoogle,
  signupWithEmail,
  signupWithGoogle,
} from "@/lib/aleph-auth";

type Mode = "login" | "signup";

type AuthPanelProps = {
  role: UserRole;
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function getDashboardRoute(role: string) {
  return role === "supplier" ? "/supplier-dashboard" : "/retailer-dashboard";
}

function getRoleLabel(role: UserRole) {
  return role === "supplier" ? "Supplier" : "Retailer";
}

export default function AuthPanel({ role }: AuthPanelProps) {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<Mode>(mode);

  const title = useMemo(() => {
    const action = mode === "signup" ? "Create" : "Sign in to";
    return `${action} ${getRoleLabel(role)} Account`;
  }, [mode, role]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      return;
    }

    const scriptId = "google-identity-services";
    const existing = document.getElementById(
      scriptId,
    ) as HTMLScriptElement | null;

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) {
        return;
      }

      googleButtonRef.current.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async ({ credential }) => {
          setLoading(true);
          setError("");
          setMessage("");

          try {
            const authResponse =
              modeRef.current === "signup"
                ? await signupWithGoogle({ idToken: credential, role })
                : await loginWithGoogle(credential);

            localStorage.setItem(
              "aleph_access_token",
              authResponse.accessToken,
            );
            localStorage.setItem(
              "aleph_user",
              JSON.stringify(authResponse.user),
            );

            if (modeRef.current === "signup") {
              const walletAddress = authResponse.user.wallet?.address;
              setMessage(
                walletAddress
                  ? `Account and wallet created: ${walletAddress}`
                  : "Account created and wallet initialized.",
              );
            }

            router.push(getDashboardRoute(authResponse.user.role));
          } catch (authError) {
            setError(
              authError instanceof Error
                ? authError.message
                : "Google authentication failed. Please try again.",
            );
          } finally {
            setLoading(false);
          }
        },
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: mode === "signup" ? "signup_with" : "signin_with",
        width: 300,
      });
    };

    if (existing) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    document.head.appendChild(script);
  }, [mode, role]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const authResponse =
        mode === "signup"
          ? await signupWithEmail({ email, fullName, password, role })
          : await loginWithEmail({ email, password });

      localStorage.setItem("aleph_access_token", authResponse.accessToken);
      localStorage.setItem("aleph_user", JSON.stringify(authResponse.user));

      if (mode === "signup") {
        const walletAddress = authResponse.user.wallet?.address;
        setMessage(
          walletAddress
            ? `Account and wallet created: ${walletAddress}`
            : "Account created and wallet initialized.",
        );
      }

      router.push(getDashboardRoute(authResponse.user.role));
    } catch (authError) {
      setError(
        authError instanceof Error
          ? authError.message
          : "Authentication failed. Please check your details and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.55)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              mode === "signup"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              mode === "login"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Login
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500"
              placeholder="Ana Perez"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500"
            placeholder="you@bodegagente.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500"
            placeholder="At least 8 characters"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
              ? `Create ${getRoleLabel(role)} Account`
              : `Login as ${getRoleLabel(role)}`}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
        <span className="h-px flex-1 bg-slate-200" />
        or continue with Google
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {!GOOGLE_CLIENT_ID ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Google login is disabled. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your
          environment.
        </p>
      ) : (
        <div className="flex justify-center">
          <div ref={googleButtonRef} />
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      {message && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {message}
        </p>
      )}
    </section>
  );
}
