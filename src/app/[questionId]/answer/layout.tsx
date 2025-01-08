import BackButton from "@/components/header/back-button";
import Header from "@/components/header/header";

export default function AnswerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        {children}
      </main>
    </>
  );
}
