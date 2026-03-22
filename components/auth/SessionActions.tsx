"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearLocalSession } from "@/lib/aleph-rwa";

const HIDDEN_PATH_PREFIXES = ["/auth"];

export default function SessionActions() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("aleph_access_token");
    setIsLoggedIn(Boolean(token));
  }, [pathname]);

  if (!pathname) {
    return null;
  }

  if (HIDDEN_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  function handleLogout() {
    clearLocalSession();
    setIsLoggedIn(false);
    router.replace("/");
    router.refresh();
  }

  return (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <p className="text-sm font-medium text-slate-700">Signed in</p>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-slate-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
