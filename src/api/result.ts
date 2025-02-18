import { authApiClient } from "@/api/api-client";

// 결과페이지

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

export const fetchResultData = async (
  questionCustomId: string,
): Promise<ResultData> => {
  try {
    const response = await authApiClient.get(`/api/result/${questionCustomId}`);
    if (response.data.status === "success") {
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

// 결과지 세부사항 보기

export interface Solver {
  answer: string;
  solver: string;
}

export const fetchRightAnswers = async (
  questionCustomId: string,
  answer: string,
): Promise<Solver[]> => {
  try {
    const response = await authApiClient.post(
      `/api/rightAnswer`, // POST 요청
      { questionCustomId, answer }, // Body에 데이터 전달
      {
        headers: {
          "Content-Type": "application/json", // 헤더에 JSON 타입 명시
        },
      },
    );
    if (response.data.status === "success") {
      return response.data.data.content; // 정답자 리스트 반환
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    return []; // 반환값 항상 존재한다고 생각하게 하기 위함. .
  }
};

export const fetchWrongAnswers = async (
  questionCustomId: string,
): Promise<Solver[]> => {
  try {
    const response = await authApiClient.post(
      `/api/wrongAnswer`, // POST 요청
      { questionCustomId }, // Body에 데이터 전달
      {
        headers: {
          "Content-Type": "application/json", // 헤더에 JSON 타입 명시
        },
      },
    );
    if (response.data.status === "success") {
      return response.data.data.content; //  리스트 반환
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    return []; // 반환값 항상 존재한다고 생각하게 하기 위함. .
  }
};
