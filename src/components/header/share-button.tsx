"use client";

import shareBtnImg from "@/assets/icons/header/share.svg";
import Image from "next/image";

export default function ShareButton() {
  const handleClick = () => {};

  return (
    <Image
      src={shareBtnImg}
      alt="공유하기 버튼"
      onClick={handleClick}
      width={24}
      height={24}
      className="hover:cursor-pointer"
    />
  );
}
