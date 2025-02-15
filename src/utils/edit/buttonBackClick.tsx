import { getEdit } from "@/api/api-getEdit";
import usePocketStore from "@/store/pocket";
import useModifiedStore from "@/store/modifiedStore";

export const buttonBackClick = async (questionCustomId: number) => {
  const { setTitle, setAnswers, setCorrectAnswer, setContent, setStep } =
    usePocketStore.getState();
  const { setModified } = useModifiedStore.getState();

  try {
    const data = await getEdit(questionCustomId); // 기존 데이터 가져오기

    // 상태 업데이트
    setTitle(data.title);
    setAnswers([data.select1, data.select2, data.select3, data.select4]);
    setCorrectAnswer(data.answer);
    setContent(data.content);

    // @ts-ignore
    setStep((prevStep: number) => Math.max(prevStep - 1, 0));
    // 퍼널 단계 이전으로
    setModified(true); // 수정 상태로 설정
  } catch (error) {
    console.error("데이터 로드 오류:", error);
    alert("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};
