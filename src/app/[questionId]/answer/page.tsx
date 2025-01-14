"use client";

import { useParams, useRouter } from "next/navigation";
import Option from "@/components/buttons/option";
import useAnswererStore from "@/store/answerer";
import { apiClient, authApiClient } from "@/api/api-client";

export default function AnswerPage() {
  const { question, options, name, answer, setAnswer, setAnswererResult } =
    useAnswererStore();
  const router = useRouter();
  const { questionId } = useParams();

  const handleClick = async (text: string) => {
    setAnswer(text);

    // 나중에 apiClient로 변경 필요
    const response = await authApiClient.post(`/api/answer/${questionId}`, {
      answer: text,
      solver: name,
    });

    console.log(response.data.data);
    const { correct, userAnswer } = response.data.data;
    setAnswererResult(correct, userAnswer, null, "", "");

    // 응답 값 변경 완료 후 아래 코드로 변경
    //const { correct, correctAnswer, content, card, paper } = response.data.data;
    // 정답 여부, 정답, 덕담 등 zustand 저장
    //setAnswererResult(correct, correctAnswer, content, card, paper)

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
