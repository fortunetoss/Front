import Link from "next/link";

export default function AnswererFinalActions() {
  return (
    <section className="flex flex-col gap-[14px]">
      <Link href="/" className="broad-btn">
        나도 문제 내러가기
      </Link>
      <button className="broad-btn">내 결과 공유하기</button>
    </section>
  );
}
