import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surabaya Heritage Quest",
  description: "Eksplor kampung-kampung Surabaya dengan AR marker Hiro dan quest gamified"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
