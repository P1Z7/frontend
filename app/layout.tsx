import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@/components/Analytics";
import PcHeader from "@/components/header/PcHeader";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/public/font/pretendard/font.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "K-POP",
  description: "K-POP 정보 공유 서비스",
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Toaster containerClassName="toast" />
        <ReactQueryProvider>
          <PcHeader />
          {children}
          <div id="bottom-sheet" />
          <div id="modal" />
        </ReactQueryProvider>
      </body>
      <Suspense>
        <Analytics />
      </Suspense>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script type="text/javascript" src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`} />
    </html>
  );
}
