import React, { useEffect } from "react";
import { useState } from "react";
import useResultStore from "@/app/store/useResultStore";
import SolverList from "@/components/result/SolverList";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"correct" | "incorrect">(
    "correct",
  );
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const { rightSolvers, wrongSolvers } = useResultStore();

  if (!isOpen) return null;

  const solvers = activeTab === "correct" ? rightSolvers : wrongSolvers;

  return (
    <div className="fixed inset-0 h-screen bg-black bg-opacity-50 flex  justify-center items-end mb-10   z-50">
      <div className="relative inset-0 bg-white rounded-lg mb-8  px-4 py-8  w-11/12 max-w-sm shadow-lg ">
        <button
          className="absolute right-6 text-2xl bottom-3/4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex inset-0 justify-end items-end mb-4">
          <button
            className={`flex-1 py-2 text-xl ${
              activeTab === "correct"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("correct")}
          >
            정답자
          </button>
          <button
            className={`flex-1 py-2 text-xl ${
              activeTab === "incorrect"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("incorrect")}
          >
            오답자
          </button>
        </div>
        <p className="text-m text-gray-500">
          총{" "}
          {activeTab === "correct" ? rightSolvers.length : wrongSolvers.length}
          명
        </p>
        <div className="overflow-y-auto max-h-60">
          <SolverList solvers={solvers} loading={false} activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
