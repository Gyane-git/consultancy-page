import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EDUCATORS' CONSULTANCY - Empowering Educators, Enriching Education",
  description: "EDUCATORS' CONSULTANCY is a leading educational consultancy dedicated to empowering educators and enriching education. We provide comprehensive support, resources, and guidance to help educators thrive in their careers and make a positive impact on students' lives. Our services include professional development, curriculum design, educational technology integration, and personalized coaching. With a team of experienced educators and industry experts, we are committed to fostering innovation, collaboration, and excellence in education. Join us on our mission to transform education and create a brighter future for educators and learners alike.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
