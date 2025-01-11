// 복주머니가 공유되었어요 페이지


"use client";

import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";


const Shared = () => {
    const router = useRouter();

    const handleMovePockets=() => {
        router.push("/pockets");
    }

    return (
        <div className="container mx-auto p-4">
            <h1>복주머니가 공유되었어요 ! </h1>

            <div className="mt-6 text-gray-700 text-center">
                <p className="text-xl">
                    복나누미가 되어 친구에게 공유해보세요!
                </p>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 text-lg font-medium text-gray-700 border-2 border-gray-400 rounded-lg hover:bg-gray-100 transition"
                >
                    다른 문제 내러가기
                </button>
                <button
                    onClick={handleMovePockets}
                    className="px-6 py-3 text-lg font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                    홈으로 이동
                </button>
            </div>

        </div>
    );
};

export default Shared;
