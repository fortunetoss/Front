"use client";

import { useState } from "react";
import Image from "next/image";
import flipIcon from "@/assets/icons/flip.svg";

interface FlippingCardProps {
  frontImg: string;
  backImg: string;
  frontButtonText: string;
  inputTextLength?: number;
  children: React.ReactNode;
}

export default function FlippingCard({
  frontImg,
  backImg,
  frontButtonText,
  inputTextLength,
  children,
}: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleCardFlip();
    }
  };

  return (
    <article className={`card ${isFlipped ? "flipped" : ""}`}>
      <section
        className="card-front"
        style={{ backgroundImage: `url(${frontImg})` }}
      >
        <button
          onClick={handleCardFlip}
          className="bg-blue px-[14px] py-2 mb-5 rounded-full text-sm text-white font-bold"
        >
          {frontButtonText}
        </button>
      </section>
      <section
        className="card-back"
        style={{
          backgroundImage: `url(${backImg})`,
        }}
      >
        <Image
          alt="카드 앞면으로 뒤집기"
          src={flipIcon}
          width={24}
          height={24}
          className="absolute top-7 left-5 cursor-pointer"
          onClick={handleCardFlip}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        />
        <p className="absolute top-[84px] w-full px-7">{children}</p>
        {inputTextLength !== undefined && (
          <div className="absolute bottom-3 font-medium text-[13px] text-[#848588]">
            {inputTextLength}/150
          </div>
        )}
      </section>
    </article>
  );
}
