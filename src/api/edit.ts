import { authApiClient } from "@/api/api-client";
import usePocketStore from "@/store/pocket";

export const getEdit = async (questionCustomId: number) => {
  try {
    const response = await authApiClient.get(
      `/api/question/${questionCustomId}`,
    );
    if (response.status === 200) {
      return response.data.data; // 문제 데이터를 반환
    } else {
      throw new Error("문제 데이터를 가져오지 못했습니다.");
    }
  } catch (error) {
    console.error("문제 가져오는 중 오류 발생:", error);
    throw new Error("문제 데이터를 가져오는 데 실패했습니다.");
  }
};

export const postEdit = async (
  title: string,
  answers: string[],
  correctAnswer: string | null,
  card: string | null,
  domain: string | null,
  content: string | null,
): Promise<{ questionCustomId: number; domain: string | null }> => {
  const questionCustomId = usePocketStore.getState().questionId;

  if (!questionCustomId) {
    throw new Error("수정할 문제 ID가 없습니다.");
  }

  try {
    const response = await authApiClient.post(
      `/api/questions/${questionCustomId}`,
      {
        title,
        select1: answers[0],
        select2: answers[1],
        select3: answers[2],
        select4: answers[3],
        answer: correctAnswer,
        card,
        domain,
        content,
      },
    );

    if (response.status === 200) {
      return response.data.data; // 수정된 데이터 반환
    } else {
      throw new Error("문제 수정을 완료하지 못했습니다.");
    }
  } catch (error) {
    console.error("문제 수정 중 오류 발생:", error);
    throw new Error("문제 수정에 실패했습니다.");
  }
};
