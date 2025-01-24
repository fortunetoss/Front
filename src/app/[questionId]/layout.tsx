import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "복 던지미가 보내온 ‘복 주머니’를 받아보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
