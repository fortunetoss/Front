// 불러올 때 카카오톡 이랑 링크복사 버튼 각각에 링크 합입하면 될듯합니다

"use client";

import React from "react";
import Image from "next/image";
import { FaLink } from "react-icons/fa";
import kakaoLogo from "@/assets/kakao-logo-yellow.svg";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyUrl: () => void;
  onKakaoShare: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onCopyUrl,
  onKakaoShare,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
      onClick={onClose}
    >
      {/* 모달 컨테이너 */}
      <div className="bg-white rounded-2xl px-4 py-8 w-11/12 max-w-sm shadow-lg mb-10">
        {/* 헤더 */}
        <div className="relative flex items-center mb-5">
          <h3 className="text-xl font-bold text-gray-800 mx-auto">공유하기</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl "
          >
            ✕
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="flex flex-col">
          {/* 카카오톡 공유 */}
          <button
            className="flex gap-[14px] items-center font-medium text-lg w-full px-4 py-3 rounded-lg hover:bg-gray-200"
            onClick={onKakaoShare}
          >
            <Image src={kakaoLogo} alt="카카오톡 로고" width={32} height={32} />
            카카오톡
          </button>

          {/* 링크 복사 */}
          <button
            className="flex gap-[14px] items-center w-full px-4 py-3 rounded-lg hover:bg-gray-200"
            onClick={onCopyUrl}
          >
            <div className="w-8 h-8 flex justify-center items-center">
              <FaLink className="text-gray-600 w-5 h-5" />
            </div>
            <span className="font-medium text-lg">링크 복사</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
