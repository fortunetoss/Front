"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { kakaotalkShare } from "@/utils/share/kakaotalk-share";
import ShareModal from "@/components/modal/share-modal";
import { generateUrl } from "@/utils/url/urlGenerator";
import usePocketStore from "@/store/pocket";
import { pocketsImageData } from "@/data/card-names";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";
import { buttonBackClick } from "@/utils/edit/buttonBackClick";

const Complete = () => {
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const questionCustomId = usePocketStore((state) => state.questionId);
  const { domain, content } = usePocketStore();

  const selectedPouch = pocketsImageData.find((pouch) => pouch.name === domain);

  useEffect(() => {
    const url = generateUrl(questionCustomId);
    if (url) {
      setShareableUrl(url);
    } else {
      console.error("URL 생성 실패: API 오류");
    }
  }, []);

  const handleKakaoShare = () => {
    if (shareableUrl) {
      kakaotalkShare(shareableUrl, { hasMessage: content !== null });
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
      <div className="flex flex-col gap-[60px] container mx-auto p-4 bg-white">
        <div className="mt-6">
          <h1 className="font-bold text-xl mt-1">복주머니가 완성되었어요!</h1>
          <p className="font-medium text-[#848588]">
            복 나누미가 되어 친구에게 공유해보세요.
          </p>
        </div>

        {selectedPouch ? (
          <div className="mx-auto">
            <img
              src={selectedPouch.pocketsImage}
              alt={`복주머니 ${selectedPouch.name}`}
              className="mx-auto w-60 h-60"
            />
          </div>
        ) : (
          <p className="text-red-500">복주머니를 선택하지 않았습니다.</p>
        )}

        <div className="flex w-full space-x-4">
          <button
            onClick={() => {
              if (questionCustomId) {
                buttonBackClick(questionCustomId);
                history.back();
              } else {
                history.back();
              }
            }}
            className="flex-1 py-3 font-medium border-[1.2px] border-disable rounded-lg hover:bg-gray-100 transition"
          >
            이전
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-3 font-medium text-white bg-blue rounded-lg hover:bg-red-600 transition"
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
