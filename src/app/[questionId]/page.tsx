"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import useAnswererStore from "@/store/answerer";
import Logo from "@/components/header/logo";
import { getPouch } from "@/utils/images/domain";
import { getAnswererIntroData } from "@/api/answerer";

export default function IntroPage() {
  const { publisherName, pouchType, setInitialData, question } =
    useAnswererStore();

  const { questionId } = useParams();
  const [hasMessage, setHasMessage] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      if (typeof questionId !== "string") return;
      try {
        const {
          title,
          select1,
          select2,
          select3,
          select4,
          content,
          domain,
          publisher,
        } = await getAnswererIntroData(questionId);

        setInitialData(
          title,
          [select1, select2, select3, select4],
          publisher,
          domain,
        );
        setHasMessage(content !== null);
      } catch (err) {
        alert("복주머니 데이터를 불러오는데 실패하였습니다.");
      }
    })();
  }, []);

  const pouchImg = getPouch(pouchType);

  let title = "";
  let phrase = "";

  if (hasMessage === true) {
    title = "당신을 위한 특별한 새해 메시지!";
    phrase = `문제를 맞추고 ${publisherName}님이 보낸 덕담을 확인하세요.`;
  } else if (hasMessage === false) {
    title = `2024년 ${publisherName}님과 가까운 한 해였나요?`;
    phrase = `${publisherName}님의 지난 한 해는 어땠을지 문제를 통해 맞춰보세요!`;
  }

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-base font-medium text-[#848588]">{phrase}</p>
        </div>
        {pouchImg && (
          <Image
            alt="복주머니"
            src={pouchImg}
            width={240}
            height={240}
            className="mx-auto"
          />
        )}
        {question && (
          <Link
            href={`/${questionId}/nickname`}
            className="block mx-auto w-full bg-blue text-white font-bold px-3 py-4 rounded-lg text-center"
          >
            문제 풀기
          </Link>
        )}
      </main>
    </>
  );
}
