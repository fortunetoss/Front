
// 수정상태인지 확인하는 스토어

import { create } from "zustand";

interface ModifiedState {
    isModified: boolean; // 수정 여부
    setModified: (value: boolean) => void; // 수정 상태 설정
}

const useModifiedStore = create<ModifiedState>((set) => ({
    isModified: false,
    setModified: (value) => {
       // console.log(`${value}`);
        set({ isModified: value });
    },
}));

export default useModifiedStore;
