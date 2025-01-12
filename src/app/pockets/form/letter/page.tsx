"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Notice from "../../../../components/notice";
import usePocketStore from "../../../store/usePocket";
import CardList from "@/utils/images/cardList";
import CardInteraction from "@/utils/images/cardInteraction";
import { authApiClient } from "@/api/api-client";

// 문제 제출 - POST
const submitCustomQuestion = async (
    title: string,
    answers: string[],
    correctAnswer: string | null,
    content: string | null,
    domain: string,
    card: string
) => {
    try {
        const response = await authApiClient.post("/api/question", {
            title,
            select1: answers[0],
            select2: answers[1],
            select3: answers[2],
            select4: answers[3],
            answer: correctAnswer,
            content,
            domain,
            card,
        });

        console.log("POST 응답 데이터:", response.data);

        return response.data; // { questionCustomId, shape }
    } catch (error) {
        console.error("문제 제출 중 오류 발생:", error);
        throw new Error("문제 제출에 실패했습니다.");
    }
};

const Content = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const {
        question,
        answers,
        correctAnswer,
        setContent,
        setCard,
    } = usePocketStore(); // Zustand에서 상태 가져오기

    const [content, setContentInput] = useState<string>(""); // 덕담 상태
    const [selectedCard, setSelectedCard] = useState<number>(0); // 초기값: 첫 번째 카드
    const [isFlipped, setIsFlipped] = useState<boolean>(false); // 카드 뒤집힘 상태
    const [showButton, setShowButton] = useState<boolean>(false); // "덕담 작성하기" 버튼 표시 여부

    // 카드 선택
    const handleSelectedCard = (index: number) => {
        setSelectedCard(index); // 선택된 카드 업데이트
        setIsFlipped(false); // 카드가 다시 앞면으로 돌아가도록 초기화
        setShowButton(true); // "덕담 작성하기" 버튼 표시
    };

    // 카드 뒤집기
    const handleFlipCard = () => {
        setIsFlipped(true); // 카드 뒤집기
        setTimeout(() => inputRef.current?.focus(), 300); // 카드가 뒤집히고 텍스트 입력에 포커스
    };

    // 덕담 입력
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentInput(e.target.value);
    };

    // 다음 버튼 (POST 요청)
    const handleNextClick = async () => {
        if (!content.trim()) {
            alert("덕담을 입력해주세요!");
            return;
        }

        setContent(content); // Zustand에 덕담 저장
        setCard(`CARD_${selectedCard + 1}`); // Zustand에 카드 정보 저장

        const cardData = `CARD_${selectedCard + 1}`;

        try {
            // POST 요청 보내기
            const response = await submitCustomQuestion(
                question || "",
                answers,
                correctAnswer,
                content,
                "C", // domain
                cardData
            );

            console.log("POST 성공:", response);

            // 응답 데이터에서 questionCustomId와 shape 추출
            const { questionCustomId, shape } = response;

            // Complete 페이지로 이동
            router.push(`/pockets/complete?questionCustomId=${questionCustomId}&shape=${shape}`);
        } catch (error) {
            console.error("POST 요청 실패:", error);
            alert("복주머니를 만드는 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="p-4">
            <Notice text="새해 덕담을 작성해주세요" />

            {/* 카드 리스트 */}
            <CardList selectedCard={selectedCard} onSelect={handleSelectedCard} />

            {/* 카드 디스플레이 */}
            <div className="relative flex justify-center items-center">
                <CardInteraction
                    isFlipped={isFlipped}
                    selectedCard={selectedCard}
                    onFlip={handleFlipCard}
                />

                {/* 덕담 작성하기 버튼 */}
                {showButton && !isFlipped && (
                    <button
                        onClick={handleFlipCard}
                        className="absolute z-20 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
                    >
                        덕담 작성하기
                    </button>
                )}


            </div>

            {/* 다음 버튼 */}
            <div className="flex justify-end mt-6">
                <button
                    className="text-red-600 px-4 py-2 rounded-lg"
                    onClick={handleNextClick}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default Content;
