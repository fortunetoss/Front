"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePocketStore from "../../store/usePocket";
import Notice from '../../../components/notice';

const Select = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pocketIndex = searchParams.get("pocketIndex");
    const setSelectOption = usePocketStore((state) => state.setSelectOption);
    const setPocketIndex = usePocketStore((state) => state.setPocketIndex);

    React.useEffect(() => {
        if (pocketIndex) {
            setPocketIndex(Number(pocketIndex));
        } else {
            console.error("pocketIndex가 설정되지 않았습니다.");
        }
    }, [pocketIndex, setPocketIndex]);

    const handleOption = (option: string) => {
        if (!pocketIndex) {
            console.error("pocketIndex가 설정되지 않았습니다.");
            return;
        }
        setSelectOption(option);
        router.push(`/pockets/form?pocketIndex=${pocketIndex}&select=${option}`);
    };

    return (
        <div className="container mx-auto p-10">
            <Notice text="2024년을 돌아보며 문제와 새해 덕담을 전해주세요." />
            <div className="space-y-4">
                <button
                    onClick={() => handleOption("problem")}
                    className="w-full bg-white border border-gray-300 text-gray-600 text-lg rounded-lg px-4 py-2 shadow hover:bg-gray-100"
                >
                    문제만 보내기
                </button>
                <button
                    onClick={() => handleOption("together")}
                    className="w-full bg-white border border-gray-300 text-gray-600 text-lg rounded-lg px-4 py-2 shadow hover:bg-gray-100"
                >
                    문제와 덕담 같이 보내기
                </button>
            </div>
        </div>
    );
};

export default Select;
