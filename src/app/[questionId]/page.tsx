"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/api-client";
import Header from "@/components/header/header";
import ResponseData from "@/models/response-data";
import useQuestionStore from "@/store/question";

export default function IntroPage() {
  const [creator, setCreator] = useState("출제자");
  const [hasMessage, setHasMessage] = useState(false);
  const [pocketImg, setPocketImg] = useState("");
  const { questionId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get<ResponseData>(
        `/api/answer/${questionId}`
      );
      // 출제자 이름, 덕담 여부, 복주머니 이미지는 받아서 이 페이지에서 바로 보여주기
      const { title, select1, select2, select3, select4 } = response.data.data;
      const setQuestion = useQuestionStore((state) => state.setQuestion);
      setQuestion(title, [select1, select2, select3, select4]);
    };

    getData();
  });

  return (
    <>
      <Header>
        <div>LOGO</div>
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        <div className="flex flex-col gap-[10px]">
          {/* hasMessage에 따라 문구 변경 */}
          <h1 className="text-xl font-bold">당신을 위한 특별한 새해 메시지!</h1>
          <h2 className="text-base font-medium text-[#848588]">
            문제를 맞추고 {creator}님이 보낸 덕담을 확인하세요.
          </h2>
        </div>
        {/* 복주머니 이미지 */}
        <div className="w-60 h-60 mx-auto bg-disable"></div>
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
