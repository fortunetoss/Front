"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Notice from "@/components/modal/notice";
import usePocketStore from "@/app/store/usePocket";
import CardList from "@/utils/images/cardList";
import { cardData } from "@/utils/images/cardNames";
import { submitCustomQuestion } from "@/api/api-form";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";
import useModifiedStore from "@/app/store/modifiedStore";
import { postEdit } from "@/api/api-postEdit";
import { buttonBackClick } from "@/components/edit/buttonBackClick";
import FlippingCard from "@/components/card/flipping-card";

const Letter = () => {
  const router = useRouter();
  const questionCustomId = usePocketStore((state) => state.questionId);
  // 상태에서 복주머니 ID 가져오기

  const {
    title,
    answers,
    correctAnswer,
    content,
    setContent,
    card,
    setCard,
    domain,
    setStep,
  } = usePocketStore();

  const [selectedCard, setSelectedCard] =
    useState<keyof typeof cardDataMap>("A");

  //수정사항
  const { isModified, setModified } = useModifiedStore();

  //카드 선택
  const handleSelectedCard = (name: string) => {
    setSelectedCard(name); // 선택된 카드 이름 업데이트
    setCard(name);
    setModified(true);
    //카드재선택->상태수정됨
  };

  // cardData 배열을 객체로 변환
  const cardDataMap = cardData.reduce(
    (acc, card) => {
      acc[card.name] = {
        frontImage: card.frontImage,
        backImage: card.backImage,
        width: card.width,
        height: card.height,
      };
      return acc;
    },
    {} as Record<
      string,
      { frontImage: string; backImage: string; width: number; height: number }
    >,
  );

  const cardSize = cardDataMap[selectedCard] || { width: 500, height: 1200 };
  const textareaStyle = {
    width: `${cardSize.width * 0.4}px`, // 너비의 90%
    height: `${cardSize.height * 0.23}px`, // 높이의 60%
  };

  //덕담 입력
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    console.log(content);
    setModified(true);
    //덕담입력재수정-> 상태수정됨
  };

  //다음 버튼
  const handleNextClick = async () => {
    if (!content?.trim()) {
      alert("덕담을 입력해주세요!");
      return;
    }

    if (!selectedCard) {
      alert("카드를 선택해주세요!");
      return;
    }

    setCard(selectedCard); // 선택된 카드 이름 저장

    try {
      if (isModified && questionCustomId) {
        // 수정 상태 && questionCustomId 존재 시 postEdit 호출
        const response = await postEdit(
          title,
          answers,
          correctAnswer,
          card,
          domain,
          content,
        );
        console.log("문제 수정 완료:", response);
        alert("복주머니가 수정되었습니다!");
      } else {
        // 새 문제 등록 시 submitCustomQuestion 호출
        const response = await submitCustomQuestion(
          title,
          answers,
          correctAnswer,
          card,
          domain,
          content,
        );
        console.log("POST 성공:", response);
      }

      setStep(4);
      router.push(`/pockets/complete?questionId=${questionCustomId}`);
    } catch (error) {
      console.error("POST 요청 실패:", error);
      alert("복주머니를 만드는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <Header>
        <BackButton
          onClick={async () => {
            if (questionCustomId) {
              buttonBackClick(questionCustomId); // 데이터 가져오기 및 상태 업데이트
              history.back();
            } else {
              history.back(); // 단순 뒤로 가기
            }
          }}
        />
      </Header>
      <div className="p-4 bg-white px-8">
        <Notice text="새해 덕담을 작성해주세요!" />

        {/* 카드 리스트 */}
        <CardList selectedCard={selectedCard} onSelect={handleSelectedCard} />

        {/* 카드 디스플레이 */}
        <FlippingCard
          frontImg={cardDataMap[selectedCard]?.frontImage}
          backImg={cardDataMap[selectedCard]?.backImage}
          frontButtonText="덕담 입력하기"
          inputTextLength={content?.length || 0}
        >
          <textarea
            value={content || ""}
            onChange={handleContentChange}
            className="w-full h-full border-none outline-none text-[15px] ml-2"
            placeholder="덕담을 입력하세요"
            style={textareaStyle}
          />
        </FlippingCard>

        {/* 다음 버튼 */}
        <div className="flex justify-end mt-6">
          <button className="next-btn" onClick={handleNextClick}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Letter;
