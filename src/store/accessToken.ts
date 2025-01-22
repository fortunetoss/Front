import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccessTokenStore {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

const useAccessTokenStore = create(
  persist<AccessTokenStore>(
    (set) => ({
      accessToken: "",
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    { name: "access-token-store" }
  )
);

export default useAccessTokenStore;
