import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/Header";
import { FluidParticles } from "@/components/FluidParticles";

export const metadata: Metadata = {
  title: {
    default: "Sebastián Luján — Senior Backend Engineer",
    template: "%s — Sebastián Luján",
  },
  description:
    "Senior backend engineer with a fintech and crypto background — Rust, Solidity, ZK, and DeFi.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <FluidParticles />
        <div className="page">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
