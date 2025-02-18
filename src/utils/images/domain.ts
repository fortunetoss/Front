// 백엔드에서 도메인 가져다주면 프론트에서 이미지 가져오기

import { pocketsImageData } from "@/data/card-names";

export const getPouch = (domain: string) => {
  const card = pocketsImageData.find((item) => item.name === domain);
  return card ? card.pocketsImage : undefined;
};

// 만약 조건에 맞는 항목이 없으면 지금은 undefined 반환하는데
// 만약 필요하다면 기본 이미지로 설정해둬야겠다
