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
    try {
      await authApiClient.post(
        "/api/users/delete",
        {},
        { withCredentials: true }
      );
      setAccessToken("");
      sessionStorage.setItem("hasDeleted", "true");
      router.push("/");
    } catch (err) {}
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
        <section className="flex flex-col gap-[10px]">
          <h1 className="font-semibold">탈퇴하시겠습니까?</h1>
          <p className="text-sm">
            탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.
          </p>
        </section>
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
