import type { Metadata } from "next";
import Script from "next/script";
import "@/public/fonts/pretendard/font.css";
import Provider from "./Provider";
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
        <div id="modal"></div>
        <Provider>
          {children}
          <div id="bottom-sheet" />
        </Provider>
      </body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`} />
    </html>
  );
}
