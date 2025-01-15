"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Notice from "../../../../components/notice";
import usePocketStore from "../../../store/usePocket";
import CardList from "../../../../utils/images/cardList";
import CardInteraction from "../../../../utils/images/cardInteraction";
import { cardData } from "../../../../utils/images/cardNames";
import { submitCustomQuestion } from "../../../../api/api-form";

const Letter = () => {
    const router = useRouter();
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

    const [selectedCard, setSelectedCard] = useState<string>("A"); // 선택된 카드 이름 저장
    const [isFlipped, setIsFlipped] = useState<boolean>(false); // 카드 뒤집기 상태

    // 카드 선택 핸들러
    const handleSelectedCard = (name: string) => {
        setSelectedCard(name); // 선택된 카드 이름 업데이트
        setIsFlipped(false); // 카드 뒤집기 초기화
    };

    // 카드 뒤집기 핸들러
    const handleFlipCard = () => {
        setIsFlipped(true);
    };

    // 덕담 입력 핸들러
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
        console.log(content);
    };

    // 다음 버튼 핸들러
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
            const { questionId } = await submitCustomQuestion(
                title,
                answers,
                correctAnswer,
                card,
                domain,
                content
            );

            console.log("POST 성공:", { questionId });
            setStep(4);
            router.push(`/pockets/complete?questionId=${questionId}`);
        } catch (error) {
            console.error("POST 요청 실패:", error);
            alert("복주머니를 만드는 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="p-4">
            <Notice text="새해 덕담을 작성해주세요!" />

            {/* 카드 리스트 */}
            <CardList selectedCard={selectedCard} onSelect={handleSelectedCard} />

            {/* 카드 디스플레이 */}
            <CardInteraction
                isFlipped={isFlipped}
                selectedCard={selectedCard}
                onFlip={handleFlipCard}
                onContentChange={handleContentChange}

            />


            {/* 다음 버튼 */}
            <div className="flex justify-end mt-6">
                <button
                    className="text-red-600 px-4 py-2 rounded-lg"
                    onClick={handleNextClick}
                >
                    완료
                </button>
            </div>
        </div>
    );
};

export default Letter;
