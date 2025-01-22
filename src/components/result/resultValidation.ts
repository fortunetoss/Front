// 맞았는지 틀렸는지 검증로직

import { Solver } from "@/api/api-result-data";

export const ValidateResult = (
    solvers: Solver[],
    correctAnswer: string // 정답을 나타내는 매개변수 이름 수정
): { RightSolvers: Solver[]; WrongSolvers: Solver[] } => {
    // 정답자와 오답자를 분리
    const RightSolvers: Solver[] = []; // 내부 변수 이름 유지
    const WrongSolvers: Solver[] = []; // 내부 변수 이름 유지

    solvers.forEach((solver) => {
        if (solver.answer === correctAnswer) { // 매개변수 이름을 명확하게 변경
            RightSolvers.push(solver); // 정답자 추가
        } else {
            WrongSolvers.push(solver); // 오답자 추가
        }
    });

    return { RightSolvers, WrongSolvers };
};
