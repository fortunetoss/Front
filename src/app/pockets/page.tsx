"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import usePocketStore from "../store/usePocket";
import { fetchLuckyPouches } from "../../api/api-form";
import Notice from "../../components/notice";
import {validatePouches,Pouch} from "../../utils/validation/validationPouch";
import {getPouch} from "@/utils/images/domain";

const Pockets = () => {
  const router = useRouter();
  const [pouches, setPouches] = useState<(Pouch & { isFilled: boolean })[]>([]); // 채워져 있음 여부 추가
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0); // 페이지 번호
  const [isLastPage, setIsLastPage] = useState<boolean>(false); // 마지막 페이지 여부
  const {setDomain, setStep, setQuestionCustomId} = usePocketStore();
  // 퍼널 관리랑 선택한 복주머니 저장하기 위함


  // 로그인 후에 복주머니 가져오기
  const loadPouches = async (page: number) => {
    try {
      const data = await fetchLuckyPouches(page);


      if (data) {
        const validatedPouches = validatePouches(data.content).map((pouch,idx)=>({
          ...pouch,
          index: idx + page * data.content.length, // 고유 인덱스 부여
        }));
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
  const handlePouchSelect = async (domain: string, questionCustomId: number | null, index:number) => {
    // 상태 업데이트
    setDomain(domain);
    setQuestionCustomId(questionCustomId);
    setStep(1);


    if (questionCustomId !== null) {
      // 이미 채워져 있는 경우
      await router.push(`/result?questionCustomId=${questionCustomId}`);
      // 결과지 페이지로 이동
    } else {
      // 비어 있는 경우
      await router.push("/pockets/select");
    }
  };


  // @ts-ignore
  return (
      <div className="container mx-auto p-10">
        <Notice text="문제를 내고 복주머니를 전달하세요!"/>
        <div className="grid grid-cols-2 gap-y-4">
          {pouches.map((pouch, index) => (
              <div
                  key={`${pouch.domain}-${index}`}
                  className={`relative p-4 text-center cursor-pointer ${
                      pouch.isFilled ? "hover:bg-gray-100" : "hover:bg-gray-100"
                  }`}
                  onClick={() =>
                      handlePouchSelect(pouch.domain, pouch.questionCustomId, pouch.index)
                  } // 클릭 이벤트 핸들러를 외부 div에 바로 연결
              >
                <div
                    className="relative"
                    style={{
                      filter: pouch.isFilled ? "none" : "blur(4px)",
                    }}
                >
                  <img
                      src={getPouch(pouch.domain)}
                      alt={`복주머니 ${pouch.domain}`}
                      className="mx-auto w-30 h-30"
                  />
                </div>

                {!pouch.isFilled && (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{zIndex: 10}}
                    >
                      <p className="text-gray-900 bg-white p-2 border-black border rounded-full ">문제내기</p>
                    </div>
                )}
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
