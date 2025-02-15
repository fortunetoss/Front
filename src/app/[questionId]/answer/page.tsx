import AnswerSelction from "@/components/answerer/answer-selection";
import BackButton from "@/components/header/back-button";
import Header from "@/components/header/header";

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <AnswerSelction questionId={questionId} />
    </>
  );
}
