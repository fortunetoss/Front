import ResponseData from "@/models/response-data";
import { apiClient, authApiClient } from "./api-client";

export const getDefaultName = async () => {
  const response = await authApiClient.get<ResponseData>("/api/name");

  return response.data.data as { name: string };
};

export const postName = async (name: string) => {
  await authApiClient.post<ResponseData>("/api/name", { name });
};

export const validateName = async (name: string) => {
  await apiClient.post<ResponseData>("/api/users/validate", {
    nickname: name,
  });
};
