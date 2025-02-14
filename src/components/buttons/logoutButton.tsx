"use client";

import { logout } from "@/api/auth";
import useAccessTokenStore from "@/store/accessToken";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  const handleClick = async () => {
    try {
      await logout();
    } finally {
      setAccessToken("");
      router.push("/");
    }
  };

  return (
    <button className="px-2 py-[6px] font-medium text-lg" onClick={handleClick}>
      로그아웃
    </button>
  );
}
