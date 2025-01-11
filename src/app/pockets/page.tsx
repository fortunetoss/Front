"use client";

import React from "react";
import { useRouter } from "next/navigation";
import usePocketStore from "../store/usePocket";
import Notice from "@/app/components/notice";

const Pockets = () => {
    const router = useRouter();
    const setPocketIndex = usePocketStore((state) => state.setPocketIndex);

    //pocketImage 는 백엔드에서 수정해주시면 수정해야겠다. .

    const pocketImages = [
        "복주머니-01.png",
        "복주머니-02.png",
        "복주머니-03.png",
        "복주머니-04.png",
        "복주머니-05.png",
        "복주머니-06.png",
        "복주머니-07.png",
        "복주머니-08.png",
    ];

    const handlePocket = (index: number) => {
        setPocketIndex(index);
        router.push(`/pockets/select?pocketIndex=${index}`);
    };

    return (
        // <div className="mx-auto  h-screen bg-white">
        <div className="container mx-auto p-10">
            <Notice text="문제를 내고 복주머니를 전달하세요!"/>
            <div className="grid grid-cols-2  gap-y-6">
                {pocketImages.map((fileName, index) => (
                    <div key={index} className="relative max-w-[200px] max-h-screen mx-auto">
                        <img
                            src={`/${fileName}`}
                            alt={`복주머니 ${index + 1}`}
                            className="max-w-[200px]  rounded-full"
                        />
                        <button
                            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 text-gray-600 text-2xl rounded-full z-10"
                            onClick={() => handlePocket(index + 1)}
                        >
                            문제내기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pockets;
