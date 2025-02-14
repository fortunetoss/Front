import { apiClient } from "@/api/api-client";
import AnswererShareResult from "@/components/result-share/answerer-share-result";

export default async function ResultSharePage({
  params,
}: {
  params: Promise<{ answerId: string }>;
}) {
  const { answerId } = await params;

  try {
    const response = await apiClient.get(`/api/answer/result/${answerId}`);
    const { correct, answerNickname, questionCustomId } = response.data.data;

    return (
      <AnswererShareResult
        isCorrect={correct}
        answerer={answerNickname}
        questionId={questionCustomId}
      />
    );
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="-mt-6 px-3 text-center">
          결과를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }
}
