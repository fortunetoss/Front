// 카드 리스트 가져오고
// 상단 카드 목록 관리


import React from "react";
import { cardImages } from "../images/image";

interface CardListProps {
    selectedCard: number;
    onSelect: (index: number) => void;
}

const CardList: React.FC<CardListProps> = ({ selectedCard, onSelect }) => {
    return (
        <div className="flex  justify-center gap-8 mb-10 ">
            {cardImages.map((image, index) => (
                <div
                    key={index}
                    className={`w-10 h-32 cursor-pointer border-2 rounded-md ${
                        selectedCard === index ? "border-blue" : "border-transparent"
                    }`}
                    onClick={() => onSelect(index)}
                >
                    <img
                        src={image}
                        alt={`Card ${index + 1}`}
                        className="w-full h-full  rounded-md"
                    />
                </div>
            ))}
        </div>
    );
};

export default CardList;
