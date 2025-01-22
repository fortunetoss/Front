// 정답자 관리하는 상태관리


import { create } from "zustand";
import { Solver } from "@/api/api-result-data";
import {ValidateResult} from "@/components/result/resultValidation";

// 상태 인터페이스 정의
interface ResultStore {
    RightSolvers: Solver[]; // 정답자 리스트
    WrongSolvers: Solver[]; // 오답자 리스트
    setSolvers: (RightSolvers: Solver[], WrongSolvers: Solver[]) => void; // 정답자/오답자 설정
    ValidateResult: (solvers: Solver[], correctAnswer: string) => void; // 정답자/오답자 구별 및 설정
}

// Zustand 상태 관리 정의
const useResultStore = create<ResultStore>((set) => ({
    RightSolvers: [],
    WrongSolvers: [],
    setSolvers: (RightSolvers, WrongSolvers) =>
        set(() => ({ RightSolvers, WrongSolvers })),
    ValidateResult: (solvers, correctAnswer) => {
        // 정답자와 오답자를 구별
        const RightSolvers: Solver[] = [];
        const WrongSolvers: Solver[] = [];

        solvers.forEach((solver) => {
            if (solver.answer === correctAnswer) {
                RightSolvers.push(solver); // 정답자 추가
            } else {
                WrongSolvers.push(solver); // 오답자 추가
            }
        });

        // Zustand 상태 업데이트
        set(() => ({ RightSolvers, WrongSolvers }));
    },
}));

export default useResultStore;
