import { create } from "zustand";
import { Solver } from "@/api/api-result-data";

// 상태 타입 정의
interface ResultState {
  rightSolvers: Solver[];
  wrongSolvers: Solver[];
}

// 액션 타입 정의
interface ResultActions {
  setRightSolvers: (solvers: Solver[]) => void;
  setWrongSolvers: (solvers: Solver[]) => void;
}

type ResultStore = ResultState & ResultActions;

const useResultStore = create<ResultStore>((set) => ({
  rightSolvers: [],
  wrongSolvers: [],

  setRightSolvers: (solvers) => set(() => ({ rightSolvers: solvers })),
  setWrongSolvers: (solvers) => set(() => ({ wrongSolvers: solvers })),
}));

export default useResultStore;
