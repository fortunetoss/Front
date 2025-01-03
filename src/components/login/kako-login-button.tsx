"use client";

// 나중에 도메인 주소 변경
const KAKAO_LOGIN_URL = "http://localhost:8080/oauth2/authorization/kakao";

export default function KakaoLoginButton() {
  const handleClick = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return <button onClick={handleClick}>카카오톡 로그인</button>;
}
