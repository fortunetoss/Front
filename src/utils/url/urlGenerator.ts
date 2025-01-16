// url 생성로직

import usePocketStore from "../../app/store/usePocket";

export const generateUrl = (): string | null => {
    const { questionCustomId } = usePocketStore.getState();

    if (!questionCustomId) {
        console.error("questionCustomId가 설정되지 않았습니다.");
        return null;
    }

    const baseUrl = `${window.location.origin}`;
    return `${baseUrl}/${questionCustomId}`;
};
