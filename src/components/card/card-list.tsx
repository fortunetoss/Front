// 카드 리스트 가져오고
// 상단 카드 목록 관리

import React from "react";
import { cardData } from "@/data/card-names";

interface CardListProps {
  selectedCard: string; // 선택된 카드 이름
  onSelect: (name: string) => void; // 카드 이름 선택 핸들러
}

const CardList: React.FC<CardListProps> = ({ selectedCard, onSelect }) => {
  return (
    <div className="flex justify-between gap-2 mb-10 ">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`h-20 cursor-pointer border-2 rounded-md ${
            selectedCard === card.name ? "border-blue" : "border-transparent"
          }`}
          onClick={() => onSelect(card.name)} // 카드 이름 전달
        >
          <img
            src={card.frontImage} // 앞면 이미지를 사용
            alt={`Card ${card.name}`}
            className="w-full h-full rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
