"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAnswererStore from "@/store/answerer";
import { authApiClient } from "@/api/api-client";

interface NicknameFormProps {
  initialName?: string;
}

export default function NicknameForm({ initialName }: NicknameFormProps) {
  const [enteredName, setEnteredName] = useState<string>("");
  const { questionId } = useParams();
  const router = useRouter();
  const setAnswererName = useAnswererStore((state) => state.setName);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (questionId) {
      // 응답자 화면 => store에 닉네임을 저장하고 다음 페이지로 넘어가기
      setAnswererName(enteredName);
      router.push(`/${questionId}/answer`);
    } else {
      // 출제자 화면 => 백엔드로 닉네임 보내기
      await authApiClient.patch("/api/name", { name: enteredName });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredName(event.currentTarget.value.trim());
  };

  const isValidName = enteredName.length >= 1 && enteredName.length <= 10;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-[13px] px-1 font-medium">
          <label htmlFor="name" className="text-[#848588]">
            이름
          </label>
          <div className="text-[#C7C8C9]">{enteredName.length}/10</div>
        </div>
        <input
          type="text"
          id="name"
          className={`w-full focus:outline-none border-[1px] px-3 py-4 rounded-lg text-base font-medium placeholder:text-[#C7C8C9] ${
            isValidName ? "focus:border-blue" : "focus:border-[#C6C6C6]"
          }`}
          placeholder="이름을 입력해주세요"
          defaultValue={initialName ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={!isValidName} className="next-btn">
          다음
        </button>
      </div>
    </form>
  );
}
