"use client";

import { apiClient } from "@/api/api-client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultSharePage() {
  const { answerId } = useParams();
  const router = useRouter();
  const [answerer, setAnswerer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  let questionId: null | number = null;

  useEffect(() => {
    (async () => {
      const response = await apiClient.get(`/api/answer/result/${answerId}`);
      const { correct, answerNickname, questionCustomId } = response.data.data;

      questionId = questionCustomId;
      setAnswerer(answerNickname);
      setIsCorrect(correct);
    })();
  }, []);

  const goToHome = () => {
    router.push("/pockets");
  };

  const goToQuestion = () => {
    if (questionId) {
      router.push(`/result?questionCustomId=${questionId}`);
    } else {
      router.push("/pockets");
    }
  };

  return (
    <main className="flex flex-col h-full justify-center gap-16 px-5 py-8 bg-white">
      {answerer !== null && isCorrect !== null && (
        <section className="flex flex-col gap-4">
          <div className="text-8xl text-center">{isCorrect ? "🥳" : "😓"}</div>
          <h1 className="font-bold text-[40px] text-center">
            <div>{answerer ?? "응답자"}님이</div>
            <div>
              {isCorrect ? "문제를 맞췄어요!" : "문제를 틀리고 말았어요."}
            </div>
          </h1>
        </section>
      )}
      <section className="flex flex-col gap-[14px]">
        <button className="broad-btn" onClick={goToQuestion}>
          푼 문제 확인하기
        </button>
        <button className="broad-btn" onClick={goToHome}>
          홈으로 이동
        </button>
      </section>
    </main>
  );
}
