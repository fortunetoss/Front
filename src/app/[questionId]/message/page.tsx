"use client";

import Link from "next/link";
import BackButton from "@/components/header/back-button";
import Header from "@/components/header/header";
import useAnswererStore from "@/store/answerer";
import FlippingCard from "@/components/card/flipping-card";
import AnswererFinalActions from "@/components/buttons/answerer-final-actions";

export default function MessagePage() {
  const { creatorName, name: answererName } = useAnswererStore();

  const message =
    " 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~ 새해 복 많이 받으세요~~";

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <main className="flex flex-col gap-10 px-5 py-8 bg-white">
        <section className="flex flex-col gap-[10px]">
          <h1 className="font-bold text-xl">덕담 카드가 도착했어요!</h1>
          <p className="font-medium text-[#848588]">
            문제를 푼 {answererName}님께 {creatorName}님이 새해 덕담을
            보내왔어요
          </p>
        </section>
        <FlippingCard
          frontImg="/card1.svg"
          backImg="/letter1.svg"
          frontButtonText="덕담 메시지 보기"
        >
          {message}
        </FlippingCard>
        <AnswererFinalActions />
      </main>
    </>
  );
}
