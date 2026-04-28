import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FounderOS — AI Chief of Staff for Startup Founders",
  description:
    "Compress operational chaos into clarity. FounderOS is your AI-powered Chief of Staff that stitches context, tracks commitments, and keeps you ahead of every deadline.",
  keywords: ["AI", "startup", "founder", "productivity", "chief of staff", "YC"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-animated">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
