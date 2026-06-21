// Root layout for the Yui mock site.
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { FeedbackBar } from "@/components/FeedbackBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "ゆい | 避難所コミュニティ支援アプリ",
  description: "避難所コミュニティ支援アプリ「ゆい」の操作可能な画面モックです。",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>
        <div className="flex min-h-screen flex-col pb-24">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FeedbackBar />
        </div>
      </body>
    </html>
  );
}
