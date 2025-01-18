// 채워져있는지 검증

export interface Pouch {
    domain:string;
    questionCustomId:number|null;
    index:number;

}

export const validatePouches = (pouches: Pouch[]) => {
    return pouches.map((pouch) => ({
        ...pouch,
        isFilled: pouch.questionCustomId !== null,
        // questionCustomId가 null이 아니면 채워져 있음
    }));
};
