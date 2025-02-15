// 복주머니가 공유되었어요 페이지

"use client";

import { useRouter } from "next/navigation";
import Notice from "@/components/modal/notice";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";

const Shared = () => {
  const router = useRouter();

  const handleMovePockets = () => {
    router.push("/pockets");
  };

  return (
    <div>
      <Header>
        <BackButton />
      </Header>
      <div className="container flex flex-col mx-auto p-4">
        <Notice text="복주머니가 공유되었어요!"></Notice>

        <p className="mt-20 mb-[120px] text-9xl text-center">🥳</p>
        <div className="flex justify-center flex-col">
          <button onClick={handleMovePockets} className="broad-btn">
            홈으로 이동
          </button>
          {/*
                <button
                    onClick={handleMovePockets}
                    className="px-6 py-3 mt-3 text-lg font-medium text-black border-gray-400 border-2 bg-white rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                >
                    홈으로 이동
                </button>
                */}
        </div>
      </div>
    </div>
  );
};

export default Shared;
