import Image from "next/image";
import KakaoLoginButton from "@/components/login/kako-login-button";
import logoImg from "@/assets/icons/logo.svg";
import pouchImg from "@/assets/onbarding/onboarding-pouch.webp";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-[14px] px-8">
      <Image src={logoImg} alt="복던지미" width={170} height={64} />
      <h1 className="font-bold text-xl">문제와 덕담을 주고 받아보세요!</h1>
      <Image src={pouchImg} alt="복주머니" width={326} height={326} />
      <KakaoLoginButton />
    </div>
  );
}
