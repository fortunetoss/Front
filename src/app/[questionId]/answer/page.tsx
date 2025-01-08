"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Option from "@/components/buttons/option";

export default function AnswerPage() {
  const question = "길동님이 올해 가장 열심이었던 운동은?";
  const options = ["수영", "테니스", "헬스", "요가"];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const router = useRouter();
  const { questionId } = useParams();

  const handleClick = async (idx: number) => {
    setSelectedOption(idx);
    // 백엔드 로직 추가
    router.push(`/${questionId}/answer/result`);
  };

  return (
    <section className="flex flex-col gap-[32px] py-[42px]">
      <h1 className="text-[22px] font-medium text-center mx-10">{question}</h1>
      <ul className="flex flex-col gap-[14px]">
        {options.map((option, idx) => (
          <li key={option + idx}>
            <Option
              text={option}
              id={idx}
              isSelected={idx === selectedOption}
              disabled={selectedOption !== null}
              onClick={handleClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
