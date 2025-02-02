// 결과페이지

import { authApiClient } from "../api/api-client";

// Result 데이터 인터페이스 정의
export type ResultData = {
  questionTitle: string;
  answer: string;
  total: number;
  select1?: string;
  select2?: string;
  select3?: string;
  select4?: string;
  select1per?: number;
  select2per?: number;
  select3per?: number;
  select4per?: number;
  select1cnt?: number;
  select2cnt?: number;
  select3cnt?: number;
  select4cnt?: number;
  [key: `select${number}`]: string | undefined;
  [key: `select${number}per`]: number | undefined;
  [key: `select${number}cnt`]: number | undefined;
};

// API 요청 함수 정의
export const fetchResultData = async (
  questionCustomId: string,
): Promise<ResultData> => {
  try {
    const response = await authApiClient.get(`/api/result/${questionCustomId}`);
    if (response.data.status === "success") {
      console.log("응답 성공:", response.data);
      return response.data.data;
    } else {
      throw new Error(
        response.data.message || "결과 데이터를 불러오지 못했습니다.",
      );
    }
  } catch (error) {
    console.error("API 요청 중 오류:", error);
    throw new Error("결과 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};
