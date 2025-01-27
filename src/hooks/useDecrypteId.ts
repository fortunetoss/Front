import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { decrypt } from "@/utils/crypto";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY!;

export function useDecryptedId() {
  const params = useParams();
  const encryptedId = params?.questionId; // 암호화된 questionId
  const [decryptedId, setDecryptedId] = useState<string | null>(null); // 복호화된 값

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!encryptedId || typeof encryptedId !== "string") {
        console.error("URL에서 questionId를 찾을 수 없거나 올바르지 않습니다.");
        return;
      }

      try {
        console.log(encryptedId);
        const id = decrypt(encryptedId, SECRET_KEY); // 복호화
        setDecryptedId(id); // 상태로 저장
      } catch (error) {
        console.error("복호화 실패:", error);
      }
    }
  }, [encryptedId]);

  return { encryptedId, decryptedId }; // 암호화된 ID와 복호화된 ID 반환
}
