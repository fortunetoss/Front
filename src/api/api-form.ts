// 폼작성과 관련된 api 코드

import { authApiClient } from "../api/api-client";
import usePocketStore from "@/app/store/usePocket";



// 사용자가 처음 로그인했을 때 복주머니 가져오기 - GET
export const fetchLuckyPouches = async (page: number = 0): Promise<any> => {
    try {
        const response = await authApiClient.get(`/api/luckyPouch?page=${page}`);
        console.log("복주머니 불러오기 성공:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("복주머니 불러오기 실패:", error);
        throw new Error("복주머니 가져오기 실패");
    }
};

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
    card: string | null,
    domain: string | null,
    content: string | null,
    //paper: string | null
): Promise<{ questionId: number;  }> => {
    try {
        const response = await authApiClient.post("/api/question", {
            title,
            select1: answers[0],
            select2: answers[1],
            select3: answers[2],
            select4: answers[3],
            answer: correctAnswer,
            card,
            domain,
            content,
            //paper,
        });

        console.log("응답데이터")
        // 응답 처리
        if (response.status === 200) {
            const questionId = response.data.data.id;
            const {setQuestionCustomId} = usePocketStore.getState();
            setQuestionCustomId(questionId);
            // 응답할때 questionCustomId 받아오면 이걸 zustand 에 일단 저장해놓음
            // -> url 만들 때 쓸거니까
            console.log("POST 성공:  ID:", questionId);
            return { questionId };
        } else {
            throw new Error(" 제대로 받아오지 못함");
        }
    } catch (error) {
        console.error("문제 제출 중 오류 발생:", error);
        throw new Error("문제 제출에 실패했습니다.");
    }
};
