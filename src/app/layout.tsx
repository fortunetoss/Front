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
  title: "Create Next App",
  description: "Generated by create next app",
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
