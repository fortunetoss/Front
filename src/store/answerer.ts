import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AnswerStore {
  name: string;
  answer: string | null;
  setName: (name: string) => void;
  setAnswer: (answer: string) => void;
}

const initialState = {
  name: "",
  answer: null,
};

const useAnswererStore = create(
  persist<AnswerStore>(
    (set) => ({
      ...initialState,
      setName: (name) => set((prev) => ({ ...prev, name })),
      setAnswer: (answer) => set((prev) => ({ ...prev, answer })),
    }),
    { name: "answerer-store", storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useAnswererStore;
