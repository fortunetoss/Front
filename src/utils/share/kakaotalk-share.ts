import { getPouch } from "../images/domain";

export const kakaotalkShare = (
  targetUrl: string,
  { isAnswerer = false, hasMessage = false, pouchType = "A" },
) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error("Kakao SDK가 초기화되지 않았습니다.");
    return;
  }

  let title = "복 던지미가 보내온 ‘복 주머니’를 받아보세요!";
  let description = "복 던지미가 보내온 퀴즈 풀기!";
  let buttonText = "문제 풀러가기";
  let imageSrc;

  if (hasMessage) {
    description += " 🍀퀴즈를 풀면 덕담을 드려요!";
  }

  if (isAnswerer) {
    title = "문제에 대한 응답이 도착했어요!";
    description = "응답자가 정답을 맞췄는지 확인해보세요!";
    buttonText = "응답 결과 확인하기";
    imageSrc = getPouch(pouchType);
  } else {
    imageSrc = "/sharingImg.png";
  }

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl: imageSrc ? `${process.env.NEXT_PUBLIC_URL}${imageSrc}` : null,
      link: {
        mobileWebUrl: targetUrl,
        webUrl: targetUrl,
      },
    },
    buttons: [
      {
        title: buttonText,
        link: {
          mobileWebUrl: targetUrl,
          webUrl: targetUrl,
        },
      },
    ],
  });
};
