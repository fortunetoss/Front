"use client";

import { useRouter } from "next/navigation";

interface AnswererShareResultProps {
  isCorrect: boolean;
  answerer: string;
  questionId: number;
}

export default function AnswererShareResult({
  isCorrect,
  answerer,
  questionId,
}: AnswererShareResultProps) {
  const router = useRouter();

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
