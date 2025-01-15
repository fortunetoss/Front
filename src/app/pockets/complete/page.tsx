"use client";

import React, { useEffect, useState } from "react";
import Notice from "../../../components/notice";
import axios from "axios";
import {authApiClient} from "../../../api/api-client";
import Modal from "../../../components/modals";
import {useRouter} from "next/navigation";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router= useRouter();

    useEffect(() => {
        // 백엔드에서 questionId 받아오기
        // 엥 근데 여기 코드 너무 이상함... ㅠ ㅠ 내가 다시 수정해야겠다
        const fetchQuestionId = async () => {
            try {

                const response = await authApiClient.get("/api/questionId");
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

    // 카카오톡 공유
    const handleKakaoShare=() => {
        if (shareableUrl) {
            console.log(`카카오톡으로 공유: ${shareableUrl}`);
        }
        router.push("/shared"); // 공유 후 /shared 페이지로 이동
    };



    // URL 복사
    const handleCopyUrl = () => {
        if (shareableUrl) {
            navigator.clipboard
                .writeText(shareableUrl)
                .then(() => alert("URL이 클립보드에 복사되었습니다!"))
                .catch((err) => console.error("URL 복사 실패:", err));
        } else {
            alert("공유 가능한 URL이 없습니다.");
        }
        router.push("/shared");
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
                    onClick={() => setModalOpen(true)}
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
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onCopyUrl={handleCopyUrl}
                onKakaoShare={handleKakaoShare}
            ></Modal>
        </div>
    )
};

export default Complete;
