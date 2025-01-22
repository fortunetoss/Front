// 결과지 세부사항 보기

import {authApiClient} from "@/api/api-client";

export interface Solver {
    answer : string;
    solver : string;
}


export const fetchAnswers = async (
    questionCustomId:string,
    answer: string
): Promise<Solver[]> => {
    try {
        const response = await authApiClient.post(
            `/api/rightAnswer`, // POST 요청
            { questionCustomId, answer }, // Body에 데이터 전달
            {
                headers: {
                    'Content-Type': 'application/json', // 헤더에 JSON 타입 명시
                },
            }
        );
        if (response.data.status === "success") {
            console.log("정답자 데이터 요청 성공:", response.data);
            return response.data.data.content; // 정답자 리스트 반환
        } else {
            throw new Error(response.data.message );
        }
    } catch (error) {
        console.error( error);
        return[]; // 반환값 항상 존재한다고 생각하게 하기 위함. .
    }
};

