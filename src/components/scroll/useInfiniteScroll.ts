import { useState } from "react";
import { fetchLuckyPouches } from "@/api/api-form";

export const useInfiniteScroll = () => {
  const [pouches, setPouches] = useState<any[]>([]); // 전체 데이터
  const [page, setPage] = useState<number>(0); // 현재 페이지 번호
  const [isLastPage, setIsLastPage] = useState<boolean>(false); // 마지막 페이지 여부
  const [isFirstPage, setIsFirstPage] = useState<boolean>(true); // 첫 페이지 여부
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

  // 다음 데이터 로드 (아래로 스크롤)
  const loadMorePouches = async () => {
    if (isLastPage || isLoading) return; // 마지막 페이지거나 로딩 중이면 중지
    setIsLoading(true); // 로딩 시작

    try {
      const nextPage = page + 1; // 다음 페이지 번호
      const response = await fetchLuckyPouches(nextPage); // API 호출
      const data = response?.content || []; // 데이터 가져오기
      if (data.length > 0) {
        setPouches((prevPouches) => [...prevPouches, ...data]); // 이전 데이터에 추가
        setIsLastPage(response.last); // 마지막 페이지 여부 업데이트
        setPage(nextPage); // 페이지 증가
      } else {
        setIsLastPage(true); // 데이터가 없으면 마지막 페이지로 설정
      }
    } catch (error) {
      console.error("다음 데이터 로드 실패:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 이전 데이터 로드 (위로 스크롤)
  const loadPreviousPouches = async () => {
    if (isFirstPage || isLoading || page === 0) return; // 첫 페이지거나 로딩 중이면 중지
    setIsLoading(true); // 로딩 시작

    try {
      const previousPage = page - 1; // 이전 페이지 번호
      const response = await fetchLuckyPouches(previousPage); // API 호출
      const data = response?.content || []; // 데이터 가져오기
      if (data.length > 0) {
        setPouches((prevPouches) => [...data, ...prevPouches]); // 이전 데이터에 추가
        setIsFirstPage(previousPage === 0); // 첫 페이지 여부 업데이트
        setPage(previousPage); // 페이지 감소
      } else {
        setIsFirstPage(true); // 데이터가 없으면 첫 페이지로 설정
      }
    } catch (error) {
      console.error("이전 데이터 로드 실패:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return {
    pouches,
    loadMorePouches,
    loadPreviousPouches,
    isLastPage,
    isFirstPage,
    isLoading,
    setPouches,
    setPage,
  };
};
