"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // URL 경로 가져오기
import { FaFlag } from "react-icons/fa"; // 깃발 아이콘

const Letter = () => {
    const pathname = usePathname(); // 현재 경로 가져오기
    const pocketIndex = pathname.split("/")[2]; // 경로에서 복주머니 인덱스 추출
    const router = useRouter(); // 페이지 이동 라우터
    const [letter, setLetter] = useState<string>(""); // 덕담
    const [selectedCard, setSelectedCard] = useState<number | null>(null); // 선택된 카드

    // 카드 리스트 정의
    const CARDS = ["카드1", "카드2", "카드3", "카드4", "카드5", "카드6", "카드7", "카드8"];

    // 덕담 변경 핸들러
    const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLetter(e.target.value);
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

        // 페이지 이동
        router.push(`/pockets/${pocketIndex}/form/letter/complete`);
    };


    return (
        <div className="container mx-auto p-4">
            {/* 안내 메시지 */}
            <div className="flex items-center space-x-3 bg-gray-100 mb-10 p-5">
                <FaFlag className="text-gray-500"/>
                <span className="text-gray-600 text-xl">
          문제와 함께 보낼 덕담을 작성해주세요!
        </span>
            </div>

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
                    onChange={handleLetterChange}
                    placeholder="덕담을 입력하세요"
                    className="w-full bg-gray-200 placeholder-black text-center p-40 rounded-md"
                />
            </div>

            {/* 덕담 표시
            이 부분 나중에 복주머니 넣어서 실시간으로 복주머니에 어떻게 작성이 되어지는ㄴ지 보여줄 예정
            카드 선택 -> 덕담 선택 그 카드에 적힐 내용*/}
            {letter && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-700">
                    <strong>카드에 적힐 덕담:</strong> {letter}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className=" text-red-700 px-4 py-2 rounded text-xl "
                    onClick={handleNextClick}


                >
                    다음
                </button>
            </div>
        </div>


    );
};

export default Letter;
