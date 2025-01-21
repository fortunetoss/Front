import { apiClient } from "@/api/api-client";

interface ResultSharePageProps {
  params: {
    answerId: number;
  };
}

export default async function ResultSharePage({
  params,
}: ResultSharePageProps) {
  const { answerId } = params;
  const response = await apiClient.get(`/api/answer/result/${answerId}`);

  console.log(response.data);
  return <div>결과 공유 페이지</div>;
}
