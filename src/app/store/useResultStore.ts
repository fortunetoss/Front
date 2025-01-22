// 정답자 관리하는 상태관리

import { create } from "zustand";
import { Solver } from "@/api/api-result-data";

// 상태 인터페이스 정의
interface ResultStore {
  rightSolvers: Solver[]; // 정답자 리스트
  wrongSolvers: Solver[]; // 오답자 리스트
  setSolvers: (rightSolvers: Solver[], wrongSolvers: Solver[]) => void; // 정답자/오답자 설정
  validateResult: (solvers: Solver[], correctAnswer: string) => void; // 정답자/오답자 구별 및 설정
}

// Zustand 상태 관리 정의
const useResultStore = create<ResultStore>((set) => ({
  rightSolvers: [],
  wrongSolvers: [],
  setSolvers: (rightSolvers, wrongSolvers) =>
    set(() => ({ rightSolvers, wrongSolvers })),
  validateResult: (solvers, correctAnswer) => {
    // 정답자와 오답자를 구별
    const rightSolvers: Solver[] = [];
    const wrongSolvers: Solver[] = [];

    solvers.forEach((solver) => {
      if (solver.answer === correctAnswer) {
        rightSolvers.push(solver); // 정답자 추가
      } else {
        wrongSolvers.push(solver); // 오답자 추가
      }
    });

    // Zustand 상태 업데이트
    set(() => ({ rightSolvers, wrongSolvers }));
  },
}));

export default useResultStore;
