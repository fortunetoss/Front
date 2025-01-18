"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAnswererStore from "@/store/answerer";
import { authApiClient } from "@/api/api-client";

export default function NicknameForm() {
  const [enteredName, setEnteredName] = useState<string>("");
  const setAnswererName = useAnswererStore((state) => state.setName);
  const { questionId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const getDefaultName = async () => {
      const response = await authApiClient.get("/api/name");
      const defaultName = response.data.data.name;
      setEnteredName(defaultName);
    };

    if (!questionId) {
      getDefaultName();
    }
  }, []);

  const isValidName = useMemo(
    () => enteredName.length >= 1 && enteredName.length <= 10,
    [enteredName]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (questionId) {
      setAnswererName(enteredName);
      router.push(`/${questionId}/answer`);
    } else {
      await authApiClient.post("/api/name", { name: enteredName });
      router.push("/pockets");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value.trim();
    setEnteredName(input);
  };

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
          value={enteredName}
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
