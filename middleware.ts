import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/hooks/crypto";

export function middleware(req: NextRequest) {
    const encryptedId = req.nextUrl.pathname.split("/")[1];
    const SECRET_KEY= process.env.SECRET_KEY;

    if (!encryptedId) {
        console.error("암호화된 ID가 없습니다.");
        return NextResponse.redirect(new URL("/", req.url));
    }

    try {
        // 복호화
        // @ts-ignore
        const decryptedId = decrypt(encryptedId, SECRET_KEY);
        console.log("Decrypted ID:", decryptedId);

        if (!decryptedId || isNaN(Number(decryptedId))) {
            console.error("복호화 실패 또는 잘못된 ID:", decryptedId);
            return NextResponse.redirect(new URL("/", req.url));
        }

        const newUrl = req.nextUrl.clone();
        newUrl.pathname = `/${decryptedId}`;
        return NextResponse.redirect(newUrl);
    } catch (error) {
        console.error("복호화 실패:", error);
        return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
    matcher: "/:questionId/:path*",
};


