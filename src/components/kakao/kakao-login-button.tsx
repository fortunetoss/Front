"use client";

import Image from "next/image";
import kakaoLogo from "@/assets/icons/kakao.svg";

const KAKAO_LOGIN_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/kakao`;

export default function KakaoLoginButton() {
  const handleClick = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-center gap-[7px] w-full bg-[#FEE500] py-[13.5px] px-6 rounded-xl font-semibold"
    >
      <Image src={kakaoLogo} alt="카카오톡 로고" width={24} height={24} />
      카카오톡 로그인
    </button>
  );
}
