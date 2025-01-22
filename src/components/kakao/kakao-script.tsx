"use client";

import Script from "next/script";

export default function KakaoScript() {
  const onLoad = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  };

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      defer
      onLoad={onLoad}
    />
  );
}
