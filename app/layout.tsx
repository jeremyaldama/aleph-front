import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import SessionActions from "@/components/auth/SessionActions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bodegagentic | Coordinated Procurement",
  description:
    "Bodegagentic helps retailers and suppliers coordinate demand, tokenize inventory, and unlock institutional pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-3 lg:px-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/bodegagentic-logo.svg"
                alt="Bodegagentic logo"
                width={46}
                height={46}
                priority
              />
              <span className="text-2xl font-semibold tracking-tight text-slate-950">
                Bodegagentic
              </span>
            </Link>
          </div>
        </header>
        <SessionActions />
        {children}
      </body>
    </html>
  );
}
