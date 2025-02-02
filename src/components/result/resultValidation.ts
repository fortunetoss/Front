// 맞았는지 틀렸는지 검증로직

import { Solver } from "@/api/api-result-data";

export const validateResult = (
  solvers: Solver[],
  correctAnswer: string, // 정답을 나타내는 매개변수 이름 수정
): { rightSolvers: Solver[]; wrongSolvers: Solver[] } => {
  // 정답자와 오답자를 분리
  const rightSolvers: Solver[] = []; // 내부 변수 이름 유지
  const wrongSolvers: Solver[] = []; // 내부 변수 이름 유지

  solvers.forEach((solver) => {
    if (solver.answer === correctAnswer) {
      // 매개변수 이름을 명확하게 변경
      rightSolvers.push(solver); // 정답자 추가
    } else {
      wrongSolvers.push(solver); // 오답자 추가
    }
  });

  return { rightSolvers, wrongSolvers };
};
