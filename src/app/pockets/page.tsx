"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import usePocketStore from "../store/usePocket";
import { fetchLuckyPouches } from "../../api/api-form";
import Notice from "../../components/notice";
import {validatePouches,Pouch} from "../../utils/validation/validationPouch";

const Pockets = () => {
  const router = useRouter();
  const [pouches, setPouches] = useState<(Pouch & { isFilled: boolean })[]>([]); // 채워져 있음 여부 추가
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0); // 페이지 번호
  const [isLastPage, setIsLastPage] = useState<boolean>(false); // 마지막 페이지 여부
  const { setDomain, setStep, setQuestionCustomId } = usePocketStore();
  // 퍼널 관리랑 선택한 복주머니 저장하기 위함


  //    const setPocketIndex = usePocketStore((state) => state.setPocketIndex);

  // 로그인 후에 복주머니 가져오기
  const loadPouches = async (page: number) => {
    try {
      const data = await fetchLuckyPouches(page);



      if (data) {
        const validatedPouches = validatePouches(data.content);
        //검증로직
        setPouches((prev) => [...prev, ...validatedPouches]); // 기존 데이터에 검증된 데이터 추가
        setIsLastPage(data.last); // 마지막 페이지 여부 갱신
      }
    } catch (error) {
      console.error("복주머니 데이터를 가져오는 데 실패했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 첫 페이지 데이터 로드
  useEffect(() => {
    loadPouches(0); // 첫 페이지 요청
  }, []);

  // 다음 페이지 데이터 로드 - 무한스크롤
  const handleLoadMore = () => {
    if (!isLastPage) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
      loadPouches(page + 1); // 다음 페이지 데이터 요청
    }
  };

  // 복주머니 선택 핸들러
  const handlePouchSelect = (domain: string, questionCustomId: number | null) => {
    // 상태 업데이트
    setDomain(domain);
    setQuestionCustomId(questionCustomId || 0); // null일 경우 0으로 설정
    setStep(1);

    console.log("Domain:", domain, "QuestionCustomId:", questionCustomId);

    if (questionCustomId) {
      // 이미 채워져 있는 경우
      router.push(`/result?questionCustomId=${questionCustomId}`);
      // 결과지 페이지로 이동
    } else {
      // 비어 있는 경우
      router.push("/pockets/select"); // /select 페이지로 이동
    }
  };

  // 문제내기 vs 덕담 까지
  /*
  const handleCreateProblem = () => {
    router.push("/pockets/select");
  };

   */

  return (
    <div className="container mx-auto p-10">
      <Notice text="문제를 내고 복주머니를 전달하세요!" />
      <div className="grid grid-cols-2 gap-y-6">
        {/* 복주머니 리스트 */}
        {pouches.map((pouch) => (
            <div
                key={pouch.domain}
                className={`relative max-w-[200px] max-h-screen mx-auto ${
                    pouch.isFilled ? "bg-gray-200" : "bg-white"
                }`} // 채워진 복주머니는 다른 배경색으로 표시
            >
              <div
                  onClick={() => handlePouchSelect(pouch.domain, pouch.questionCustomId)}
                  className="p-4 border rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-100"
              >
                <img
                    src={`/images/pouches/${pouch.domain}.png`} // domain 값에 따라 이미지 렌더링
                    alt={`복주머니`}
                    className="mx-auto mb-2 w-24 h-24"
                />
                {pouch.isFilled && <p className="text-red-500 mt-2">채워져 있음</p>}
                {!pouch.isFilled && <p className="text-green-500 mt-2">문제 내러 가기 </p>}
              </div>

            </div>
        ))}
      </div>
      {!isLastPage && (
          <div className="flex justify-center mt-6">
            <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              더 보기
            </button>
          </div>
      )}
    </div>
  );
};

export default Pockets;
