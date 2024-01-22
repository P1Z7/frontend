import type { Metadata } from "next";
import "@/public/fonts/pretendard/font.css";
import Provider from "./Provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "K-POP",
  description: "K-POP 정보 공유 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
