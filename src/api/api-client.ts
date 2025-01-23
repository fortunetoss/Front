import axios from "axios";

import useAccessTokenStore from "../store/accessToken";
import { reissueAccessToken } from "../api/auth";

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
    // 배포 전까지 주석 처리

    // const originalRequest = error.config;

    // if (error.code === 401 && !originalRequest._retry) {
    //   await reissueAccessToken();
    //   originalRequest._retry = true;
    //   authApiClient(originalRequest);
    // }

    return Promise.reject(error);
  }
);
