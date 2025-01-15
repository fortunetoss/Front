import Image from "next/image";
import logoImg from "@/assets/icons/logo.svg";

export default function Logo() {
  return <Image src={logoImg} alt="복던지미 로고" width={85} height={32} />;
}
