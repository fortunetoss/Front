import ResponseData from "@/models/response-data";
import { apiClient } from "./api-client";

interface IntroResponseData {
  title: string;
  select1: string;
  select2: string;
  select3: string;
  select4: string;
  content: string | null;
  domain: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  publisher: string;
}

export const getAnswererIntroData = async (questionId: string) => {
  const response = await apiClient.get<ResponseData>(
    `/api/answer/${questionId}`,
  );

  return response.data.data as IntroResponseData;
};

interface AnswererResult {
  correct: boolean;
  answer: string;
  content: string | null;
  card: string;
  answerId: number;
}

export const postAnswerSelection = async (
  questionId: string,
  answer: string,
  solver: string,
) => {
  const response = await apiClient.post<ResponseData>(
    `/api/answer/${questionId}`,
    {
      answer,
      solver,
    },
  );

  return response.data.data as AnswererResult;
};
