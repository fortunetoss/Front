"use client";

import { useParams, useRouter } from "next/navigation";
import Option from "@/components/buttons/option";
import useAnswererStore from "@/store/answerer";
import { apiClient } from "@/api/api-client";
import useQuestionStore from "@/store/question";

export default function AnswerPage() {
  const { question, options } = useQuestionStore();
  const { name, answer, setAnswer } = useAnswererStore();
  const router = useRouter();
  const { questionId } = useParams();

  const handleClick = async (text: string) => {
    setAnswer(text);

    const response = await apiClient.post(`/api/answer/${questionId}`, {
      answer: text,
      solver: name,
    });

    console.log(response.data.data);

    const { content, qeustionTitle, userAnswer, solver, correct } =
      response.data.data;

    // 정답 여부, 정답, 덕담 등 zustand 저장

    router.push(`/${questionId}/answer/result`);
  };

  return (
    <section className="flex flex-col gap-[32px] py-[42px]">
      <h1 className="text-[22px] font-medium text-center mx-10">{question}</h1>
      <ul className="flex flex-col gap-[14px]">
        {options.map((option, idx) => (
          <li key={idx}>
            <Option
              text={option}
              isSelected={option === answer}
              disabled={answer !== null}
              onClick={handleClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
