"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import usePocketStore from "../store/usePocket";
import { fetchLuckyPouches } from "../../api/api-form";
import Notice from "../../components/notice";
import {validatePouches,Pouch} from "../../utils/validation/validationPouch";
import {getPouch} from "@/utils/images/domain";
import Header from "@/components/header/header";
import Logo from "@/components/header/logo";
import OpenSettingButton from "@/components/header/open-setting-button";

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
      setIsLoading(true);
      const data = await fetchLuckyPouches(page);

      if (data) {
        const validatedPouches = validatePouches(data.content).map((pouch) => ({
          ...pouch,
        }));
        setPouches(validatedPouches); // 기존 데이터 초기화 후 새 데이터 설정
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
    const fetchData = async () => {
      await loadPouches(0); // 데이터 로드
    };

    fetchData();
  }, []);

  // 다음 페이지 데이터 로드 - 무한스크롤
  /*
  const handleLoadMore = () => {
    if (!isLastPage) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
      loadPouches(page + 1); // 다음 페이지 데이터 요청
    }

  };

   */

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage !== page) {
      setPage(newPage);
      //setPouches([]); // 페이지 변경 시 기존 데이터를 초기화 (필요 시 제거 가능)
      loadPouches(newPage);
      window.scrollTo(0, 0); // 페이지 변경 시 스크롤 상단으로 이동

    }
  };

  // 복주머니 선택 핸들러
  const handlePouchSelect = async (
      domain: string,
      questionCustomId: number | null,
      index: number
  ) => {
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



  return (
      <div>
        <Header>
          <Logo/>
          <OpenSettingButton/>
        </Header>

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
          <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center shadow-lg">
            {/* 페이지 버튼 */}
            {Array.from({ length: page + 1 }, (_, index) => (
                <button
                    key={index}
                    onClick={() => {
                      if (index !== page) handlePageChange(index); // 중복 호출 방지
                    }}
                    className={`px-4 py-2 mx-1 rounded ${
                        page === index ? " text-red-600 font-bold" : " text-black"
                    }`}
                >
                  {index + 1}
                </button>
            ))}

            {!isLastPage && (
                <button
                    onClick={() => {
                      const nextPage = page + 1;
                      handlePageChange(nextPage);
                    }}
                    className="px-4 py-2 mx-1 text-black "
                >
                  {page + 2}
                </button>
            )}
          </div>
        </div>
  );
};
export default Pockets;
