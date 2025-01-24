"use client";

interface OptionProps {
  text: string;
  isSelected: boolean;
  onClick: (text: string) => void;
}

export default function Option({ text, isSelected, onClick }: OptionProps) {
  const classes = isSelected
    ? "border-blue bg-blue text-white font-bold"
    : "border-[#C6C6C6] font-medium";

  return (
    <button
      onClick={() => onClick(text)}
      className={`w-full py-[18px] px-4 rounded-full border-[1.2px] text-center text-lg ${classes}`}
    >
      {text}
    </button>
  );
}
