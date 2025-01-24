"use client";

import Link from "next/link";
import ShareModal from "../modal/share-modal";
import { useState } from "react";
import { kakaotalkShare } from "@/utils/share/kakaotalk-share";
import useAnswererStore from "@/store/answerer";

export default function AnswererFinalActions() {
  const [isOpen, setIsOpen] = useState(false);
  const { answerId, pouchType } = useAnswererStore();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCopyUrl = () => {
    if (answerId) {
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_URL}/result-share/${answerId}`)
        .then(() => alert("URL이 클립보드에 복사되었습니다!"))
        .catch((err) => console.error("URL 복사 실패:", err));
    }
  };

  const onKakaoShare = () => {
    if (answerId) {
      kakaotalkShare(
        `${process.env.NEXT_PUBLIC_URL}/result-share/${answerId}`,
        { isAnswerer: true, pouchType }
      );
    }
  };

  return (
    <section className="flex flex-col gap-[14px]">
      <Link href="/" className="broad-btn">
        나도 문제 내러가기
      </Link>
      <button className="broad-btn" onClick={handleOpenModal}>
        내 결과 공유하기
      </button>
      <ShareModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onCopyUrl={handleCopyUrl}
        onKakaoShare={onKakaoShare}
      />
    </section>
  );
}
