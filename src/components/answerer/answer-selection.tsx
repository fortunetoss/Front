"use client";

import { useRouter } from "next/navigation";
import Option from "@/components/buttons/option";
import { postAnswerSelection } from "@/api/answerer";
import useAnswererStore from "@/store/answerer";

interface AnswerSelctionProps {
  questionId: string;
}

export default function AnswerSelction({ questionId }: AnswerSelctionProps) {
  const router = useRouter();
  const {
    question,
    options,
    name,
    answer,
    publisherName,
    setAnswer,
    setAnswererResult,
  } = useAnswererStore();

  const handleClick = async (text: string) => {
    try {
      const { correct, answer, content, card, answerId } =
        await postAnswerSelection(questionId, text, name);

      setAnswer(text);
      setAnswererResult(correct, answer, content, card, answerId);

      if (questionId) {
        router.push(`/${questionId}/answer/result`);
      }
    } catch (err) {
      alert("제출에 실패하였습니다.");
    }
  };

  return (
    <main className="flex flex-col gap-16 px-5 py-8 bg-white">
      <section className="flex flex-col gap-[32px] py-[42px]">
        <h1 className="text-[22px] font-medium text-center mx-10">
          {publisherName}님이 {question}
        </h1>
        <ul className="flex flex-col gap-[14px]">
          {options.map((option, idx) => (
            <li key={idx}>
              <Option
                text={option}
                isSelected={option === answer}
                onClick={handleClick}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
