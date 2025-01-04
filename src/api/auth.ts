import axios from "axios";
import ResponseData from "../app/models/response-data";
import useAccessTokenStore from "@/store/accessToken";
import { redirect } from "next/navigation";

const MOCK_SUCCESS_RESPONSE = {
  data: {
    status: "success",
    message: "Email sent successfully",
    data: null,
    errorDetails: null,
    code: 200,
  },
  headers: { access: "accessToken" },
};

const requestAccessTokenReissue = async () => {
  // const response = await axios.post<ResponseData>(
  //   "http://localhost:8080/reissue",
  //   {},
  //   { withCredentials: true }
  // );

  const response = MOCK_SUCCESS_RESPONSE;

  return response;
};

export const reissueAccessToken = async () => {
  const response = await requestAccessTokenReissue();

  if (response.data.code === 200) {
    const accessToken = response.headers["access"];

    if (accessToken) {
      const setAccessToken = useAccessTokenStore.getState().setAccessToken;
      setAccessToken(accessToken);
    }
  } else {
    redirect("/");
  }
};
