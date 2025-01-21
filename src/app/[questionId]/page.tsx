"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { apiClient } from "@/api/api-client";
import Header from "@/components/header/header";
import ResponseData from "@/models/response-data";
import useAnswererStore from "@/store/answerer";
import Logo from "@/components/header/logo";
import { getPouch } from "@/utils/images/domain";

interface IntroResponse {
  title: string;
  select1: string;
  select2: string;
  select3: string;
  select4: string;
  content: string | null;
  domain: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  publisher: string;
}

export default function IntroPage() {
  const { publisherName, pouchType, setInitialData } = useAnswererStore();

  const { questionId } = useParams();

  useEffect(() => {
    (async () => {
      const response = await apiClient.get<ResponseData>(
        `/api/answer/${questionId}`
      );

      const {
        title,
        select1,
        select2,
        select3,
        select4,
        content,
        domain,
        publisher,
      }: IntroResponse = response.data.data;
      setInitialData(
        title,
        [select1, select2, select3, select4],
        publisher,
        domain
      );
    })();
  }, []);

  const pouchImg = getPouch(pouchType);

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-xl font-bold">당신을 위한 특별한 새해 메시지!</h1>
          <h2 className="text-base font-medium text-[#848588]">
            문제를 맞추고 {publisherName}님이 보낸 덕담을 확인하세요.
          </h2>
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
        <Link
          href={`/${questionId}/nickname`}
          className="block mx-auto w-full bg-blue text-white font-bold px-3 py-4 rounded-lg text-center"
        >
          문제 풀기
        </Link>
      </main>
    </>
  );
}
