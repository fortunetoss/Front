"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import useAnswererStore from "@/store/answerer";

import { getPouch } from "@/utils/images/domain";
import { IntroResponseData } from "@/api/answerer";

interface IntroContentProps {
  data: IntroResponseData;
  questionId: string;
}

export default function IntroContent({ data, questionId }: IntroContentProps) {
  const { setInitialData, question, pouchType } = useAnswererStore();
  const [hasMessage, setHasMessage] = useState<boolean | null>(null);

  useEffect(() => {
    setInitialData(
      data.title,
      [data.select1, data.select2, data.select3, data.select4],
      data.publisher,
      data.domain,
    );
    setHasMessage(data.content !== null);
  }, [data, setInitialData]);

  const pouchImg = getPouch(pouchType);

  let title = "";
  let phrase = "";

  if (hasMessage === true) {
    title = "당신을 위한 특별한 새해 메시지!";
    phrase = `문제를 맞추고 ${data.publisher}님이 보낸 덕담을 확인하세요.`;
  } else if (hasMessage === false) {
    title = `2024년 ${data.publisher}님과 가까운 한 해였나요?`;
    phrase = `${data.publisher}님의 지난 한 해는 어땠을지 문제를 통해 맞춰보세요!`;
  }

  return (
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
  );
}
