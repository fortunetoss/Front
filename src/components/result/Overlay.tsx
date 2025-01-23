//결과지화면 스타일

import {ReactNode} from "react";

interface OverlayProps{
    children:ReactNode;
    onClose:() => void;
}

export default function Overlay({children,onClose}:OverlayProps) {
    return (
        <div className="fixed inset-0 z-50 ">
            <div className="absolute inset-0 bg-black bg-opacity-75"
                 onClick={onClose}
            >
            </div>
            <div
                className="absolute  top-4 right-4 z-60 bg-white p-4 rounded-lg shadow-lg "
                onClick={(e) => e.stopPropagation()}
                // children에서 일어나는 이벤트를
                //  부모요소 에게 전달되는 이벤트 전파 막기

            >
                {children}
            </div>
        </div>
    );
}
