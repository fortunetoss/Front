"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import BackButton from "@/components/header/back-button";
import Header from "@/components/header/header";
import useAnswererStore from "@/store/answerer";
import flipIcon from "@/assets/icons/flip.svg";

export default function MessagePage() {
  const { creatorName, name: answererName } = useAnswererStore();
  const [isFlipped, setIsFlipped] = useState(false);
  const message =
    " 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~";

  console.log(message.length);

  const handleCardFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <main className="flex flex-col gap-10 px-5 py-8 bg-white">
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-bold text-xl">덕담 카드가 도착했어요!</h1>
          <h2 className="font-medium text-[#848588]">
            문제를 푼 {answererName}님께 {creatorName}님이 새해 덕담을
            보내왔어요
          </h2>
        </div>
        <article
          className={`flex flex-col justify-center mx-auto card ${
            isFlipped ? "flipped" : ""
          }`}
        >
          <div
            className="flex justify-center items-end card-front bg-cover bg-no-repeat bg-center card-front"
            style={{ backgroundImage: "url('/card1.svg')" }}
          >
            <button
              onClick={handleCardFlip}
              className="bg-blue px-[14px] py-2 mb-5 rounded-full text-sm text-white font-bold"
              aria-label="카드 뒤집어서 덕담 메시지 보기"
            >
              덕담 메시지 보기
            </button>
          </div>
          <div
            className="relative flex justify-center bg-cover bg-no-repeat bg-center card-back"
            style={{ backgroundImage: "url('/letter1.svg')" }}
          >
            <Image
              alt="뒤집기 버튼"
              src={flipIcon}
              width={24}
              height={24}
              className="absolute top-7 left-5 cursor-pointer"
              onClick={handleCardFlip}
              role="button"
            />
            <p className="absolute top-[80px] w-full px-7">{message}</p>
          </div>
        </article>
        <div className="flex flex-col gap-[14px]">
          <Link href="/" className="broad-btn">
            나도 문제 내러가기
          </Link>
          <button className="broad-btn">내 결과 공유하기</button>
        </div>
      </main>
    </>
  );
}
