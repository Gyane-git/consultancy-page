import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "StudySync - Your Ultimate Study Abroad Companion",
  description: "StudySync is your ultimate study abroad companion, providing seamless support and guidance for students embarking on international educational journeys. Discover a world of opportunities with our comprehensive platform designed to make your study abroad experience unforgettable.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{
          ["--font-geist-sans" as string]:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          ["--font-geist-mono" as string]:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
        }}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
