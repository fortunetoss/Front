import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {get} from "node:http";
import {Pouch} from "@/utils/validation/validationPouch";


export interface PocketState {
    pouches:Pouch[];
    title: string;
    answers: string[]; // 선택지 배열
    correctAnswer: string | null; // 정답
    content: string | null; // 덕담 내용
    domain: string | null; // 복주머니 도메인
    questionId: number | null; // 선택된 복주머니의 questionCustomId
    card: string | null; // 선택한 카드 (A~E)
    //paper: string | null; // 선택한 카드 뒷면
    selectOption: string | null; // "problem" 또는 "together"
    step: number; // 현재 단계



    setTitle: (title: string) => void;
    setAnswers: (answers: string[]) => void;
    setSelectOption: (option: string) => void; // 옵션 설정 함수
    setCorrectAnswer: (answer: string) => void;
    setContent: (content: string) => void;
    setDomain: (domain: string) => void;
    setQuestionId: (questionId: number|null) => void;
    setCard: (card: string) => void;
    //setPaper: (paper: string) => void;
    setStep: (step: number) => void;
    resetFunnel: () => void; // 퍼널 초기화
    setPouches: (pouches: Pouch[]) => void;



}

const usePocketStore = create<PocketState>()(
    persist(
        (set) => ({
            title: "",
            answers: ["", "", "", ""],
            correctAnswer: null,
            content: null,
            domain: null,
            questionId: null,
            card: null,
            selectOption: null,
            //paper: null,
            step:0,
            pouches:[],


            setTitle: (title) => {
                console.log("setTitle:", title);
                set({ title })
            },
            setAnswers: (answers) => {
                console.log("setAnswers:", answers);
                set({ answers })
            },
            setCorrectAnswer: (answer) => {
                console.log("setCorrectAnswer:", answer);
                set({ correctAnswer: answer })
            },
            setContent: (content) => {
               // console.log("setContent:", content);
                set({ content })
            },
            setDomain: (domain) => {
                console.log("setDomain:", domain);
                set({ domain })
            },
            setQuestionId: (questionId: number|null) => {
                console.log("setQuestionCustomId:", questionId);
                set({ questionId })
            },
            setCard: (card) => {
                console.log("setCard:", card);
                set({ card })
            },
            setSelectOption: (option) => {
                console.log("setSelectOption:", option);
                set({ selectOption: option })
            },
            /*
            setPaper: (paper) => {
                console.log("setPaper:", paper);
                set({ paper })

            },

             */
            setPouches:(pouches: Pouch[]) => ({
                pouches}),
            setStep: (step) => {
                // @ts-ignore
                console.log(`setStep(${step}):`, get());
                set({ step })
            },

            // 퍼널 초기화
            resetFunnel: () =>
                set({
                    title: "",
                    answers: ["", "", "", ""],
                    correctAnswer: null,
                    content: null,
                    domain: null,
                    card: null,
                    questionId: null,
                    //paper: null,
                    selectOption: null,
                    step: 0, // 초기 단계로 되돌림
                }),





        }),
        { name: "pocket-storage", storage: createJSONStorage(() => localStorage) }
    )
);

export default usePocketStore;
