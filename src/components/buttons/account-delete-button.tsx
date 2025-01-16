"use client";

import { authApiClient } from "@/api/api-client";
import useAccessTokenStore from "@/store/accessToken";
import { useRouter } from "next/navigation";

export default function AccountDeleteButton() {
  const router = useRouter();
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  const handleClick = async () => {
    await authApiClient.post("/api/users/delete");
    setAccessToken("");
    router.push("/");
  };

  return (
    <button className="px-2 py-[6px] font-medium text-lg" onClick={handleClick}>
      회원탈퇴
    </button>
  );
}
