// 문제 수정하기 위해 일단 api 받아옴


import {authApiClient} from "../api/api-client";

export const getEdit = async (questionCustomId: number) => {
    try {
        const response = await authApiClient.get(`/api/question/${questionCustomId}`);
        if (response.status === 200) {
            console.log("문제 데이터 가져오기 성공:", response.data.data);
            return response.data.data; // 문제 데이터를 반환
        } else {
            throw new Error("문제 데이터를 가져오지 못했습니다.");
        }
    } catch (error) {
        console.error("문제 가져오는 중 오류 발생:", error);
        throw new Error("문제 데이터를 가져오는 데 실패했습니다.");
    }
};
