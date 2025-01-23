import { Suspense } from "react";

export default function SelectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
