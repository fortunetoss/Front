import { useState, useEffect } from "react";
import { generateUrl } from "@/utils/url/urlGenerator";
import { kakaotalkShare } from "@/utils/share/kakaotalk-share";

const useShareHandlers = (questionCustomId: string | null) => {
    const [shareableUrl, setShareableUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!questionCustomId) return;
        const url = generateUrl(questionCustomId);
        if (url) {
            setShareableUrl(url);
        } else {
            console.error("URL 생성 실패");
        }
    }, [questionCustomId]);

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

    const handleKakaoShare = () => {
        if (shareableUrl) {
            kakaotalkShare(shareableUrl);
        } else {
            alert("공유 가능한 URL이 없습니다.");
        }
    };

    return {
        shareableUrl,
        handleCopyUrl,
        handleKakaoShare,
    };
};

export default useShareHandlers;
