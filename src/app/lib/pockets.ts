//form 페이지에서 일어나는 api 요청 관련 함수

import axios from 'axios';

// localhost 에 연결
// 서버 배포되면 바꿔야겠다. .
const api = axios.create({
    baseURL: "http://localhost:8080",
});



// 랜덤 질문 가져오기 -GET
//{title, select1, select2, select3..} 을 백엔드에서 가져오게끔 함..

export const fetchRandomQuestion = async () => {
    const response = await api.get("/api/pouch/question");
    return response.data;
};



// post 요청 성공하면 200ok 되면서 questionCustomId 랑
// title, select1, select2, select3, select4 랑 card, shape, paper 보내면
// 200 상태일 때 get 으로 questionCustomid 랑 shape 를 받아오게끔 함

// 문제 제출 - POST
export const submitCustomQuestion = async (
    title: string,
    answers: string[],
    correctAnswer: string | null,
    content: string,
    shape: string,
    card: string,
    paper: string
) => {
    try {
        const response = await api.post("/api/questionCustom", {
            title,
            select1: answers[0],
            select2: answers[1],
            select3: answers[2],
            select4: answers[3],
            answer: correctAnswer,
            content,
            shape,
            card,
            paper,
        });

        // 응답 데이터 반환
        return response.data; // { questionCustomId, shape }
    } catch (error: any) {
        console.error("문제 제출 중 오류 발생:", error.response || error.message);
        throw new Error("문제 제출에 실패했습니다.");
    }
};



// questionCustomId를 기반으로 데이터 가져오기 - GET
export const fetchGeneratedAnswer = async (questionCustomId: string) => {
    try {
        const response = await api.get(`/api/answer/${questionCustomId}`);
        return response.data; // { questionCustomId, shape }
    } catch (error: any) {
        console.error("데이터 가져오기 중 오류 발생:", error.response || error.message);
        throw new Error("데이터 가져오기에 실패했습니다.");
    }
};

