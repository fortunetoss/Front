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
import {useInfiniteScroll} from "@/components/scroll/useInfiniteScroll";
import InfiniteScroll from "@/components/scroll/InfiniteScroll";

const Pockets = () => {
  const router = useRouter();
  const {setDomain, setStep, setQuestionCustomId} = usePocketStore();
  const [currentPage, setCurrentPage] = useState(0); // 페이지 상태 추가

  // 퍼널 관리랑 선택한 복주머니 저장하기 위함

  const { pouches, loadMorePouches, loadPreviousPouches, isLastPage, setPouches,isFirstPage,isLoading } = useInfiniteScroll();

  // 초기데이터 로드
  // page=0 으로 a해서 로그인하면 맨첫번째 8개 데이터 가져오기
  // 초기 데이터를 로드하는 함수
  // 로그인 후에 복주머니 가져오기
  const loadPouches = async (page: number) => {
    try {
      setPouches([]);
      const data = await fetchLuckyPouches(page);


      if (data) {
        const validatedPouches = validatePouches(data.content).map((pouch,idx)=>({
          ...pouch,
        }));
        //검증로직
        setPouches(validatedPouches);
        //setIsLastPage(data.last); // 마지막 페이지 여부 갱신
      }
    } catch (error) {
      console.error("복주머니 데이터를 가져오는 데 실패했습니다.", error);
    } finally {
      //setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 첫 페이지 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setPouches([]); // 초기화
      await loadPouches(0); // 데이터 로드
    };

    fetchData();
  }, []);

  // 다음 페이지 데이터 로드 - 무한스크롤
  const handleLoadMore = async() => {
    if (!isLastPage) {
      // @ts-ignore
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage); // 페이지 상태 업데이트
      await loadPouches(nextPage); // 다음 페이지 데이터 요청
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



  return (
      <div>
        <Header>
          <Logo />
          <OpenSettingButton />
        </Header>
        <InfiniteScroll onLoadMore={loadMorePouches} onLoadPrevious={loadPreviousPouches}
                        isLastPage={isLastPage} isFirstPage={isFirstPage}
                        isLoading={isLoading}
        >

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

        </div>
        </InfiniteScroll>
      </div>
  );
};
  export default Pockets;
