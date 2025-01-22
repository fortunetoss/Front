import { Suspense } from "react";

export default function CallbackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
