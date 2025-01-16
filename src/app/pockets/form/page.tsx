"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import usePocketStore from "../../store/usePocket";
import Notice from "../../../components/notice";
import { fetchRandomQuestion, submitCustomQuestion } from "../../../api/api-form";
import { randomProblems } from "../../../utils/problem";

const Form = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectOption = searchParams.get("select"); // 쿼리 파라미터

    const { domain, title, answers, correctAnswer,setTitle, setAnswers,setCorrectAnswer,setStep} = usePocketStore();
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // 수정 중인 답변 인덱스
    const [editingText, setEditingText] = useState<string>(""); // 수정 중인 텍스트

    // 랜덤 질문 가져오기
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await fetchRandomQuestion();
                if (
                    data &&
                    typeof data.title === "string" &&
                    typeof data.select1 === "string" &&
                    typeof data.select2 === "string" &&
                    typeof data.select3 === "string" &&
                    typeof data.select4 === "string"
                ) {
                    setTitle(data.title);
                    setAnswers([data.select1, data.select2, data.select3, data.select4]);
                } else {
                   // console.error("API 응답 형식이 잘못되었습니다:", data);
                }
            } catch (error) {
                console.error("랜덤 질문 가져오기 실패:", error);
                const fallback = randomProblems[Math.floor(Math.random() * randomProblems.length)];
                setTitle(fallback.title);
                setAnswers([fallback.select1, fallback.select2, fallback.select3, fallback.select4]);
            }
        };

        fetchQuestion();
    }, []);


    // 답변 수정 저장
    const handleSaveEdit = (index: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = editingText;
        setAnswers(updatedAnswers); // 답변 업데이트
        setEditingIndex(null); // 수정 모드 종료
        setEditingText(""); // 수정 텍스트 초기화
    };

    // 제출
    const handleSubmit = async () => {
        if (selectedAnswer === null) {
            alert("답변을 선택해주세요!");
            return;
        }

        const correctAnswer = answers[selectedAnswer];
        setCorrectAnswer(correctAnswer);



        // Zustand 상태 업데이트
        /*
        setTitle(localTitle);
        setAnswers(updateAnswers);
        setCorrectAnswer(correctAnswer);

         */


        if (selectOption === "problem") {
            try {
                const { questionId } = await submitCustomQuestion(
                    title,
                    answers,
                    correctAnswer,
                    null, // card = null
                    domain,
                    null, // content = null
                );
                console.log("ID:",questionId);

                // Complete URL 생성 및 이동
                router.push("/pockets/complete");
            } catch (error) {
                console.error("데이터 전송 중 오류 발생:", error);
                alert("문제를 전송하는 중 문제가 발생했습니다.");
            }
        } else if (selectOption === "together") {
            setStep(3);
            router.push("/pockets/form/letter");
        } else {
            alert("올바르지 않은 선택값입니다.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Notice text="문제와 답변은 수정 가능합니다." />

            {/* 질문 입력 */}
            <div className="mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="질문을 입력하세요"
                    className="w-full text-3xl placeholder-black text-center p-2"
                />
            </div>

            {/* 답변 입력 */}
            {answers.map((answer, index) => (
                <div
                    key={index}
                    className={`flex items-center text-xl space-x-2 mb-4 p-5 border-2 rounded-full ${
                        selectedAnswer === index ? "bg-blue text-white" : "bg-gray-100 text-black"
                    }`}
                >
                    {editingIndex === index ? (
                        <>
                            <input
                                type="text"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                className="flex-grow bg-gray-50 border border-gray-300 rounded-lg p-2"
                            />
                            <button
                                className="text-green-500"
                                onClick={() => handleSaveEdit(index)}
                            >
                                저장
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={answer}
                                readOnly
                                className="flex-grow bg-transparent border-none outline-none"
                                onClick={() => setSelectedAnswer(index)}
                            />
                            <button
                                className="text-blue-500 flex items-center"
                                onClick={() => {
                                    setEditingIndex(index);
                                    setEditingText(answer);
                                }}
                            >
                                <FaPencilAlt className="mr-1" />
                            </button>
                        </>
                    )}
                </div>
            ))}

            {/* 제출 버튼 */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded text-xl text-red-600"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default Form;
