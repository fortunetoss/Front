"use client";

import BackButton from "@/components/header/back-button";
import Header from "@/components/header/header";
import useAnswererStore from "@/store/answerer";
import FlippingCard from "@/components/card/flipping-card";
import AnswererFinalActions from "@/components/buttons/answerer-final-actions";
import { cardData } from "@/utils/images/cardNames";

export default function MessagePage() {
  const {
    publisherName,
    name: answererName,
    message,
    cardType,
  } = useAnswererStore();
  // 카드 타입에 따라 카드 이미지 변경하기

  const card = cardData.find(({ name }) => name === cardType);
  const frontImg = card?.frontImage ?? "/card/FORTUNETOSS_CARD_1.webp";
  const backImg = card?.backImage ?? "/cardBack/FORTUNETOSS_CARD_BACK_1.webp";

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <main className="flex flex-col gap-10 px-5 py-8 bg-white">
        <section className="flex flex-col gap-[10px]">
          <h1 className="font-bold text-xl">덕담 카드가 도착했어요!</h1>
          <p className="font-medium text-[#848588]">
            문제를 푼 {answererName}님께 {publisherName}님이 새해 덕담을
            보내왔어요
          </p>
        </section>
        <FlippingCard
          frontImg={frontImg}
          backImg={backImg}
          frontButtonText="덕담 메시지 보기"
        >
          {message}
        </FlippingCard>
        <AnswererFinalActions />
      </main>
    </>
  );
}
