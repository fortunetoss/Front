import { redirect } from "next/navigation";
import useAccessTokenStore from "@/store/accessToken";
import { requestAccessTokenReissue } from "@/app/api/auth";

export const reissueAccessToken = async (redirectTo: string) => {
  const response = await requestAccessTokenReissue();

  if (response.data.code === 200) {
    const accessToken = response.headers["access"];

    if (accessToken) {
      const setAccessToken = useAccessTokenStore.getState().setAccessToken;
      setAccessToken(accessToken);
      redirect(redirectTo);
    }
  }

  redirect("/");
};
