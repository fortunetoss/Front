import { apiClient } from "@/api/api-client";
import AnswererShareResult from "@/components/answerer/answerer-share-result";

export default async function ResultSharePage({
  params,
}: {
  params: Promise<{ answerId: string }>;
}) {
  const { answerId } = await params;

  const response = await apiClient.get(`/api/answer/result/${answerId}`);
  const { correct, answerNickname, questionCustomId } = response.data.data;

  return (
    <AnswererShareResult
      isCorrect={correct}
      answerer={answerNickname}
      questionId={questionCustomId}
    />
  );
}
