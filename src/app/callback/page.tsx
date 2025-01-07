"use client";

import { reissueAccessToken } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const getAccessToken = async () => {
      await reissueAccessToken();
      router.push("/nickname");
    };

    getAccessToken();
  }, []);

  return null;
}
