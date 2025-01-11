"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePocketStore from "../../store/usePocket";
import Notice from "@/app/components/notice";
import { FaPencilAlt } from "react-icons/fa"; // 아이콘 추가
import {authApiClient} from "@/api/api-client";


// 랜덤 질문 가져오기 - GET
const fetchRandomQuestion = async () => {
    try {
        const response = await authApiClient.get("/api/pouch/question");
        return response.data.data;
    } catch (error:any) {
        console.error("랜덤 질문 가져오기 실패:", error);
        console.error(error.response?.data);
        throw new Error("랜덤 질문 가져오기 실패");
    }
};

// 문제 제출 - POST
const submitCustomQuestion = async (
    title: string,
    answers: string[],
    correctAnswer: string | null,
    content: string | null,
    shape: string | null,
    card: string | null,
    paper: string | null
) => {
    try {
        const response = await authApiClient.post("/api/questionCustom", {
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
    } catch (error) {
        console.error("문제 제출 중 오류 발생:", error);
        throw new Error("문제 제출에 실패했습니다.");
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

    // 랜덤 질문 가져오기
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await fetchRandomQuestion();

                // 데이터 검증
                if (
                    data &&
                    typeof data.title === "string" &&
                    typeof data.select1 === "string" &&
                    typeof data.select2 === "string" &&
                    typeof data.select3 === "string" &&
                    typeof data.select4 === "string"
                ) {
                    // 상태 업데이트
                    setTitle(data.title);
                    updateAnswers([data.select1, data.select2, data.select3, data.select4]);
                } else {
                    console.error("API 응답 형식이 잘못되었습니다:", data);
                    alert("랜덤 질문을 가져오는 중 문제가 발생했습니다.");
                }
            } catch (error) {
                console.error("랜덤 질문 가져오기 실패:", error);
                alert("랜덤 질문을 가져오는 데 실패했습니다.");
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

        // POST 요청 데이터 구성
        const postData = {
            title,
            select1: answers[0],
            select2: answers[1],
            select3: answers[2],
            select4: answers[3],
            answer: selectedAnswerText, // 선택된 정답
            content: selectOption === "problem" ? null : contentInput,
            shape: selectOption === "problem" ? null : shape,
            card: selectOption === "problem" ? null : card,
            paper: selectOption === "problem" ? null : paper,
        };

        try {
            // POST 요청
            const response = await submitCustomQuestion(
                postData.title,
                [postData.select1, postData.select2, postData.select3, postData.select4],
                postData.answer,
                postData.content,
                postData.shape,
                postData.card,
                postData.paper
            );
            console.log("POST 성공:", response);


            // 응답 데이터에서 questionCustomId와 shape 추출
            const { questionCustomId, shape: responseShape } = response;

            // 페이지 이동 (응답 데이터 포함)
            router.push(`/pockets/complete?questionCustomId=${questionCustomId}&shape=${responseShape}`);
        } catch (error) {
            console.error("데이터 전송 중 오류 발생:", error);

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

                {/* 답변 입력 및 선택 */}
                {answers.map((answer, index) => (
                    <div
                        key={index}
                        className={`flex items-center text-xl space-x-2 mb-4 p-5 border-2 rounded-full cursor-pointer ${
                            selectedAnswer === index ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
                        }`}
                        onClick={() => setSelectedAnswer(index)} // 클릭 시 정답 선택 및 배경색 변경
                    >
                        {/* 정답 선택 */}
                        <input
                            type="text"
                            value={answer}
                            readOnly
                            className="flex-grow bg-transparent border-none outline-none cursor-pointer"
                        />

                        {/* 수정 버튼 */}
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
