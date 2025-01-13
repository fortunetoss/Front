"use client";

const KAKAO_LOGIN_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/kakao`;

export default function KakaoLoginButton() {
  const handleClick = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return <button onClick={handleClick}>카카오톡 로그인</button>;
}
