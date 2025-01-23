/// 스크롤 감지
// 화면 하단에, 혹은 상단에 도달하게 되면 호출
// 상태를 확인해서 중복 요청 방지하도록 함

import React, { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => void; // 다음 데이터를 로드하는 함수
  onLoadPrevious: () => void; // 이전 데이터를 로드하는 함수
  isLastPage: boolean; // 마지막 페이지 여부
  isFirstPage: boolean; // 첫 번째 페이지 여부
  children: React.ReactNode; // 렌더링할 콘텐츠
  isLoading?: boolean; // 로딩 상태
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onLoadMore,
  onLoadPrevious,
  isLastPage,
  isFirstPage,
  children,
  isLoading = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop; // 현재 스크롤 위치
      const scrollHeight = container.scrollHeight; // 전체 스크롤 높이
      const clientHeight = container.clientHeight; // 화면 높이

      // 스크롤 하단 감지
      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        !isLoading &&
        !isLastPage
      ) {
        onLoadMore(); // 다음 데이터 로드
      }

      // 스크롤 상단 감지
      if (scrollTop <= 50 && !isLoading && !isFirstPage) {
        onLoadPrevious(); // 이전 데이터 로드
      }
    };

    container.addEventListener("scroll", handleScroll); // 스크롤 이벤트 추가

    return () => {
      container.removeEventListener("scroll", handleScroll); // 이벤트 제거
    };
  }, [onLoadMore, onLoadPrevious, isLastPage, isFirstPage, isLoading]);

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-[480px] h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      {children}
    </div>
  );
};

export default InfiniteScroll;
