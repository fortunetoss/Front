"use client";

import { useParams, useRouter } from "next/navigation";
import Option from "@/components/buttons/option";
import useAnswererStore from "@/store/answerer";
import { apiClient } from "@/api/api-client";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";

export default function AnswerPage() {
  const { question, options, name, answer, setAnswer, setAnswererResult } =
    useAnswererStore();
  const router = useRouter();
  const { questionId } = useParams();

  const handleClick = async (text: string) => {
    setAnswer(text);

    const response = await apiClient.post(`/api/answer/${questionId}`, {
      answer: text,
      solver: name,
    });
    const { correct, answer, content, card, answerId } = response.data.data;
    setAnswererResult(correct, answer, content, card, answerId);

    if (questionId) {
      router.push(`/${questionId}/answer/result`);
    }
  };

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        <section className="flex flex-col gap-[32px] py-[42px]">
          <h1 className="text-[22px] font-medium text-center mx-10">
            {question}
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
    </>
  );
}
