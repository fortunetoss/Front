"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import usePocketStore from "../store/usePocket";
import { fetchLuckyPouches } from "../../api/api-form";
import Notice from "../../components/notice";
import { validatePouches, Pouch } from "../../utils/validation/validationPouch";
import { getPouch } from "@/utils/images/domain";
import Header from "@/components/header/header";
import Logo from "@/components/header/logo";
import OpenSettingButton from "@/components/header/open-setting-button";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const Pockets = () => {
  const router = useRouter();
  const target = useRef(null);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pouches, setPouches] = useState<(Pouch & { isFilled: boolean })[]>([]); // 채워져 있음 여부 추가
  const { setDomain, setStep, setQuestionCustomId } = usePocketStore();

  const callback = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);
  const [observe, unobserve] = useIntersectionObserver(callback);

  useEffect(() => {
    // 복주머니 가져오기
    const loadPouches = async () => {
      let data;
      setIsLoading(true);

      try {
        data = await fetchLuckyPouches(page);
      } catch (error) {
        alert("복주머니 데이터를 가져오는 데 실패했습니다.");
        console.error(error);
      }

      if (data) {
        const validatedPouches = validatePouches(data.content);
        setPouches((prev) => [...prev, ...validatedPouches]);

        if (page === 0) {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        } else {
          setIsLoading(false);
        }

        if (data.last && target.current) {
          unobserve(target.current);
          target.current = null;
        }
      }
    };

    loadPouches();
  }, [page]);

  useEffect(() => {
    if (target.current) {
      if (isLoading) {
        unobserve(target.current);
      } else {
        observe(target.current);
      }
    }
  }, [isLoading]);

  // 복주머니 선택 핸들러
  const handlePouchSelect = async (
    domain: string,
    questionCustomId: number | null
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
        <Logo />
        <OpenSettingButton />
      </Header>

      <div className="container mx-auto p-10 bg-white">
        <Notice text="문제를 내고 복주머니를 전달하세요!" />
        <div className="grid grid-cols-2 gap-y-4">
          {pouches.map((pouch, index) => (
            <div
              key={`${pouch.domain}-${index}`}
              className={`relative p-4 text-center cursor-pointer ${
                pouch.isFilled ? "hover:bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() =>
                handlePouchSelect(pouch.domain, pouch.questionCustomId)
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
                  style={{ zIndex: 10 }}
                >
                  <p className="text-gray-900 bg-white p-2 border-black border rounded-full ">
                    문제내기
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div ref={target} className="mx-auto h-10 w-full"></div>
      </div>
    </div>
  );
};
export default Pockets;
