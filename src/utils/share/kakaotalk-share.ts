export const kakaotalkShare = (targetUrl: string, isAnswerer?: boolean) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error("Kakao SDK가 초기화되지 않았습니다.");
    return;
  }

  let title = "복 던지미가 보내온 ‘복 주머니’를 받아보세요!";
  let description =
    "복 던지미가 보내온 퀴즈 풀기! 🍀퀴즈를 풀면 덕담을 드려요!";
  let imageUrl =
    "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg";
  let buttonText = "문제 풀러가기";

  if (isAnswerer) {
    // 문구 변경하기
  }

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl,
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
