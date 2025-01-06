"use client";

import sidebarBtnImg from "@/assets/icons/header/menu.svg";
import Image from "next/image";

export default function OpenSidebarButton() {
  const handleClick = () => {};

  return (
    <Image
      src={sidebarBtnImg}
      alt="사이드바 보기 버튼"
      onClick={handleClick}
      width={24}
      height={24}
      className="hover:cursor-pointer"
    />
  );
}
