"use client";

import { authApiClient } from "@/api/api-client";
import useAccessTokenStore from "@/store/accessToken";
import { useRouter } from "next/navigation";

export default function DeleteAccountModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    await authApiClient.post("/api/users/delete");
    setAccessToken("");
    router.push("/");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      />
      <dialog
        className="w-full text-[17px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[18px] px-5 py-[15px] bg-white z-20 rounded-xl"
        open
      >
        <p className="">정말 탈퇴하시겠습니까?</p>
        <section className="flex justify-end gap-[30px] text-blue">
          <button className="" onClick={onClose}>
            취소
          </button>
          <button className="font-semibold" onClick={handleDeleteAccount}>
            탈퇴하기
          </button>
        </section>
      </dialog>
    </>
  );
}
