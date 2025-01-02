// 복주머니 선택 페이지
// 처음엔 8개의 복주머니 선택할 수 있고 각 복주머니 누르면
// form 페이지로 이동하게끔 한다.


"use client";

import React, { useState } from "react";
import {useRouter} from "next/navigation";


const Pockets = () => {
    const router = useRouter();
    const POCKETS = 8; // 기본 복주머니 갯수 = 8개

    const handlePocket = (index: number) => {
        router.push(`/pockets/${index}/form`);
    };

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-xl font-bold mb-10">복주머니 선택</h1>
            <p className="mb-4"> 복주머니 선택해주시오~~~</p>
            <div className="grid grid-cols-4  gap-6">
                {Array.from ({length:POCKETS}).map((_, index) => (
                    <div
                    key={index}
                    className="w-24 h-24 bg-red-200 text-black flex items-center justify-center rounded-full text-lg font-bold cursor-pointer hover:bg-red-300 transition"
                    onClick={() => handlePocket(index+1)}
                    >
                        {index+1}
                    </div>
                ))}
            </div>
        </div>

    )

}


export default Pockets;
