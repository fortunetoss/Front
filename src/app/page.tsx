"use client";

import Image from "next/image";
import KakaoLoginButton from "@/components/kakao/kakao-login-button";
import logoImg from "@/assets/icons/logo.svg";
import pouchImg from "@/assets/onbarding/onboarding-pouch.webp";
import { useState } from "react";

export default function Home() {
  const [hasDeleted, setHasDeleted] = useState(
    sessionStorage.getItem("hasDeleted") === "true"
  );

  console.log(hasDeleted);
  setTimeout(() => {
    setHasDeleted(false);
    sessionStorage.removeItem("hasDeleted");
  }, 2000);

  return (
    <main className="relative flex flex-col items-center justify-center h-full gap-[14px] px-8">
      {hasDeleted && (
        <div className="w-3/4 min-w-[220px] absolute top-10 text-center px-5 py-3 shadow-xl bg-white rounded-2xl">
          탈퇴가 완료되었습니다.
        </div>
      )}
      <Image src={logoImg} alt="복던지미" width={170} height={64} priority />
      <h1 className="font-bold text-xl">문제와 덕담을 주고 받아보세요!</h1>
      <Image src={pouchImg} alt="복주머니" width={326} height={326} priority />
      <KakaoLoginButton />
    </main>
  );
}
