"use client";

import closeBtnImg from "@/assets/icons/header/close.svg";
import Image from "next/image";

export default function CloseSidebarButton() {
  const handleClick = () => {};

  return (
    <Image
      src={closeBtnImg}
      alt="사이드바 닫기 버튼"
      onClick={handleClick}
      width={24}
      height={24}
      className="hover:cursor-pointer"
    />
  );
}
