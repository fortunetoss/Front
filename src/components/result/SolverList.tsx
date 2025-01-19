// 정답자 오답자 렌더링 함 . .



import React from "react";
import { Solver } from "@/api/api-result-data";

interface SolversListProps {
    solvers: Solver[];
    loading: boolean;
    activeTab: "correct" | "incorrect"; // 현재 탭 정보

}

const SolversList:React.FC<SolversListProps> =({solvers,loading,activeTab})=> {

    if (!solvers|| solvers.length === 0) {
        return (
            <p className="text-gray-500 text-xl text-center">아직 응답한 사람이 없어요! </p>
        );
    }
    // 만약 정답자 오답자 한명도 없다면 아직 응답한 사람이 한명도 없다는 거니까 응답한 사람이 없다고 반환하기
    return (
        <ul className="space-y-3">
            {solvers.map((solver, index) => (
                <li key={index} className="flex items-center justify-between">
                    <span className="font-semibold">{solver.solver}</span>
                    <span
                        className={`py-1 px-2 rounded-full text-white text-sm ${
                            activeTab === "correct" ? "bg-blue" : "bg-yellow-500"
                        }`}
                    >
                        {solver.answer}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default SolversList;
