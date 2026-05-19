import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeInit } from "@/components/ThemeInit";
import { ToasterProvider } from "@/components/ToasterProvider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Concert Cost Tracker",
  description: "Track concert costs, fun ratings, and value over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <ThemeInit />
      </head>
      <body
        className={`${geistSans.className} ${geistMono.variable} min-h-screen bg-base-200 font-sans antialiased`}
      >
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
