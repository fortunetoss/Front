import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PocketState {
    title: string | null; // 문제 제목
    answers: string[]; // 선택지 배열
    correctAnswer: string | null; // 정답
    content: string | null; // 덕담 내용
    domain: string | null; // 복주머니 도메인
    card: string | null; // 선택한 카드 (A~E)
    paper: string | null; // 선택한 카드 뒷면

    setTitle: (title: string) => void;
    setAnswers: (answers: string[]) => void;
    setCorrectAnswer: (answer: string) => void;
    setContent: (content: string) => void;
    setDomain: (domain: string) => void;
    setCard: (card: string) => void;
    setPaper: (paper: string) => void;
}

const usePocketStore = create<PocketState>()(
    persist(
        (set) => ({
            title: null,
            answers: ["", "", "", ""],
            correctAnswer: null,
            content: null,
            domain: null,
            card: null,
            paper: null,

            setTitle: (title) => set({ title }),
            setAnswers: (answers) => set({ answers }),
            setCorrectAnswer: (answer) => set({ correctAnswer: answer }),
            setContent: (content) => set({ content }),
            setDomain: (domain) => set({ domain }),
            setCard: (card) => set({ card }),
            setPaper: (paper) => set({ paper }),
        }),
        { name: "pocket-storage", storage: createJSONStorage(() => localStorage) }
    )
);

export default usePocketStore;
