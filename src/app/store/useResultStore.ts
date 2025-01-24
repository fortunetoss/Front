import { create } from "zustand";
import { Solver } from "@/api/api-result-data";

// 상태 타입 정의
interface ResultState {
    RightSolvers: Solver[];
    WrongSolvers: Solver[];
}

// 액션 타입 정의
interface ResultActions {
    setRightSolvers: (solvers: Solver[]) => void;
    setWrongSolvers: (solvers: Solver[]) => void;
}


type ResultStore = ResultState & ResultActions;


const useResultStore = create<ResultStore>((set) => ({

    RightSolvers: [],
    WrongSolvers: [],

    setRightSolvers: (solvers) => set(() => ({ RightSolvers: solvers })),
    setWrongSolvers: (solvers) => set(() => ({ WrongSolvers: solvers })),
}));

export default useResultStore;
