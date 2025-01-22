// 초기화관련로직

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getEdit } from "@/api/api-getEdit";
import { Pouch } from "@/utils/validation/validationPouch";
import usePocketStore from "./usePocket";

export interface StartStore {
    pouches:Pouch[];
    resetFunnel: () => void;
    startData: (questionCustomId: number, pouches?: Pouch[]) => Promise<void>;
}

const useStartStore = create<StartStore>()(
    immer((set) => ({
        pouches:[],
        resetFunnel: () => {
            console.log("상태초기화"); // 콘솔 로그 추가
            set((state) => {
                state.title = "";
                state.answers = ["", "", "", ""];
                state.correctAnswer = null;
                state.content = null;
                state.domain = null;
                state.questionCustomId = null;
                state.card = null;
                state.selectOption = null;
                state.step = 0;
                state.pouches = []; // 초기화 시 pouches도 리셋
            });
        },

        startData: async (questionCustomId, pouches) => {
            console.log(`Fetching data for questionCustomId: ${questionCustomId}`); // 콘솔 로그 추가
            const { updateState } = usePocketStore.getState();
            try {
                const data = await getEdit(questionCustomId);
                console.log("Fetched data:", data); // 콘솔 로그 추가
                updateState("title", data.title);
                updateState("answers", [data.select1, data.select2, data.select3, data.select4]);
                updateState("correctAnswer", data.answer);
                updateState("content", data.content);
                updateState("domain", data.domain);
                updateState("card", data.card);
                updateState("questionCustomId", questionCustomId);

                // 추가로 pouches도 설정
                if (pouches) {
                    updateState("pouches", pouches);
                    console.log("Initialized pouches:", pouches);
                }
            } catch (error) {
                console.error("Failed to initialize data:", error); // 콘솔 로그 추가
            }
        },
    }))
);

export default useStartStore;
