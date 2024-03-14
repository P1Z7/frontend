import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@/components/Analytics";
import Header from "@/components/header/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/public/font/pretendard/font.css";
import PageLoading from "./_components/PageLoading";
import "./globals.css";

export const metadata = {
  title: "Opener | K-pop 행사를 한 눈에",
  description: "K-pop 팬을 위한 오프라인 행사 정보를 한 곳에서 쉽게 확인할 수 있는 웹사이트. 각종 카페 이벤트부터 팬광고, 포토부스 등 다양한 이벤트 정보를 한눈에 찾아보세요!",
  icons: {
    icon: "/icon/favicon.svg",
  },
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
      <head>
        <meta name="google-site-verification" content="baJ8sFSbwa2owl2MQogf1J5sX4CEPSTg5NipfOsFIIU" />
      </head>
      <body>
        <Suspense fallback={<PageLoading />}>
          <Toaster containerClassName="toast" />
          <ReactQueryProvider>
            <Header />
            {children}
            <div id="bottom-sheet" />
            <div id="modal" />
          </ReactQueryProvider>
          <Suspense>
            <Analytics />
          </Suspense>
        </Suspense>
      </body>
      {/* <Script src="https://developers.kakao.com/sdk/js/kakao.js" async /> */}
      {/* <Script type="text/javascript" src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer`} /> */}
    </html>
  );
}
