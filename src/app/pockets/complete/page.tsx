"use client";

import React, { useEffect, useState } from "react";
import Notice from "@/app/components/notice";
import axios from "axios";

const Complete = () => {
    // Zustand 상태 기반 코드 주석 처리 (백엔드 통신으로 대체)
    /*
    const { pocketIndex, correctAnswer, finalUrl, question, answers, content, setFinalUrl } = usePocketStore();

    useEffect(() => {
        if (!finalUrl) {
            // Zustand의 상태를 기반으로 최종 URL 생성
            const generatedUrl = `/pockets/complete?pocketIndex=${pocketIndex}&question=${encodeURIComponent(
                question || ""
            )}&answers=${encodeURIComponent(JSON.stringify(answers || []))}&correctAnswer=${encodeURIComponent(
                correctAnswer || ""
            )}${letter ? `&letter=${encodeURIComponent(letter)}` : ""}`;
            setFinalUrl(generatedUrl); // Zustand에 저장
        }
    }, [pocketIndex, question, answers, correctAnswer, content, finalUrl, setFinalUrl]);
    */

    const [shareableUrl, setShareableUrl] = useState<string | null>(null);

    useEffect(() => {
        // 백엔드에서 questionId 받아오기
        const fetchQuestionId = async () => {
            try {
                // 예시 API 요청 - 백엔드에서 questionId를 받아옴
                const response = await axios.get("http://localhost:8080/api/questionId"); // 실제 API 엔드포인트로 변경
                const { questionId } = response.data;

                if (questionId) {
                    // 공유 가능한 URL 생성
                    const generatedUrl = `${window.location.origin}/${questionId}`;
                    setShareableUrl(generatedUrl); // 공유 가능한 URL 저장
                }
            } catch (error) {
                console.error("questionId 가져오기 실패:", error);
            }
        };

        fetchQuestionId();
    }, []);

    // URL 복사 핸들러
    const handleCopyUrl = () => {
        if (shareableUrl) {
            navigator.clipboard
                .writeText(shareableUrl)
                .then(() => alert("URL이 클립보드에 복사되었습니다!"))
                .catch((err) => console.error("URL 복사 실패:", err));
        } else {
            alert("공유 가능한 URL이 없습니다.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Notice text="복주머니가 완성되었어요!" />
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
                    이전
                </button>
                <button
                    onClick={handleCopyUrl}
                    className="px-6 py-3 text-lg font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                    공유하기
                </button>
            </div>
            {shareableUrl && (
                <div className="mt-8 text-center text-sm text-gray-600">
                    공유할 URL: <a href={shareableUrl} className="text-blue-500">{shareableUrl}</a>
                </div>
            )}
        </div>
    );
};

export default Complete;
