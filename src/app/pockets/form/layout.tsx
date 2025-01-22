import { Suspense } from "react";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
