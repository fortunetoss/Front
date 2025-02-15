import IntroContent from "@/components/answerer/Intro-content";
import Header from "@/components/header/header";
import Logo from "@/components/header/logo";
import { getAnswererIntroData } from "@/api/answerer";

export default async function IntroPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;

  const data = await getAnswererIntroData(questionId);

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <IntroContent data={data} questionId={questionId} />
    </>
  );
}
