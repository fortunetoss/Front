"use client";

import backBtnImg from "@/assets/icons/header/back.svg";
import Image from "next/image";

export default function BackButton() {
  const handleClick = () => {
    history.back();
  };

  return (
    <Image
      src={backBtnImg}
      alt="뒤로 가기 버튼"
      onClick={handleClick}
      width={24}
      height={24}
      className="hover:cursor-pointer"
    />
  );
}
