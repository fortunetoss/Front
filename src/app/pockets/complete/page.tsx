"use client";

import React, { useEffect, useState } from "react";
import Notice from "../../../components/notice";
import {authApiClient} from "../../../api/api-client";
import Modal from "../../../components/modals";
import {useRouter} from "next/navigation";
import {generateUrl} from "@/utils/url/urlGenerator";


const Complete = () => {

    const [shareableUrl, setShareableUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router= useRouter();

    useEffect(() => {
        // 백엔드에서 questionId 받아오기

        const url = generateUrl();
        if (url) {
            setShareableUrl(url);
            console.log(`url 생성 ${url}`);

        } else {
            console.error("URL 생성 실패: api 오류");
        }
    },[]);


    // 카카오톡 공유
    const handleKakaoShare=() => {
        // 일단 똑같이.. 해놓고
        // 나중에 카카오톡 공유 추가함!
        if (shareableUrl) {
            console.log(`카카오톡으로 공유: ${shareableUrl}`);
        } else {
            alert("공유 가능한 URL이 없습니다.");
        }
        router.push('/pockets/shared'); // 공유 후 /shared 페이지로 이동

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
        router.push("/pockets/shared")
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
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 text-lg font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                    공유하기
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCopyUrl={handleCopyUrl}
                onKakaoShare={handleKakaoShare}
            ></Modal>
        </div>
    )
};

export default Complete;
