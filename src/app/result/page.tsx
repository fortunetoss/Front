//questionCustomId 가 채워져있다면 결과지를 보여줘야 함

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchResultData, ResultData } from "../../api/api-result";


const Result = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();


    // questionCustomId 가져오기
    const questionCustomId = searchParams.get("questionCustomId");

    useEffect(() => {
        if (!questionCustomId) {
            setError("api 통신 오류");
            return;
        }

        const fetchResult = async () => {
            try {
                const data = await fetchResultData(questionCustomId);
                setResultData(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
        console.log(fetchResultData)
    }, [questionCustomId]);


    return (
        <div className="container mx-auto p-6">
            {/* 정답 */}
            <div className=" p-4 rounded-md mb-10 text-center">
                <p className="text-3xl mb-10 mt-10">{resultData?.questionTitle}</p>
                <div className="rounded-3xl inline-block bg-blue px-4 py-2">
                    <p className="text-white text-xl">정답: {resultData?.answer}</p>
                </div>

            </div>

            {/* 선택지 1 */}
            <div className="p-4 rounded-md flex items-center space-x-4 mb-4">
                <p className="text-gray-700 text-xl w-16">{resultData?.select1 || "선택지 1"}</p>
                <div className="relative flex-1 bg-gray-200 rounded-full h-6">
                    <div
                        className={`absolute h-6 rounded-full ${
                            resultData?.select1 === resultData?.answer ? "bg-blue" : "bg-yellow-400"
                        }`}
                        style={{
                            width: `${resultData?.select1per || 0}%`,
                            transition: "width 1s ease-in-out",
                        }}
                    ></div>
                    <span
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white">
                        {resultData?.select1per || 0}%
                    </span>
                </div>
                <p className="text-gray-700 text-xl w-12">{resultData?.select1cnt || 0}명</p>
            </div>
            {/* 선택지2 */}
            <div className="p-4 rounded-md flex items-center space-x-4 mb-4">
                <p className="text-gray-700 text-xl w-16">{resultData?.select2 || "선택지 2"}</p>
                <div className="relative flex-1 bg-gray-200 rounded-full h-6">
                    <div
                        className={`absolute h-6 rounded-full ${
                            resultData?.select1 === resultData?.answer ? "bg-blue" : "bg-yellow-400"
                            // 선택지가 정답일 때는 파란색,정답이 아닐 때는 노란색
                            
                        }`}
                        style={{
                            width: `${resultData?.select1per || 0}%`,
                            transition: "width 1s ease-in-out",
                        }}
                    ></div>
                    <span
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white">
                        {resultData?.select1per || 0}%
                    </span>
                </div>
                <p className="text-gray-700 text-xl w-12">{resultData?.select1cnt || 0}명</p>
            </div>


            {/* 선택지3 */}
            <div className="p-4 rounded-md flex items-center space-x-4 mb-4">
                <p className="text-gray-700 text-xl w-16">{resultData?.select3 || "선택지 3"}</p>
                <div className="relative flex-1 bg-gray-200 rounded-full h-6">
                    <div
                        className={`absolute h-6 rounded-full ${
                            resultData?.select1 === resultData?.answer ? "bg-blue" : "bg-yellow-400"
                        }`}
                        style={{
                            width: `${resultData?.select1per || 0}%`,
                            transition: "width 1s ease-in-out",
                        }}
                    ></div>
                    <span
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white">
                        {resultData?.select1per || 0}%
                    </span>
                </div>
                <p className="text-gray-700 text-xl w-12">{resultData?.select1cnt || 0}명</p>
            </div>

            {/* 선택지4 */}
            <div className="p-4 rounded-md flex items-center space-x-4 mb-4">
                <p className="text-gray-700 text-xl w-16">{resultData?.select4 || "선택지 4"}</p>
                <div className="relative flex-1 bg-gray-200 rounded-full h-6">
                    <div
                        className={`absolute h-6 rounded-full ${
                            resultData?.select1 === resultData?.answer ? "bg-blue" : "bg-yellow-400"
                        }`}
                        style={{
                            width: `${resultData?.select1per || 0}%`,
                            transition: "width 1s ease-in-out",
                        }}
                    ></div>
                    <span
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white">
                        {resultData?.select1per || 0}%
                    </span>
                </div>
                <p className="text-gray-700 text-xl w-12">{resultData?.select1cnt || 0}명</p>
            </div>
        </div>
    );
};

export default Result;
