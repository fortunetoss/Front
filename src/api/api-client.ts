import axios from "axios";
import { redirect } from "next/navigation";

import useAccessTokenStore from "@/store/accessToken";
import { reissueAccessToken } from "@/api/auth";

export const apiClient = axios.create({
  baseURL: "https://fortunetoss.store",
});

// 헤더에 액세스 토큰이 필요한 요청에 사용 (클라이언트 컴포넌트에서만 사용 가능)
export const authApiClient = axios.create({
  baseURL: "https://fortunetoss.store",
});

authApiClient.interceptors.request.use((config) => {
  const accessToken = useAccessTokenStore.getState().accessToken;
  config.headers["authorization"] = "Bearer " + accessToken;
  console.log(config.headers);
  return config;
});

authApiClient.interceptors.response.use(
  async (response) => {
    console.log(response);
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
