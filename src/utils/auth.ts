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

// header에 accessToken을 포함한 요청(권한이 필요한 요청)을 보낸 후, 응답 코드 검증할 때 사용
export const checkAuthResponseCode = (currentPath: string, code: number) => {
  if (code === 401) {
    reissueAccessToken(currentPath);
  }

  if (code === 400) {
    redirect("/");
  }
};
