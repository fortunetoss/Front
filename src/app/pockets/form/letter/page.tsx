"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import usePocketStore from "../../../store/usePocket"; // Zustand 가져오기
import Notice from "@/app/components/notice";

const Content = () => {
    const router = useRouter();
    const { pocketIndex, setContent } = usePocketStore(); // Zustand 상태 가져오기
    const [letter, setLetterInput] = useState<string>(""); // 덕담 상태
    const [selectedCard, setSelectedCard] = useState<number | null>(null); // 선택된 카드

    // 카드 리스트 정의
    const CARDS = ["카드1", "카드2", "카드3", "카드4", "카드5", "카드6" ];

    function setContentInput(value: string) {

    }

    // 덕담 변경 핸들러
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContentInput(e.target.value);
    };

    // 카드 선택 핸들러
    const handleSelectedCard = (index: number) => {
        setSelectedCard(index); // 선택된 카드 업데이트
    };

    const handleNextClick = () => {
        if (selectedCard === null) {
            alert("카드를 선택해주세요!");
            return;
        }

        if (!letter.trim()) {
            alert("덕담을 입력해주세요!");
            return;
        }

        // Zustand에 덕담 저장
        setContent(letter);

        // Complete 페이지로 이동
        router.push(`/pockets/complete`);
    };

    return (
        <div className="container mx-auto p-4">
            <Notice text="문제와 함께 보낼 덕담을 작성해주세요!" />

            {/* 카드 선택 */}
            <div className="overflow-x-auto whitespace-nowrap flex gap-10 mb-8">
                {CARDS.map((card, index) => (
                    <div
                        key={index}
                        className={`inline-block min-w-[160px] p-8 border-2 rounded-xl cursor-pointer ${
                            selectedCard === index
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white"
                        }`}
                        onClick={() => handleSelectedCard(index)}
                    >
                        {card}
                    </div>
                ))}
            </div>

            {/* 덕담 입력 */}
            <div className="mb-4">
                <input
                    type="text"
                    value={letter}
                    onChange={handleContentChange}
                    placeholder="덕담을 입력하세요"
                    className="w-full bg-gray-200 placeholder-black text-center p-40 rounded-md"
                />
            </div>

            {/* 덕담 미리보기 */}
            {letter && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-700">
                    <strong>카드에 적힐 덕담:</strong> {letter}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="text-red-700 px-4 py-2 rounded text-xl"
                    onClick={handleNextClick}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default Content;
