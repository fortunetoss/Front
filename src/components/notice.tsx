import { useState } from "react";
import { FaFlag } from "react-icons/fa";

type AlertBoxProps = {
  text: string; // 알림 텍스트
};

export default function Notice({ text }: AlertBoxProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <div className="flex items-center justify-between mb-10 p-3 rounded-md bg-sky-100 text-blue transition-all duration-300">
          <div className="flex items-center space-x-3">
            <FaFlag className="text-blue" />
            <span className="text-sm">{text}</span>
          </div>
          <button
            className="text-blue-600 "
            onClick={() => setIsVisible(false)} // X 버튼 클릭 시 숨김 처리
            aria-label="닫기 버튼"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
