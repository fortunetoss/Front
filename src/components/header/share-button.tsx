"use client";

import shareBtnImg from "@/assets/icons/header/share.svg";
import Image from "next/image";

interface ShareButtonProps {
  onClick?: () => void;
}

export default function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <div className="bg-white rounded-full p-2 top-4 right-4 hover:cursor-pointer z-20 flex items-center justify-center">
      <Image
        src={shareBtnImg}
        alt="공유하기 버튼"
        onClick={onClick}
        width={24}
        height={24}
        className="hover:cursor-pointer"
      />
    </div>
  );
}
