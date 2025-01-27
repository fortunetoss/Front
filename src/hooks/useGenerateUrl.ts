import { useState, useEffect } from "react";
import { encrypt } from "../hooks/crypto";
import { generateUrl } from "@/utils/url/urlGenerator";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;


if (!SECRET_KEY) {
    throw new Error("SECRET_KEY가 설정되지 않았습니다.");
}

// questionCustomId를 기반으로 URL 생성
export function useGenerateUrl(questionId: number | null) {
    const [shareableUrl, setShareableUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!questionId) {
            console.error("questionCustomId가 설정되지 않았습니다.");
            return;
        }

        // 암호화된 ID 생성
        const encryptedId = encrypt(questionId.toString(), SECRET_KEY);

        // URL 생성
        // @ts-ignore
        const url = generateUrl(encryptedId);

        if (url) {
            setShareableUrl(url);
            console.log(` ${window.location.origin}/${questionId}`);
            console.log(`암호화된 URL: ${url}`); // 암호화된 URL
        } else {
            console.error("URL 생성 실패: API 오류");
        }
    }, [questionId]);

    return shareableUrl;
}
