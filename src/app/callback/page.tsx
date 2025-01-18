"use client";

import { reissueAccessToken } from "@/api/auth";
import useAccessTokenStore from "@/store/accessToken";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  // 개발 환경용 임시 로직
  const accessToken = params.get("access");
  const setAccessToken = useAccessTokenStore.getState().setAccessToken;
  setAccessToken(accessToken ?? "");

  useEffect(() => {
    if (!params) return;

    const getAccessToken = async () => {
      const isNewUser = params.get("newUser");

      //await reissueAccessToken();

      if (isNewUser === "true") {
        router.push("/nickname");
      } else {
        router.push("/pockets");
      }
    };

    getAccessToken();
  }, [params]);

  return null;
}
