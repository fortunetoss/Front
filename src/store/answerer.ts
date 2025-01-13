import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AnswererStore {
  name: string;
  answer: string | null;

  question: string;
  options: Array<string>;
  hasMessage: boolean;
  creatorName: string;
  pouchImg: string;

  isCorrect: boolean | null;
  correctAnswer: string;
  message: string | null;
  cardImg: string;
  paperImg: string;

  setInitialData: (
    question: string,
    options: string[],
    creatorName: string,
    pouchImg: string,
    hasMessage: boolean
  ) => void;
  setAnswererResult: (
    isCorrect: boolean | null,
    correctAnswer: string,
    message: string | null,
    cardImg: string,
    paperImg: string
  ) => void;
  setName: (name: string) => void;
  setAnswer: (answer: string) => void;
}

const initialState = {
  name: "",
  answer: null,

  question: "",
  options: [],
  hasMessage: false,
  creatorName: "",
  pouchImg: "",

  isCorrect: null,
  correctAnswer: "",
  message: null,
  cardImg: "",
  paperImg: "",
};

const useAnswererStore = create(
  persist<AnswererStore>(
    (set) => ({
      // 초기 상태
      ...initialState,

      // 상태 업데이트 함수들
      setInitialData: (question, options, creatorName, pouchImg, hasMessage) =>
        set((prev) => ({
          ...prev,
          question,
          options,
          hasMessage,
          creatorName,
          pouchImg,
        })),

      setAnswererResult: (
        isCorrect,
        correctAnswer,
        message,
        cardImg,
        paperImg
      ) =>
        set((prev) => ({
          ...prev,
          isCorrect,
          correctAnswer,
          message,
          cardImg,
          paperImg,
        })),

      setName: (name) => set((prev) => ({ ...prev, name })),
      setAnswer: (answer) => set((prev) => ({ ...prev, answer })),
    }),
    { name: "answerer-store", storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useAnswererStore;
