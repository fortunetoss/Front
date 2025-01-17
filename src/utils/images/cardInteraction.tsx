import React from "react";
import Image from "next/image";
import {cardData} from "../../utils/images/cardNames";

interface CardInteractionProps {
    isFlipped: boolean; // 카드 뒤집힘 상태
    selectedCard: string; // 선택된 카드 이름
    onFlip: () => void; // 카드 뒤집기 핸들러
    onContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 덕담 입력 핸들러

}


const CardInteraction: React.FC<CardInteractionProps> = ({
                                                             isFlipped,
                                                             selectedCard, // 초기값 설정
                                                             onFlip,
                                                             onContentChange
                                                         }) => {
    // 선택된 카드 데이터
    const card = cardData.find((c) => c.name === selectedCard);

    return (
        <div className="relative flex justify-center items-center mt-10">
            {/* 선택된 카드 */}
            <div
                className="relative cursor-pointer transition-transform duration-300"
                onClick={onFlip} // 카드 클릭 시 뒤집기 실행
            >
                <Image
                    src={isFlipped ? card.backImage : card.frontImage} // 앞면 또는 뒷면 이미지
                    alt={`카드 선택 ${selectedCard}`}
                    className=" rounded-lg shadow-lg"
                    width={card.width} // 기본 크기 설정
                    height={card.height} // 기본 크기 설정
                />
            </div>

            {/* 덕담 입력 (카드 위에 표시되는 텍스트 입력) */}
            {isFlipped && (
                <div
                    className="container absolute flex w-full h-full items-center justify-center "
                >
                    <textarea
                        className="w-[95%] max-w-[600px] text-2xl text-gray-700 outline-none resize-none px-2 py-16 text-center"
                        placeholder="덕담을 입력하세요"
                        onChange={(e) => {
                            onContentChange(e); // 부모 컴포넌트로 이벤트 전달
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CardInteraction;
