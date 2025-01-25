
// questionCustomId 가 채워져있다면 결과지를 보여줘야 함

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchResultData, ResultData } from "../../api/api-result";
import ResultModal from "../../components/result/resultModal";
import { fetchRightAnswers, fetchWrongAnswers } from "@/api/api-result-data";
import useResultStore from "@/app/store/useResultStore";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";
import ShareButton from "@/components/header/share-button";
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
  const { setRightSolvers, setWrongSolvers } = useResultStore();
  const router = useRouter();

  // questionCustomId 가져오기
  const questionCustomId = searchParams.get("questionCustomId");
  const { handleCopyUrl, handleKakaoShare } = useShareHandlers(questionCustomId);

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenShareModal = () => setIsShareModalOpen(true);
  const handleCloseShareModal = () => setIsShareModalOpen(false);

  // @ts-ignore
  return (
      <>
        <div>
          {isOverlay && (
              <div
                  className="fixed inset-0 bg-black bg-opacity-40 z-10 flex justify-between"
                  onClick={() => setIsOverlay(false)}
              >
                <div className="relative w-full max-w-screen-lg mt-4 flex justify-center">
                  <div className="absolute top-16 left-1/2 bg-white rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg px-7 py-3">
                    <p className="text-gray-800 text-sm md:text-base lg:text-lg text-center">
                      아직 문제를 푼 사람이 없어요! <br /> 공유하기로 문제를 보내보세요
                    </p>
                    <div className="absolute -top-2 right-11 transform -translate-x-1/3 w-4 h-4 bg-white rotate-45"></div>
                  </div>
                </div>
              </div>
          )}
        </div>
        <Header>
          <BackButton onClick={() => router.push("/pockets")} />
          <ShareButton onClick={handleOpenShareModal} />
        </Header>
        <div className="container mx-auto p-2 bg-white">
          {/* 정답 */}
          <div className="p-4 rounded-md mb-10 text-center">
            <p className="text-3xl mb-10 mt-10">{resultData?.questionTitle}</p>
            <div className="rounded-3xl inline-block bg-blue px-4 py-2">
              <p className="text-white text-xl font-semibold">정답: {resultData?.answer}</p>
            </div>
          </div>

          {/* 선택지 */}
          <div className="p-6 space-y-[32px] cursor-pointer transition" onClick={handleOpenModal}>
            {[1, 2, 3, 4].map((num) => (
                <div key={num} className="p-4 rounded-md flex items-center space-x-4">
                  <p className="text-gray-700 text-xl w-16">
                    {resultData?.[`select${num}`] || `선택지 ${num}`}
                  </p>
                  <div className="relative flex-1 bg-gray-200 rounded-full h-8">
                    <div
                        className={`absolute h-8 rounded-full ${
                            resultData?.[`select${num}`] === resultData?.answer
                                ? "bg-blue"
                                : "bg-yellow-400"
                        }`}
                        style={{
                          width: `${resultData?.[`select${num}per`] || 0}%`,
                          transition: "width 1s ease-in-out",
                        }}
                    ></div>
                    <span
                        className={`absolute top-1/2 transform -translate-y-1/2 text-sm font-medium ${
                            resultData?.[`select${num}per`] ||0 > 10 ? "text-gray-400" : "text-gray-400"
                        }`}
                        style={{
                          left: `${Math.min((resultData?.[`select${num}per`] || 0) + 2, 98)}%`, // 숫자를 약간 오른쪽으로 이동
                        }}
                    >
                                {resultData?.[`select${num}per`] || 0}%
                                </span>
                  </div>
                  <p className="text-gray-700 text-xl w-12">
                    {resultData?.[`select${num}cnt`] || 0}명
                  </p>
                </div>
            ))}
          </div>

          <ResultModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
        <ShareModal
            isOpen={isShareModalOpen}
            onClose={handleCloseShareModal}
            onKakaoShare={handleKakaoShare}
            onCopyUrl={handleCopyUrl}
        />
      </>
  );
};

export default Result;

