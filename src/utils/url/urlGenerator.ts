// url 생성로직

export var generateUrl = (encryptedId: number): string | null => {
  if (!encryptedId) {
    console.error("암호화된 ID가 설정되지 않았습니다.");
    return null;
  }

  const baseUrl = `${window.location.origin}`;
  return `${baseUrl}/${encodeURIComponent(encryptedId)}`;
};
