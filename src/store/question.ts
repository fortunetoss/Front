import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface QuestionStore {
  question: string;
  options: Array<string>;
  setQuestion: (question: string, options: Array<string>) => void;
}

const initialState = {
  question: "",
  options: [],
};

const useQuestionStore = create(
  persist<QuestionStore>(
    (set) => ({
      ...initialState,
      setQuestion: (question, options) =>
        set({
          question,
          options,
        }),
    }),
    { name: "question-store", storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useQuestionStore;
