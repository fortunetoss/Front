import AnswererResult from "@/components/answerer/answerer-result";
import Header from "@/components/header/header";
import Logo from "@/components/header/logo";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <AnswererResult questionId={questionId} />
    </>
  );
}
