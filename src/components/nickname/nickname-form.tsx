"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAnswererStore from "@/store/answerer";
import { getDefaultName, postName, validateName } from "@/api/nickname";

export default function NicknameForm() {
  const [enteredName, setEnteredName] = useState<string>("");
  const [isValidName, setIsValidName] = useState(false);
  const [isEditted, setIsEditted] = useState(false);

  const setAnswererName = useAnswererStore((state) => state.setName);

  const { questionId } = useParams();
  const router = useRouter();

  const focusBorder = useMemo(() => {
    if (!isEditted) {
      return "focus:border-[#C6C6C6]";
    }

    if (isValidName) {
      return "focus:border-blue";
    }

    return "focus:border-[#FF7700]";
  }, [isValidName]);

  useEffect(() => {
    if (!questionId) {
      (async () => {
        const { name: defaultName } = await getDefaultName();
        setEnteredName(defaultName);
        setIsValidName(true);
      })();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    try {
      await validateName(enteredName);
    } catch (err) {
      alert("유효하지 않은 이름입니다.");
      setIsValidName(false);
      isValid = false;
    }

    if (!isValidName) return;

    if (questionId) {
      setAnswererName(enteredName);
      router.push(`/${questionId}/answer`);
    } else {
      await postName(enteredName);
      router.push("/pockets");
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredName(event.currentTarget.value);

    try {
      await validateName(event.currentTarget.value);
      setIsValidName(true);
    } catch (err) {
      setIsValidName(false);
    } finally {
      setIsEditted(true);
    }
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
          className={`w-full focus:outline-none border-[1px] px-3 py-4 rounded-lg text-base font-medium placeholder:text-[#C7C8C9] ${focusBorder}`}
          placeholder="이름을 입력해주세요"
          value={enteredName}
          onChange={handleChange}
        />
        {isEditted && !isValidName && (
          <p className="font-medium text-[13px] text-[#FF7700] mx-1">
            이름은 10자 이내, 띄어쓰기, 이모지, 특수문자 미포함이어야합니다.
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={false} className="next-btn">
          다음
        </button>
      </div>
    </form>
  );
}
