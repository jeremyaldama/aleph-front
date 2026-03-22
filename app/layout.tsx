import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        <SessionActions />
        {children}
      </body>
    </html>
  );
}
