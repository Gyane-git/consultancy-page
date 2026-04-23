import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudySync - Your Ultimate Study Abroad Companion",
  description: "StudySync is your ultimate study abroad companion, providing seamless support and guidance for students embarking on international educational journeys. Discover a world of opportunities with our comprehensive platform designed to make your study abroad experience unforgettable.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
