//questionCustomId 가 채워져있다면 결과지를 보여줘야 함

"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {fetchResultData, ResultData} from "../../api/api-result";
import ResultModal from "../../components/result/resultModal";
//import {ValidateResult} from "@/components/result/resultValidation";
import {fetchRightAnswers, fetchWrongAnswers} from "@/api/api-result-data";
import useResultStore from "@/app/store/useResultStore";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";
import ShareButton from "@/components/header/share-button";
import Overlay from "@/components/result/Overlay";
import useShareHandlers from "@/utils/url/useShare";
import ShareModal from "@/components/modal/share-modal";


const Result = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const searchParams = useSearchParams();
    const [isOverlay, setIsOverlay] = useState(false);
    const {setRightSolvers, setWrongSolvers, RightSolvers, WrongSolvers} = useResultStore();


    // questionCustomId 가져오기
    const questionCustomId = searchParams.get("questionCustomId");
    const {handleCopyUrl, handleKakaoShare} = useShareHandlers(questionCustomId);

    useEffect(() => {
        const fetchResult = async () => {
            if (!questionCustomId) {
                return;
            }
            try {
                const result = await fetchResultData(questionCustomId);
                setResultData(result);


                if (result.total === 0) {
                    setIsOverlay(true);
                }

                const [wrongSolversData, rightSolversData] = await Promise.all([
                    fetchWrongAnswers(questionCustomId),
                    fetchRightAnswers(questionCustomId, result.answer),
                ]);

                setWrongSolvers(wrongSolversData);
                setRightSolvers(rightSolversData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchResult();
    }, [questionCustomId]);


    const handleOpenModal = () => {
        setIsModalOpen(true);

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenShareModal = () => {
        setIsShareModalOpen(true);
    }
    const handleCloseShareModal = () => {
        setIsShareModalOpen(false);
    }


    return (
        <>
            <div>
                {(() => {
                    if (isOverlay) {
                        return (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-40 z-10 flex justify-between "
                                onClick={() => setIsOverlay(false)}
                            >
                                <div className="relative w-full max-w-screen-lg mt-4 flex justify-center">

                                    <div className="absolute top-16 left-1/2 bg-white rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg px-7 py-3">
                                        <p className="text-gray-800 text-sm md:text-base lg:text-lg text-center">
                                            아직 문제를 푼 사람이 없어요! <br/> 공유하기로 문제를 보내보세요
                                        </p>
                                        <div
                                            className="absolute -top-2 right-9 transform -translate-x-1/3 w-4 h-4 bg-white rotate-45"></div>

                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })()}
            </div>
            <Header>
                <BackButton/>
                <ShareButton
                    onClick={() => {
                        setIsShareModalOpen(true);
                    }}
                />
            </Header>
            <div className="container mx-auto p-6">
                {/* 정답 */}
                <div className="p-4 rounded-md mb-10 text-center">
                    <p className="text-3xl mb-10 mt-10">{resultData?.questionTitle}</p>
                    <div className="rounded-3xl inline-block bg-blue px-4 py-2">
                        <p className="text-white text-xl">정답: {resultData?.answer}</p>
                    </div>
                </div>

                {/* 선택지 컨테이너 */}
                <div
                    className="p-6  cursor-pointer  transition"
                    onClick={handleOpenModal} // 클릭하면 모달 열기
                >
                    {/* 선택지 1 */}
                    <div className="p-4 rounded-md flex items-center space-x-4 mb-4">
                        <p className="text-gray-700 text-xl w-16">{resultData?.select1 || "선택지 1"}</p>
                        <div className="relative flex-1 bg-gray-200 rounded-full h-6">
                            <div
                                className={`absolute h-6 rounded-full ${resultData?.select1 === resultData?.answer ? "bg-blue" : "bg-yellow-400"}`}
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

                    {/* 선택지 2 */}
                    <div className="p-4 rounded-md flex items-center space-x-4 mb-4">
                        <p className="text-gray-700 text-xl w-16">{resultData?.select2 || "선택지 2"}</p>
                        <div className="relative flex-1 bg-gray-200 rounded-full h-6">
                            <div
                                className={`absolute h-6 rounded-full ${resultData?.select2 === resultData?.answer ? "bg-blue" : "bg-yellow-400"}`}
                                style={{
                                    width: `${resultData?.select2per || 0}%`,
                                    transition: "width 1s ease-in-out",
                                }}
                            ></div>
                            <span
                                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white">
                                    {resultData?.select2per || 0}%
                                </span>
                        </div>
                        <p className="text-gray-700 text-xl w-12">{resultData?.select2cnt || 0}명</p>
                    </div>

                    {/* 선택지 3 */}
                    <div className="p-4 rounded-md flex items-center space-x-4 mb-4">
                        <p className="text-gray-700 text-xl w-16">{resultData?.select3 || "선택지 3"}</p>
                        <div className="relative flex-1 bg-gray-200 rounded-full h-6">
                            <div
                                className={`absolute h-6 rounded-full ${resultData?.select3 === resultData?.answer ? "bg-blue" : "bg-yellow-400"}`}
                                style={{
                                    width: `${resultData?.select3per || 0}%`,
                                    transition: "width 1s ease-in-out",
                                }}
                            ></div>
                            <span
                                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white">
                                    {resultData?.select3per || 0}%
                                </span>
                        </div>
                        <p className="text-gray-700 text-xl w-12">{resultData?.select3cnt || 0}명</p>
                    </div>

                    {/* 선택지 4 */}
                    <div className="p-4 rounded-md flex items-center space-x-4 mb-4">
                        <p className="text-gray-700 text-xl w-16">{resultData?.select4 || "선택지 4"}</p>
                        <div className="relative flex-1 bg-gray-200 rounded-full h-6">
                            <div
                                className={`absolute h-6 rounded-full ${resultData?.select4 === resultData?.answer ? "bg-blue" : "bg-yellow-400"}`}
                                style={{
                                    width: `${resultData?.select4per || 0}%`,
                                    transition: "width 1s ease-in-out",
                                }}
                            ></div>
                            <span
                                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white">
                                    {resultData?.select4per || 0}%
                                </span>
                        </div>
                        <p className="text-gray-700 text-xl w-12">{resultData?.select4cnt || 0}명</p>
                    </div>
                </div>


                <ResultModal isOpen={isModalOpen} onClose={handleCloseModal}/>

            </div>
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={handleCloseShareModal} // 닫기 핸들러
                onKakaoShare={handleKakaoShare} // 카카오톡 공유 핸들러
                onCopyUrl={handleCopyUrl} // URL 복사 핸들러
            />
        </>

    );
};

export default Result;
