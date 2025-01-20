"use client";

import Link from "next/link";
import ShareModal from "../modal/share-modal";
import { useState } from "react";
import { kakaotalkShare } from "@/utils/share/kakaotalk-share";

export default function AnswererFinalActions() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCopyUrl = () => {};

  const onKakaoShare = () => {
    // 경로에 응답 id 뒤에 붙이기
    kakaotalkShare(`${process.env.NEXT_PUBLIC_URL}/share-result/`, true);
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
