"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import useAnswererStore from "@/store/answerer";
import Header from "@/components/header/header";
import Logo from "@/components/header/logo";
import AnswererFinalActions from "@/components/buttons/answerer-final-actions";

export default function ResultPage() {
  const { isCorrect, question, correctAnswer, hasMessage } = useAnswererStore();
  const { questionId } = useParams();
  console.log(isCorrect, correctAnswer);

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 items-center">
            <div className="text-8xl">{isCorrect ? "🥳" : "😓"}</div>
            <h1 className="font-bold text-[40px]">
              {isCorrect ? "정답!" : "오답"}
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-[#F7F7F7] py-5 px-10 rounded-xl flex flex-col gap-[14px] items-center">
              <p className="font-medium text-[18px] text-center">{question}</p>
              <p className="border-[1px] border-[#C6C6C6] rounded-full bg-white py-2 px-[14px]">
                정답: <strong className="font-bold">{correctAnswer}</strong>
              </p>
            </div>
            {hasMessage && (
              <div className="flex justify-end">
                <Link href={`/${questionId}/message`} className="next-btn">
                  다음
                </Link>
              </div>
            )}
          </div>
          {!hasMessage && <AnswererFinalActions />}
        </section>
      </main>
    </>
  );
}
