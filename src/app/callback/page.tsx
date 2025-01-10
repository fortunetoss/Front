"use client";

import { reissueAccessToken } from "@/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const isNewUser = params.get("newUser");

  useEffect(() => {
    const getAccessToken = async () => {
      await reissueAccessToken();

      if (isNewUser) {
        router.push("/nickname");
      }
      router.push("/pockets");
    };

    getAccessToken();
  }, []);

  return null;
}
