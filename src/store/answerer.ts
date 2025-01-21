import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AnswererStore {
  name: string;
  answer: string | null;

  question: string;
  options: Array<string>;
  publisherName: string;
  pouchType: string;

  isCorrect: boolean | null;
  correctAnswer: string;
  message: string | null;
  cardType: string;

  setInitialData: (
    question: string,
    options: string[],
    publisherName: string,
    pouchType: string
  ) => void;
  setAnswererResult: (
    isCorrect: boolean | null,
    correctAnswer: string,
    message: string | null,
    cardType: string
  ) => void;
  setName: (name: string) => void;
  setAnswer: (answer: string) => void;
}

const initialState = {
  name: "",
  answer: null,

  question: "",
  options: [],
  publisherName: "",
  pouchType: "",

  isCorrect: null,
  correctAnswer: "",
  message: null,
  cardType: "",
};

const useAnswererStore = create(
  persist<AnswererStore>(
    (set) => ({
      // 초기 상태
      ...initialState,

      // 상태 업데이트 함수들
      setInitialData: (question, options, publisherName, pouchType) =>
        set((prev) => ({
          ...prev,
          question,
          options,
          publisherName,
          pouchType,
        })),

      setAnswererResult: (isCorrect, correctAnswer, message, cardType) =>
        set((prev) => ({
          ...prev,
          isCorrect,
          correctAnswer,
          message,
          cardType,
        })),

      setName: (name) => set((prev) => ({ ...prev, name })),
      setAnswer: (answer) => set((prev) => ({ ...prev, answer })),
    }),
    { name: "answerer-store", storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useAnswererStore;
