"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePocketStore from "../../store/usePocket";
import Notice from "@/app/components/notice";
import { FaPencilAlt } from "react-icons/fa"; // 아이콘 추가
import axios from 'axios';


// Axios 설정
const api = axios.create({
    baseURL: "http://localhost:8080",
});


// 랜덤 질문 가져오기 - GET
const fetchRandomQuestion = async () => {
    const response = await api.get("/api/pouch/question");
    return response.data;
};



// 문제 제출 - POST
const submitCustomQuestion = async (
    title: string,
    answers: string[],
    correctAnswer: string | null,
    content: string | null,
    shape: string,
    card: string,
    paper: string
) => {
    try {
        const response = await api.post("/api/questionCustom", {
            title,
            select1: answers[0],
            select2: answers[1],
            select3: answers[2],
            select4: answers[3],
            answer: correctAnswer,
            content,
            shape,
            card,
            paper,
        });

        return response.data; // { questionCustomId, shape }
    } catch (error: any) {
        console.error("문제 제출 중 오류 발생:", error.response || error.message);
        throw new Error("문제 제출에 실패했습니다.");
    }
};



// questionCustomId를 기반으로 데이터 가져오기 - GET
const fetchGeneratedAnswer = async (questionCustomId: string) => {
    try {
        const response = await api.get(`/api/answer/${questionCustomId}`);
        return response.data;
    } catch (error: any) {
        console.error("데이터 가져오기 중 오류 발생:", error.response || error.message);
        throw new Error("데이터 가져오기에 실패했습니다.");
    }
};



const Form = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectOption = searchParams.get("select"); // 쿼리 파라미터로 전달된 select 값 가져오기

    // Zustand 상태 관리
    const { setQuestion, setAnswers, setCorrectAnswer, setContent } = usePocketStore();

    // 폼 상태 관리
    const [title, setTitle] = useState<string>(""); // 질문 상태
    const [answers, updateAnswers] = useState<string[]>(["", "", "", ""]); // 답변 상태
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // 선택된 정답
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // 현재 수정 중인 답변 인덱스
    const [contentInput, setContentInput] = useState<string>(""); // 덕담 입력 상태



    useEffect(() => {
        // 랜덤 문제 가져오기
        const fetchQuestion = async () => {
            try {
                const data = await fetchRandomQuestion();
                setTitle(data.title);
                updateAnswers([data.select1, data.select2, data.select3, data.select4]);
            } catch (error) {
                console.error("랜덤 문제 가져오기 실패:", error);
            }
        };

        fetchQuestion();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Zustand에서 전역 상태 가져오기
        const { shape, card, paper } = usePocketStore.getState();

        // 선택된 정답 텍스트 가져오기
        const selectedAnswerText = selectedAnswer !== null ? answers[selectedAnswer] : null;

        // Zustand 상태 업데이트
        setQuestion(title);
        setAnswers(answers);
        if (selectedAnswer !== null) {
            setCorrectAnswer(answers[selectedAnswer]);
        }

        // 조건부 상태 업데이트 (select=together일 때만 letter 포함)
        if (selectOption === "together") {
            setContent(contentInput); // 사용자가 입력한 덕담을 Zustand에 저장
        }

        // POST 요청 데이터 구성
        const postData = {
            question: title,
            answers,
            correctAnswer: selectedAnswerText,
            content: selectOption === "together" ? contentInput : null, // 덕담은 선택적으로 포함
            shape: shape || "",
            card: card || "",
            paper: paper || "",
        };

        try {
            // POST 요청
            const response = await submitCustomQuestion(
                postData.question,
                postData.answers,
                postData.correctAnswer || "",
                postData.content || "",
                postData.shape,
                postData.card,
                postData.paper
            );

            console.log("POST 성공:", response);

            // 응답 데이터에서 questionCustomId와 shape 추출
            const { questionCustomId, shape: responseShape } = response;

            // GET 요청 (추가 데이터 가져오기)
            const generatedAnswer = await fetchGeneratedAnswer(questionCustomId);
            console.log("데이터 받아오기 성공:", generatedAnswer);

            // 페이지 이동 (응답 데이터 포함)
            router.push(`/pockets/complete?questionCustomId=${questionCustomId}&shape=${responseShape}`);
        } catch (error) {
            console.error("데이터 전송 중 오류 발생:", error);

            // 사용자에게 오류 알림
            alert("복주머니 만드는 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Notice text="문제와 답변은 수정 가능해요" />
            <form onSubmit={handleSubmit}>
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
                        className={`flex items-center text-xl space-x-2 mb-4 p-5 border-2 rounded-full cursor-pointer ${
                            selectedAnswer === index ? "bg-blue-500 text-white" : "bg-white-100 text-black"
                        }`}
                        onClick={() => setSelectedAnswer(index)}
                    >
                        {/* 수정 중인 상태 */}
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => {
                                    const updated = [...answers];
                                    updated[index] = e.target.value;
                                    updateAnswers(updated);
                                }}
                                onBlur={() => setEditingIndex(null)}
                                autoFocus
                                className="flex-grow bg-white border border-gray-300 p-2 rounded"
                                onClick={(e) => e.stopPropagation()} // 부모 클릭 방지
                            />
                        ) : (
                            <span className="flex-grow">{answer}</span> // 텍스트 상태
                        )}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditingIndex(index);
                            }}
                            className="text-blue-500 flex items-center"
                        >
                            <FaPencilAlt className="mr-1" />
                        </button>
                    </div>
                ))}

                {/* 제출 버튼 */}
                <div className="flex justify-end mt-4">
                    <button type="submit" className="text-blue-500 px-6 py-2 rounded text-xl">
                        다음
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
