import { useState } from 'react';
import { FaFlag } from 'react-icons/fa';

type AlertBoxProps = {
    text: string; // 알림 텍스트
    bgColor?: string; // 배경 색상
    textColor?: string; // 텍스트 색상
    closeButton?: string; // X 버튼 스타일 클래스
};

export default function Notice({
                                   text,
                                   bgColor = 'bg-gray-100',
                                   textColor = 'text-gray-600',
                                   closeButton = 'text-gray-500 hover:text-gray-700',
                               }: AlertBoxProps) {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div
            className={`flex items-center space-x-3 mb-10 p-5 rounded transition-all duration-300 ${
                isVisible ? bgColor : 'bg-transparent'
            }`}
            style={{ minHeight: '5rem' }} // 공간 크기 유지
        >
            {isVisible ? (
                <>
                    <FaFlag className="text-gray-500" />
                    <span className={`text-xl ${textColor}`}>{text}</span>
                    <button
                        className={closeButton}
                        onClick={() => setIsVisible(false)} // X 버튼 클릭 시 텍스트와 배경 숨김
                        aria-label="닫기 버튼"
                    >
                        ✕
                    </button>
                </>
            ) : (
                <span className="text-transparent">.</span> // 숨김 상태에서도 공간 유지
            )}
        </div>
    );
}
