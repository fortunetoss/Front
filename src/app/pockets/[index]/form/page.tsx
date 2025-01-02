// 복주머니 인덱스에 따라 각각 다른 데이터 동적라우트
// 질문 답변 적는거...


"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation"; //  URL 경로 가져오기
import { FaPencilAlt } from "react-icons/fa"; // 연필 아이콘
import {FaFlag} from "react-icons/fa"; //깃발 아이콘
import { useRouter } from "next/navigation"; // useRouter 가져오기


const Page = () => {
    const router = useRouter(); // router 객체 가져오기

    const pathname = usePathname(); // 현재 경로 가져오기
    const pocketIndex = pathname.split("/")[2]; // 경로에서 복주머니 인덱스 추출

    const [question, setQuestion] = useState<string>(""); // 질문
    const [answers, setAnswers] = useState<string[]>(["수영", "테니스", "헬스", "요가"]); // 기본 답변 배열
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // 선택된 정답의 인덱스
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // 현재 수정 중인 답변 인덱스

    // 질문 변경
    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };



    // 답변 변경
    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    // 정답 선택/해제
    const handleSelectAnswer = (index: number) => {
        if (editingIndex !== null) return; // 수정 중이면 정답 선택 불가
        setSelectedAnswer((prev) => (prev === index ? null : index));
    };

    // 수정 시작
    const handleEditAnswer = (index: number) => {
        setEditingIndex(index);
    };

    // 수정 완료
    const handleFinishEditing = () => {
        setEditingIndex(null);
    };

    // 폼 제출
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!question.trim()) {
            alert("질문을 입력해주세요!");
            return;
        }

        if (answers.length === 0 || answers.some((a) => !a.trim())) {
            alert("모든 답변을 입력해주세요!");
            return;
        }


        router.push(`/pockets/${pocketIndex}/form/letter`);



        const Forms = {
            pocketIndex, // 현재 복주머니 인덱스 포함
            question,
            answers,
            correctAnswer: selectedAnswer !== null ? answers[selectedAnswer] : null,
        };

        console.log("질문지 생성:", JSON.stringify(Forms, null, 2));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">질문 작성</h1>
            <div className="flex items-center space-x-3  bg-gray-100 mb-10 p-5">
                <FaFlag className="text-gray-500"/>
                <span className="text-gray-600 text-xl ">문제와 답변은 수정이 가능해요</span>
            </div>
            <form onSubmit={handleSubmit}>
                {/* 질문 입력 */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                        placeholder="길동이가 올해 가장 열심이었던 운동은? "
                        className="w-full  text-3xl placeholder-black text-center p-2 rounded"
                    />
                </div>

                {/* 답변 리스트 */}
                <div>
                    {answers.map((answer, index) => (
                        <div
                            key={index}
                            className={`flex items-center text-xl text-center space-x-2 mb-4 p-5 border-2 border-black-3 rounded-full cursor-pointer ${
                                selectedAnswer === index ? "bg-red-500 text-white" : "bg-white-100 border-3"
                            }`}
                            onClick={() => handleSelectAnswer(index)} // 정답 선택
                        >
                            {/* 수정 중 상태 */}
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    onBlur={handleFinishEditing} // 포커스 해제 시 수정 완료
                                    autoFocus
                                    className="flex-grow border p-2 rounded bg-white"
                                    onClick={(e) => e.stopPropagation()} // 부모 클릭 방지
                                />
                            ) : (
                                <span className="flex-grow">{answer}</span> // 일반 텍스트 상태
                            )}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation(); // 부모 클릭 이벤트 방지
                                    handleEditAnswer(index);
                                }}
                                className="text-blue-500 flex items-center"
                            >
                                <FaPencilAlt className="mr-1" />
                            </button>

                        </div>
                    ))}

                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className=" text-red-700 px-4 py-2 rounded text-xl "
                    >
                        다음
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;
