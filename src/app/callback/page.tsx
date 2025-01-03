"use client";

import { reissueAccessToken } from "@/utils/auth";
import { useEffect } from "react";

export default function CallbackPage() {
  useEffect(() => {
    reissueAccessToken("/nickname");
  }, []);

  return null;
}
