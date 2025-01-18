"use client";

export default function AccountDeleteButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button className="px-2 py-[6px] font-medium text-lg" onClick={onClick}>
      회원탈퇴
    </button>
  );
}
