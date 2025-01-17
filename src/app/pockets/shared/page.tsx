// 복주머니가 공유되었어요 페이지


"use client";

import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import Notice from "../../../components/notice";


const Shared = () => {
    const router = useRouter();

    const handleMovePockets=() => {
        router.push("/pockets");
    }

    return (
        <div className="container flex flex-col mx-auto p-4">
            <Notice text="복주머니가 공유되었어요!"></Notice>
            <p className="mt-10 mb-10 text-9xl justify-center mx-auto">
                🥳
            </p>


            <div className="mt-6 text-gray-700 text-center">

            </div>
            <div className="flex justify-center flex-col mt-8">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 text-lg font-medium text-blue border-2 border-blue rounded-lg hover:bg-blue  hover:text-white transition"
                >
                    다른 문제 내러가기
                </button>
                {/*
                <button
                    onClick={handleMovePockets}
                    className="px-6 py-3 mt-3 text-lg font-medium text-black border-gray-400 border-2 bg-white rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                >
                    홈으로 이동
                </button>
                */}
            </div>

        </div>
    );
};

export default Shared;
