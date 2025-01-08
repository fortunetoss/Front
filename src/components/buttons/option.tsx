"use client";

interface OptionProps {
  text: string;
  id: number;
  isSelected: boolean;
  onClick: (id: number) => void;
}

export default function Option({ text, id, isSelected, onClick }: OptionProps) {
  const classes = isSelected
    ? "border-blue bg-blue text-white font-bold"
    : "border-[#C6C6C6] font-medium";

  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full py-[18px] px-4 rounded-full border-[1.2px] text-center text-lg ${classes}`}
    >
      {text}
    </button>
  );
}
