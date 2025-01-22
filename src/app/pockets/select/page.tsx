"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePocketStore from "../../store/usePocket";
import Notice from "../../../components/notice";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";

const Select = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSelectOption, setStep } = usePocketStore();

  const handleOption = (option: string) => {
    setSelectOption(option);
    setStep(2);
    router.push(`/pockets/form?&select=${option}`);
  };

  return (
    <div>
      <Header>
        <BackButton />
      </Header>
      <div className="container mx-auto p-6">
        <h1 className="font-semibold text-xl mt-1">
          2024년을 돌아보며
          <br />
          문제와 새해 덕담을 전해주세요.
        </h1>

        <div className="space-y-4 mt-28">
          <button
            onClick={() => handleOption("problem")}
            className="w-full text-black bg-white hover:bg-blue hover:text-white border border-gray-300 text-lg rounded-lg px-4 py-2 shadow"
          >
            문제만 보내기
          </button>
          <button
            onClick={() => handleOption("together")}
            className="w-full text-black hover:bg-blue hover:text-white border border-gray-300 text-lg rounded-lg px-4 py-2 shadow"
          >
            문제와 덕담 같이 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select;
