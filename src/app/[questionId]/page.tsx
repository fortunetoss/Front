import Header from "@/components/header/header";
import Link from "next/link";

interface IntroPageProps {
  params: { questionId: string };
}

export default function IntroPage({ params }: IntroPageProps) {
  const creator = "길동";

  return (
    <>
      <Header>
        <div>LOGO</div>
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-xl font-bold">당신을 위한 특별한 새해 메시지!</h1>
          <h2 className="text-base font-medium text-[#848588]">
            문제를 맞추고 {creator}님이 보낸 덕담을 확인하세요.
          </h2>
        </div>
        <div className="w-60 h-60 mx-auto bg-disable"></div>
        <Link
          href={`${params.questionId}/nickname`}
          className="block mx-auto w-full bg-blue text-white font-bold px-3 py-4 rounded-lg text-center"
        >
          문제 풀기
        </Link>
      </main>
    </>
  );
}
