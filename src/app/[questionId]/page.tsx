"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/api-client";
import Header from "@/components/header/header";
import ResponseData from "@/models/response-data";
import useAnswererStore from "@/store/answerer";
import Logo from "@/components/header/logo";
import { getPouch } from "@/utils/images/domain";
import {decrypt} from "@/hooks/crypto";
import {useDecryptedId} from "@/hooks/useDecrypteId";

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

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY!;


export default function IntroPage() {
  const { encryptedId, decryptedId } = useDecryptedId();
  const [questionId, setQuestionId] = useState<string | null>(null);
  const { publisherName, pouchType, setInitialData } = useAnswererStore();
//  const { questionId } = useParams();
  const [hasMessage, setHasMessage] = useState<null | boolean>(null);

  useEffect(() => {
    if (!decryptedId) return;
    (async () => {
      try {
        // 복호화된 ID를 API 호출에 사용
        const response = await apiClient.get(`/api/answer/${decryptedId}`);
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

        setInitialData(title, [select1, select2, select3, select4], publisher, domain);
        setHasMessage(content !== null);
      } catch (error) {
        console.error("API 요청 중 오류:", error);
      }
    })();
  }, [decryptedId, setInitialData]);
  // API 호출
  useEffect(() => {
    if (!questionId) return;

    (async () => {
      try {
        const response = await apiClient.get(`/api/answer/${questionId}`);
        const { title, select1, select2, select3, select4, content, domain, publisher } = response.data.data;

        // 상태 업데이트
        setInitialData(
            title,
            [select1, select2, select3, select4],
            publisher,
            domain
        );
        setHasMessage(content !== null);
      } catch (error) {
        console.error("API 요청 중 오류:", error);
      }
    })();
  }, [questionId]);


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
        <Link
            href={`/${encryptedId}/nickname`}
          className="block mx-auto w-full bg-blue text-white font-bold px-3 py-4 rounded-lg text-center"
        >
          문제 풀기
        </Link>
      </main>
    </>
  );
}
