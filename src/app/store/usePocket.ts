import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 상태 인터페이스 정의
export interface PocketState {
    pocketIndex: number | null; // 선택된 복주머니 번호
    selectOption: string | null; // "problem" or "together"
    question: string | null; // 문제 제목
    answers: string[]; // 답변 배열
    correctAnswer: string | null; // 정답
    content: string | null; // 덕담
    shape: string | null; // 복주머니 모양
    card: string | null; // 카드 모양
    paper: string | null; // 편지지 이미지
    finalUrl: string | null; // 최종 URL 생성

    // 상태를 설정하는 함수
    setPocketIndex: (index: number) => void;
    setSelectOption: (option: string) => void;
    setQuestion: (question: string) => void;
    setAnswers: (answers: string[]) => void;
    setCorrectAnswer: (answer: string) => void;
    setContent: (letter: string) => void;
    setShape: (shape: string) => void;
    setCard: (card: string) => void;
    setPaper: (paper: string) => void;
    setFinalUrl: (url: string) => void;

    resetPocketState: () => void; // 상태 초기화 함수
}

// Zustand Store 정의
const usePocketStore = create<PocketState>()(
    persist(
        (set) => ({
            pocketIndex: null,
            selectOption: null,
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: null,
            content: null,
            shape: null,
            card: null,
            paper: null,
            finalUrl: null,
            setPocketIndex: (index) => set({ pocketIndex: index }),
            setSelectOption: (option) => set({ selectOption: option }),
            setQuestion: (question) => set({ question }),
            setAnswers: (answers) => set({ answers }),
            setCorrectAnswer: (answer) => set({ correctAnswer: answer }),
            setContent: (content) => set({ content }),
            setShape: (shape) => set({ shape }),
            setCard: (card) => set({ card }),
            setPaper: (paper) => set({ paper }),
            setFinalUrl: (url) => set({ finalUrl: url }),

            resetPocketState: () =>
                set({
                    pocketIndex: null,
                    selectOption: null,
                    question: "",
                    answers: ["", "", "", ""],
                    correctAnswer: null,
                    content: null,
                    shape: null,
                    card: null,
                    paper: null,
                    finalUrl: null,
                }),
        }),
        {
            // 상태를 URL 해시로 저장 및 복원
            name: "pocket-storage",
            storage: createJSONStorage(() => ({
                getItem: () => window.location.hash.substring(1) || "{}",
                setItem: (_, value) => {
                    window.location.hash = value;
                },
                removeItem: () => {
                    window.location.hash = "";
                },
            })),
        }
    )
);

// 상태 변경 로그 출력
usePocketStore.subscribe((state) => {
    console.log(state);
});

export default usePocketStore;
