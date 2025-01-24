"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import usePocketStore from "../../store/usePocket";
import useModifiedStore from "../../../app/store/modifiedStore";
import Notice from "../../../components/notice";
import {
  fetchRandomQuestion,
  submitCustomQuestion,
} from "../../../api/api-form";
import { postEdit } from "../../../api/api-postEdit";
import Header from "@/components/header/header";
import BackButton from "@/components/header/back-button";
import { useInputLimit } from "@/hooks/useInputLimit";

const MAX_TITLE_LENGTH = 30;
const MAX_ANSWER_LENGTH = 25;

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectOption = searchParams.get("select"); // 쿼리 파라미터

  const {
    domain,
    title,
    answers,
    correctAnswer,
    setTitle,
    setAnswers,
    setCorrectAnswer,
    setStep,
    questionId,
  } = usePocketStore();
  const { isModified, setModified } = useModifiedStore();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  // 랜덤 질문 가져오기
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await fetchRandomQuestion();
        if (data) {
          setTitle(data.title);
          setAnswers([data.select1, data.select2, data.select3, data.select4]);
        }
      } catch (error) {
        console.error("랜덤 질문 로드 실패:", error);
      }
    };

    fetchQuestion();
  }, [setTitle, setAnswers]);

  // 질문 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= MAX_TITLE_LENGTH) {
      setTitle(inputText);
    } else {
      alert(`질문은 최대 ${MAX_TITLE_LENGTH}자까지 입력 가능합니다.`);
    }
  };

  // 답변 입력 핸들러
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= MAX_ANSWER_LENGTH) {
      setEditingText(inputText);
    } else {
      alert(`답변은 최대 ${MAX_ANSWER_LENGTH}자까지 입력 가능합니다.`);
    }
  };

  // 답변 수정 저장
  const handleSaveEdit = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = editingText;
    setAnswers(updatedAnswers);
    setEditingIndex(null);
    setEditingText("");
  };

  // 제출
  const handleSubmit = async () => {
    if (selectedAnswer === null) {
      alert("답변을 선택해주세요!");
      return;
    }

    setCorrectAnswer(answers[selectedAnswer]); // 선택된 정답 저장

    try {
      if (selectOption === "together") {
        setStep(2);
        router.push("/pockets/form/letter");
        return;
      }
      // 수정 여부에 따라 API 호출
      if (isModified && questionId) {
        await postEdit(
          title,
          answers,
          answers[selectedAnswer],
          null,
          domain,
          null
        );
        alert("복주머니가 수정되었습니다!");
      } else {
        await submitCustomQuestion(
          title,
          answers,
          answers[selectedAnswer],
          null,
          domain,
          null
        );
      }

      // 선택 옵션에 따라 페이지 이동
      if (selectOption === "problem") {
        setStep(3); // 문제 제출 완료
        router.push("/pockets/complete");
      }
    } catch (error) {
      console.error("문제 처리 실패:", error);
      alert("문제를 처리하는 중 오류가 발생했습니다.");
    }
  };
  // 질문과 답변 입력 핸들러 훅
  /*
  const { value: title, onChange: handleTitleChange } = useInputLimit(MAX_TITLE_LENGTH);
  const { value: editingText, onChange: handleAnswerChange } = useInputLimit(MAX_ANSWER_LENGTH);


   */

  return (
    <div>
      <Header>
        <BackButton />
      </Header>
      <div className="container mx-auto p-6 bg-white">
        <Notice text="문제와 답변은 수정 가능해요!" />

        {/* 질문 입력 */}
        <div className="mb-4">
          <textarea
            value={title}
            onChange={handleTitleChange}
            placeholder="질문을 입력하세요"
            className="w-full text-2xl placeholder-black text-center p-3 mt-4 mb-6 bg-white  break-words"
            rows={2}
          />
        </div>

        {/* 답변 리스트 */}
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`flex items-center text-xl space-x-2 mb-4 p-5 border-2 rounded-full ${
              selectedAnswer === index
                ? "bg-blue text-white"
                : "bg-white text-black"
            }`}
          >
            <input
              type="text"
              value={editingIndex === index ? editingText : answer}
              readOnly={editingIndex !== index}
              onChange={handleAnswerChange}
              className={`flex-grow text-center border-none outline-none bg-transparent ${
                editingIndex === index
                  ? "bg-gray-50 text-black rounded-full"
                  : ""
              }`}
              onClick={() => setSelectedAnswer(index)}
            />
            {editingIndex === index ? (
              <button
                className="text-white"
                onClick={() => handleSaveEdit(index)}
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
                <FaPencilAlt className="mr-1" />
              </button>
            )}
          </div>
        ))}

        {/* 다음 버튼 */}
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
