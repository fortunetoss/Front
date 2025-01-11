// 불러올 때 카카오톡 이랑 링크복사 버튼 각각에 링크 합입하면 될듯합니다

"use client";

import React from "react";
import { FaLink } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCopyUrl: () => void;
    onKakaoShare: () => void;
}

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         onCopyUrl,
                                         onKakaoShare,
                                     }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
            {/* 모달 컨테이너 */}
            <div className="bg-white rounded-2xl px-6 py-4 w-11/12 max-w-3xl shadow-lg mb-10">
                {/* 헤더 */}
                <div className="relative flex items-center mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mx-auto">공유하기</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* 컨텐츠 */}
                <div className="space-y-4">
                    {/* 카카오톡 공유 */}
                    <button
                        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-200"
                        onClick={onKakaoShare}
                    >
                        <IoChatbubbleEllipses className="text-yellow-600 mr-3 text-2xl" />
                        <span className="text-gray-600 font-semibold">카카오톡</span>
                    </button>

                    {/* 링크 복사 */}
                    <div className="pb-5 ">
                        <button
                            className="flex items-center w-full px-4 py-3  rounded-lg hover:bg-gray-200"
                            onClick={onCopyUrl}
                        >
                            <FaLink className="text-gray-600 mr-3 text-2xl" />
                            <span className="text-gray-600 font-semibold">링크 복사</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
