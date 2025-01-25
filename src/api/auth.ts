import ResponseData from "@/models/response-data";
import useAccessTokenStore from "@/store/accessToken";
import { redirect } from "next/navigation";
import { apiClient } from "./api-client";

const requestAccessTokenReissue = async () => {
  const response = await apiClient.post<ResponseData>(
    "/reissue",
    {},
    {
      withCredentials: true,
    }
  );

  // const response = fetch("https://fortunetoss.store/reissue", {
  //   method: "POST",
  //   credentials: "include",
  // });

  return response;
};

export const reissueAccessToken = async () => {
  try {
    const response = await requestAccessTokenReissue();

    if (response.status === 200) {
      const accessToken = response.headers["authorization"];

      if (accessToken) {
        const setAccessToken = useAccessTokenStore.getState().setAccessToken;
        setAccessToken(accessToken);
      }
    } else {
      redirect("/");
    }
  } catch (err) {
    redirect("/");
  }
};
