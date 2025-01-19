import React, {useEffect} from "react";
import {useState} from "react";
import useResultStore from "@/app/store/useResultStore";


interface ResultModalProps{
    isOpen:boolean;
    onClose:() => void;

}

const ResultModal: React.FC<ResultModalProps> = ({isOpen, onClose}) => {
    if(!isOpen) return null;
    const [activeTab, setActiveTab] = useState<"correct" | "incorrect">("correct");
    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
    const [error, setError] = useState<string | null>(null); // 에러 상태
    const { RightSolvers, WrongSolvers } = useResultStore();



    const SolversList=() => {
        let solvers;
        if (loading) {
            return <p className="text-center text-gray-500">로딩 중...</p>;
        }
        if (activeTab === "correct") {
            solvers = RightSolvers;
            // zustand 에서 가져온거
        } else {
            solvers = WrongSolvers;
        }

        if (solvers.length === 0) {
            return (
                <p className="text-gray-500 text-xl text-center">아직 응답한 사람이 없어요! </p>
            );
        }
        // 만약 정답자 오답자 한명도 없다면 아직 응답한 사람이 한명도 없다는 거니까 응답한 사람이 없다고 반환하기
        return (
            <ul className="space-y-3">
                {solvers.map((solver, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xl">
                        <span className="font-semibold">{solver.solver}</span>
                        <span className="font-semibold">{solver.answer}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end  z-50">
            <div className="bg-white mb-10 rounded-lg  max-w-screen-sm w-8/12  p-6 pb-36 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="flex inset-0 justify-end items-end mb-4">
                    <button
                        className={`flex-1 py-2 text-xl ${
                            activeTab === "correct" ? "border-b-2 border-black" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("correct")}
                    >
                        정답자
                    </button>
                    <button
                        className={`flex-1 py-2 text-xl ${
                            activeTab === "incorrect" ? "border-b-2 border-black" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("incorrect")}
                    >
                        오답자
                    </button>
                </div>
                <p className="text-m text-gray-500">
                    총 {activeTab === "correct" ? RightSolvers.length : WrongSolvers.length}명
                </p>
                <div className="overflow-y-auto max-h-60">{SolversList()}</div>

            </div>
        </div>
    );
};

export default ResultModal;
