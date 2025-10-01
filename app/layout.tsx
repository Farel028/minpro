import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CourteaseNavbar from "@/components/navbar";
import SplashScreen from "@/components/splashScreen";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CourtEase",
    template: "%s — CourtEase",
  },
  description:
    "CourtEase membantu kamu menemukan, memesan, dan mengelola lapangan olahraga favorit dengan mudah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SplashScreen />
          <CourteaseNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
