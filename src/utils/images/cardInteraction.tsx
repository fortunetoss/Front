import React from "react";
import Image from "next/image";
import { cardImages, cardBackImages } from "../images/image";

interface CardInteractionProps {
    isFlipped: boolean; // 카드 뒤집힘 상태
    selectedCard: number; // 선택된 카드 인덱스
    onFlip: () => void; // 카드 뒤집기 함수
}

const CardInteraction: React.FC<CardInteractionProps> = ({
                                                             isFlipped,
                                                             selectedCard,
                                                             onFlip,
                                                         }) => {
    return (
        <div className="relative flex justify-center items-center mt-10">
            {/* 선택된 카드 */}
            <div
                className="relative w-60 max-w-md h-[90vh] max-h-screen cursor-pointer transition-transform duration-300"
                onClick={onFlip} // 카드 클릭 시 뒤집기 실행
            >
                <Image
                    src={isFlipped ? cardBackImages[selectedCard] : cardImages[selectedCard]}
                    alt="Selected Card"
                    className="w-full h-full  rounded-lg shadow-lg"
                    width={500}
                    height={800}
                />
            </div>

            {/* 덕담 입력 (카드 위에 표시되는 텍스트 입력) */}
            {isFlipped && (
                <input
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-40 p-2 text-center text-gray-700 bg-opacity-70  rounded-md outline-none z-20"
                    placeholder="카드에 적을 덕담을 입력하세요"
                />
            )}
        </div>
    );
};

export default CardInteraction;
