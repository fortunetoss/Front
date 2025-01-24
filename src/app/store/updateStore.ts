// 상태 업데이트

import usePocketStore, { PocketState } from "./usePocket";

export const updateTitle = (title: string) => {
  const { setTitle } = usePocketStore.getState();
  console.log(`title 업데이트 -> ${title}`);
  setTitle(title);
};

export const updateAnswers = (answers: string[]) => {
  const { setAnswers } = usePocketStore.getState();
  console.log(` answers 업데이트 -> ${answers}`);
  setAnswers(answers);
};

export const updateContent = (content: string) => {
  const { setContent } = usePocketStore.getState();
  console.log(` content 업데이트 -> ${content}`);
  setContent(content);
};

export const updateCard = (card: string) => {
  const { setCard } = usePocketStore.getState();
  console.log(` card 업데이트-> ${card}`);
  setCard(card);
};

export const updateAllState = (data: Partial<PocketState>) => {
  const {
    setTitle,
    setAnswers,
    setContent,
    setCard,
    setDomain,
    setCorrectAnswer,
    setStep,
    setQuestionId,
  } = usePocketStore.getState();

  console.log("상태 업데이트", data);

  if (data.title) setTitle(data.title);
  if (data.answers) setAnswers(data.answers);
  if (data.content) setContent(data.content);
  if (data.card) setCard(data.card);
  if (data.domain) setDomain(data.domain);
  if (data.correctAnswer) setCorrectAnswer(data.correctAnswer);
  if (data.questionId) setQuestionId(data.questionId);
  if (data.step !== undefined) setStep(data.step);
};
