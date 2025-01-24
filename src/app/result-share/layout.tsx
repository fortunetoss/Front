import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "응답자가 정답을 맞췄는지 확인해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
