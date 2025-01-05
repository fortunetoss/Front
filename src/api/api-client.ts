import axios, { AxiosResponse } from "axios";
import { redirect } from "next/navigation";

import ResponseData from "@/models/response-data";
import useAccessTokenStore from "@/store/accessToken";
import { reissueAccessToken } from "@/api/auth";

// 헤더에 액세스 토큰이 필요한 요청에 사용
export const authApiClient = axios.create({
  baseURL: "http://localhost:8080/",
});

authApiClient.interceptors.request.use((config) => {
  const accessToken = useAccessTokenStore.getState().accessToken;
  config.headers["access"] = accessToken;
  return config;
});

authApiClient.interceptors.response.use(
  async (response: AxiosResponse<ResponseData>) => {
    const originalRequest = response.config;

    if (response.data.code === 401 && !originalRequest._retry) {
      await reissueAccessToken();
      originalRequest._retry = true;
      authApiClient(originalRequest);
    } else if (response.data.code === 400) {
      redirect("/");
    }

    return response;
  }
);
