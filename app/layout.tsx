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
    </html>
  );
}
