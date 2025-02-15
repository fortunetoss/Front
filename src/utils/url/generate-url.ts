// url 생성로직

export const generateUrl = (questionCustomId: number | null): string | null => {
  if (!questionCustomId) {
    console.error("questionCustomId가 설정되지 않았습니다.");
    return null;
  }

  const baseUrl = `${window.location.origin}`;
  return `${baseUrl}/${questionCustomId}`;
};
