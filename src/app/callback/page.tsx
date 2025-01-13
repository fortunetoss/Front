"use client";

import { reissueAccessToken } from "@/api/auth";
import useAccessTokenStore from "@/store/accessToken";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const isNewUser = params.get("newUser");

  // 개발 환경용 임심 로직
  const accessToken = params.get("access");
  const setAccessToken = useAccessTokenStore.getState().setAccessToken;
  setAccessToken(accessToken ?? "");

  useEffect(() => {
    const getAccessToken = async () => {
      //await reissueAccessToken();
      // if (isNewUser) {
      router.push("/nickname");
      // }
      // router.push("/pockets");
    };

    getAccessToken();
  }, []);

  return null;
}
