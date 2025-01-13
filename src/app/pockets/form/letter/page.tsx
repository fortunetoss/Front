"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Notice from "../../../../components/notice";
import usePocketStore from "../../../store/usePocket";
import CardList from "@/utils/images/cardList";
import CardInteraction from "@/utils/images/cardInteraction";
import { submitCustomQuestion } from "@/api/api-form";

const Letter = () => {
    const router = useRouter();
    const {
        title,
        answers,
        correctAnswer,
        content,
        setContent,
        setCard,
        domain,
    } = usePocketStore();

    const [selectedCard, setSelectedCard] = useState<number>(0);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    // 카드 선택 핸들러
    const handleSelectedCard = (index: number) => {
        setSelectedCard(index);
        setIsFlipped(false);
    };

    // 카드 뒤집기 핸들러
    const handleFlipCard = () => {
        setIsFlipped(true);
    };

    // 덕담 입력 핸들러
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    // 다음 버튼 핸들러
    const handleNextClick = async () => {
        if (!content?.trim()) {
            alert("덕담을 입력해주세요!");
            return;
        }

        const card = `CARD_${selectedCard + 1}`; // 선택한 카드 (A, B, C, D, E 중 하나)
        setCard(card);

        try {
            const { questionId, domain } = await submitCustomQuestion(
                title,
                answers,
                correctAnswer,
                content,
                domain,
                card
            );

            console.log("POST 성공:", { questionId, domain });
            router.push(`/pockets/complete?questionCustomId=${questionId}&domain=${domain}`);
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
            />

            {/* 덕담 입력 */}
            <textarea
                value={content || ""}
                onChange={handleContentChange}
                className="border rounded-lg w-full h-32 p-4"
                placeholder="새해 덕담을 작성하세요!"
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
