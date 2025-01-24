// url 생성로직

import usePocketStore from "../../app/store/usePocket";

export var generateUrl = (questionCustomId: string): string | null => {
    //const { questionId } = usePocketStore.getState();

    if (!questionCustomId) {
        console.error("questionCustomId가 설정되지 않았습니다.");
        return null;
    }

    const baseUrl = `${window.location.origin}`;
    return `${baseUrl}/${questionCustomId}`;
};
