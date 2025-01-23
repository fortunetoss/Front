"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApiClient } from "../../../api/api-client";
import { kakaotalkShare } from "@/utils/share/kakaotalk-share";
import ShareModal from "@/components/modal/share-modal";
import { generateUrl } from "@/utils/url/urlGenerator";
import usePocketStore from "@/app/store/usePocket";
import { pocketsImageData } from "@/utils/images/cardNames";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";
import { buttonBackClick } from "@/components/edit/buttonBackClick";
import {getEdit} from "@/api/api-getEdit";

const Complete = () => {
    const [shareableUrl, setShareableUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const questionCustomId = usePocketStore((state) => state.questionId);
    const { domain } = usePocketStore();

    const selectedPouch = pocketsImageData.find((pouch) => pouch.name === domain);

    useEffect(() => {
        // @ts-ignore
        const url = generateUrl(questionCustomId);
        if (url) {
            setShareableUrl(url);
            console.log(`URL 생성: ${url}`);
        } else {
            console.error("URL 생성 실패: API 오류");
        }
    }, []);

    const handleKakaoShare = () => {
        if (shareableUrl) {
            kakaotalkShare(shareableUrl);
        } else {
            alert("공유 가능한 URL이 없습니다.");
        }
        router.push("/pockets/shared");
    };

    const handleCopyUrl = () => {
        if (shareableUrl) {
            navigator.clipboard
                .writeText(shareableUrl)
                .then(() => alert("URL이 클립보드에 복사되었습니다!"))
                .catch((err) => console.error("URL 복사 실패:", err));
        } else {
            alert("공유 가능한 URL이 없습니다.");
        }
        router.push("/pockets/shared");
    };

    return (
        <div>
            <Header>
                <BackButton
                    onClick={async () => {
                        if (questionCustomId) {
                            buttonBackClick(questionCustomId);
                            history.back();
                        } else {
                            history.back(); // 단순 뒤로 가기
                        }
                    }}
                />

            </Header>
            <div className="container mx-auto p-4">
                <div className="mt-6 mb-20 text-gray-700">
                    <h1 className="font-semibold text-xl mt-1">
                        복주머니가 완성되었어요!
                    </h1>
                    <p className="text-gray-500">복 나누미가 되어 친구에게 공유해보세요.</p>
                </div>

                {selectedPouch ? (
                    <div className="mx-auto mb-24">
                        <img
                            src={selectedPouch.pocketsImage}
                            alt={`복주머니 ${selectedPouch.name}`}
                            className="mx-auto w-80 h-80 opacity-80"
                        />
                    </div>
                ) : (
                    <p className="text-red-500">복주머니를 선택하지 않았습니다.</p>
                )}

                <div className="flex w-full space-x-4 mt-8">
                    <button
                        onClick={() => {
                            if (questionCustomId) {
                                buttonBackClick(questionCustomId);
                                history.back();
                            } else {
                                history.back();
                            }
                        }}
                        className="flex-1 py-3 text-lg font-medium text-gray-700 border-2 border-gray-400 rounded-lg hover:bg-gray-100 transition"
                    >
                        이전
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 py-3 text-lg font-medium text-white bg-blue rounded-lg hover:bg-red-600 transition"
                    >
                        공유하기
                    </button>
                </div>
                <ShareModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCopyUrl={handleCopyUrl}
                    onKakaoShare={handleKakaoShare}
                />
            </div>
        </div>
    );
};

export default Complete;
