export default function Header({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <header className="relative h-14 w-full border-b-2 border-[#F2F2F2] flex items-center pl-[20px] pr-[16px] justify-between">
      {children}
    </header>
  );
}
