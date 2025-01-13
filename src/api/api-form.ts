// 폼작성과 관련된 api 코드

import { authApiClient } from "@/api/api-client";





// 랜덤 질문 가져오기 - GET
export const fetchRandomQuestion = async (): Promise<{
    title: any;
    select1:any;
    select2: any;
    select3: any;
    select4: any;
}> => {
    try {
        const response = await authApiClient.get("/api/pouch/question");
        console.log(response)
        return response.data.data;
    } catch (error) {
        //console.error("랜덤 질문 가져오기 실패:", error);

        throw new Error("랜덤 질문 가져오기 실패");
    }
};

// 문제 제출 - POST
export const submitCustomQuestion = async (
    title: string,
    answers: string[],
    correctAnswer: string | null,
    content: string | null,
    domain: string | null,
    card: string | null,
    paper: string | null
): Promise<{ questionId: any; domain: any }> => {
    try {
        const response = await authApiClient.post("/api/question", {
            title,
            select1: answers[0],
            select2: answers[1],
            select3: answers[2],
            select4: answers[3],
            answer: correctAnswer,
            content,
            domain,
            card,
            paper,
        });
        // 응답 처리
        if (response.status === 200) {
            const questionId = response.data.id;
            const domain = response.data.domain;
            console.log("POST 성공:  ID:", questionId, "domain:", domain);
            return { questionId, domain };
        } else {
            throw new Error(" 제대로 받아오지 못함");
        }
    } catch (error) {
        console.error("문제 제출 중 오류 발생:", error);
        throw new Error("문제 제출에 실패했습니다.");
    }
};
