import closeBtnImg from "@/assets/icons/header/close.svg";
import Image from "next/image";
import Link from "next/link";

export default function CloseSettingButton() {
  return (
    <Link href="/pockets">
      <Image
        src={closeBtnImg}
        alt="홈 화면으로 이동"
        width={24}
        height={24}
        className="hover:cursor-pointer"
      />
    </Link>
  );
}
