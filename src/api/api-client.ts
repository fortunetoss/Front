import axios from "axios";

import useAccessTokenStore from "../store/accessToken";
import { redirect } from "next/navigation";
//import { reissueAccessToken } from "../api/auth";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// 헤더에 액세스 토큰이 필요한 요청에 사용 (클라이언트 컴포넌트에서만 사용 가능)
export const authApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

authApiClient.interceptors.request.use((config) => {
  const accessToken = useAccessTokenStore.getState().accessToken;
  config.headers["authorization"] = "Bearer " + accessToken;
  return config;
});

authApiClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;

    // if (error.code === 401) {
    //   if (originalRequest._retry) {
    //     redirect("/");
    //   } else {
    //     await reissueAccessToken();
    //     originalRequest._retry = true;
    //     return authApiClient(originalRequest);
    //   }
    // }

    if (error.status === 401) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  },
);
