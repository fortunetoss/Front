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
            <div className="bg-blue-100 p-4 rounded-md mb-6 text-center">
                <p className="text-lg font-semibold">{resultData?.title}문제:</p>
                <div className="bg-blue p-4 mt-3 rounded-3xl">
                    <p className="text-white  ">{resultData?.answer}정답:</p>
                </div>

            </div>

            {/* 선택지 1 */}
            <div className="border p-4 rounded-md mb-4">
                <p className="text-gray-700">{resultData?.select1 || "선택지 1"}</p>
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div
                        className={`h-4 rounded-full ${
                            resultData?.select1 === resultData?.answer ? "bg-blue-400" : "bg-yellow-400"
                        }`}
                        style={{width: `${resultData?.select1per || 0}%`}}
                    ></div>
                </div>
                <p className="text-sm text-gray-500">
                    {resultData?.select1per || 0}% ({resultData?.select1cnt || 0}명)
                </p>
            </div>

            {/* 선택지 2 */}
            <div className="border p-4 rounded-md mb-4">
                <p className="text-gray-700">{resultData?.select2 || "선택지 2"}</p>
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div
                        className={`h-4 rounded-full ${
                            resultData?.select2 === resultData?.answer ? "bg-blue-400" : "bg-yellow-400"
                        }`}
                        style={{width: `${resultData?.select2per || 0}%`}}
                    ></div>
                </div>
                <p className="text-sm text-gray-500">
                    {resultData?.select2per || 0}% ({resultData?.select2cnt || 0}명)
                </p>
            </div>

            {/* 선택지 3 */}
            <div className="border p-4 rounded-md mb-4">
                <p className="text-gray-700">{resultData?.select3 || "선택지 3"}</p>
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div
                        className={`h-4 rounded-full ${
                            resultData?.select3 === resultData?.answer ? "bg-blue-400" : "bg-yellow-400"
                        }`}
                        style={{width: `${resultData?.select3per || 0}%`}}
                    ></div>
                </div>
                <p className="text-sm text-gray-500">
                    {resultData?.select3per || 0}% ({resultData?.select3cnt || 0}명)
                </p>
            </div>

            {/* 선택지 4 */}
            <div className="border p-4 rounded-md mb-4">
                <p className="text-gray-700">{resultData?.select4 || "선택지 4"}</p>
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div
                        className={`h-4 rounded-full ${
                            resultData?.select4 === resultData?.answer ? "bg-blue-400" : "bg-yellow-400"
                        }`}
                        style={{width: `${resultData?.select4per || 0}%`}}
                    ></div>
                </div>
                <p className="text-sm text-gray-500">
                    {resultData?.select4per || 0}% ({resultData?.select4cnt || 0}명)
                </p>
            </div>
        </div>
    );
};

export default Result;
