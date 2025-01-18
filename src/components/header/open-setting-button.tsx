import sidebarBtnImg from "@/assets/icons/header/menu.svg";
import Image from "next/image";
import Link from "next/link";

export default function OpenSettingButton() {
  return (
    <Link href="/setting">
      <Image
        src={sidebarBtnImg}
        alt="설정 페이지로 이동"
        width={24}
        height={24}
        className="hover:cursor-pointer"
      />
    </Link>
  );
}
