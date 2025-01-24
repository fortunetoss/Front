import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import KakaoScript from "@/components/kakao/kakao-script";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "던지미",
  description:
    "문제 속에서 찾아내는 따뜻한 메시지, 복 던지미에서 지금 시작하세요.",
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/logo.svg" },
      {
        rel: "icon",
        type: "image/png",
        url: "/logo.png",
        sizes: "54x54",
      },
    ],
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <KakaoScript />
      <body
        className={`${pretendard.variable} font-pretendard bg-black text-[#171719]`}
      >
        <div className="mx-auto max-w-[480px] h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
