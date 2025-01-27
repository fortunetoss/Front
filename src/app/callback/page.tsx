"use client";

//import { reissueAccessToken } from "@/api/auth";
import useAccessTokenStore from "@/store/accessToken";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const setAccessToken = useAccessTokenStore.getState().setAccessToken;

  // 임시 로직

  useEffect(() => {
    if (!params) return;

    const getAccessToken = async () => {
      const accessToken = params.get("access");
      const isNewUser = params.get("newUser");

      if (accessToken) {
        setAccessToken(accessToken);
      } else {
        router.push("/");
      }

      //await reissueAccessToken();

      if (isNewUser === "true") {
        router.push("/nickname");
      } else if (isNewUser === "false") {
        router.push("/pockets");
      } else {
        router.push("/");
      }
    };

    getAccessToken();
  }, [params]);

  return null;
}
