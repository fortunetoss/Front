"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation"; // URL 경로 가져오기
import { FaFlag } from "react-icons/fa"; // 깃발 아이콘

const Complete = () => {
    const pathname = usePathname(); // 현재 경로 가져오기
    const pocketIndex = pathname.split("/")[2]; // 경로에서 복주머니 인덱스 추출

    return (
        <div className="container mx-auto p-4">
            {/* 안내 메시지 */}
            <div className="flex items-center space-x-3 bg-gray-100 mb-10 p-5">
                <FaFlag className="text-gray-500"/>
                <span className="text-gray-600 text-xl">

                    전달할 복주머니가 완성되었습니다!
                    복나누미가 되어 문제를 맞출 친구한테 공유해보세요!
                </span>

            </div>
            <div className="flex justify-center space-x-4 mt-8">
                <button className="px-6 py-3 text-lg font-medium text-gray-700 border-2 border-gray-400 rounded-lg hover:bg-gray-100 transition">
                    이전
                </button>
                <button
                    className="px-6 py-3 text-lg font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                    공유하기
                </button>

            </div>
        </div>
    );
};

export default Complete;
