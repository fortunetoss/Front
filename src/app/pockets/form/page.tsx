"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import usePocketStore from "../../store/usePocket";
import Notice from "../../../components/notice";
import { fetchRandomQuestion, submitCustomQuestion } from "../../../api/api-form";
import { randomProblems } from "../../../utils/problem";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";

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
        <div>
            <Header>
                <BackButton/>
            </Header>
            <div className="container mx-auto p-6">
                <Notice text="문제와 답변은 수정 가능해요!"/>
                {/* 질문 입력 */}
                <div className="mb-4">
                    <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setTitle(title)} // 입력 필드 벗어나면 저장
                        placeholder="질문을 입력하세요"
                        className="w-full text-2xl placeholder-black text-center p-3 mb-6 bg-white resize-none break-words"
                        style={{
                            wordBreak: "break-word", // 단어 줄바꿈
                            whiteSpace: "pre-wrap",  // 공백 및 줄바꿈 유지
                            overflowWrap: "break-word", // 강제 줄바꿈
                        }}
                        rows={2} // 기본 높이 설정
                    />
                </div>


                {answers.map((answer, index) => (
                    <div
                        key={index}
                        className={`flex items-center text-xl space-x-2 mb-4 p-5 border-2 rounded-full ${
                            selectedAnswer === index ? "bg-blue text-white" : "bg-white text-black"
                        }`}
                    >
                        <input
                            type="text"
                            value={editingIndex === index ? editingText : answer}
                            readOnly={editingIndex !== index} // 수정 중이 아닐 때는 읽기 전용
                            onChange={(e) => setEditingText(e.target.value)} // 수정 중일 때만 값 변경
                            className={`flex-grow border-none outline-none bg-transparent ${
                                editingIndex === index ? "bg-gray-50 text-black p-2 rounded-full" : ""
                            }`}
                            onClick={() => {
                                if (editingIndex !== index) {
                                    setSelectedAnswer(index);
                                    // 보기 모드에서 클릭 시 답변 선택
                                }
                            }}
                        />
                        {editingIndex === index ? (
                            <button
                                className="text-red-500"
                                onClick={() => handleSaveEdit(index)} // 수정 저장
                            >
                                저장
                            </button>
                        ) : (
                            <button
                                className="text-blue-500 flex items-center"
                                onClick={() => {
                                    setEditingIndex(index);
                                    setEditingText(answer);
                                }}
                            >
                                <FaPencilAlt className="mr-1"/>
                            </button>
                        )}
                    </div>
                ))}


                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSubmit}
                        className={`px-6 py-2 rounded text-xl transition ${
                            selectedAnswer !== null
                                ? "text-blue hover:text-blue-700"
                                : "text-black"
                        }`}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Form;
