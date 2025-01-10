import Link from "next/link";
import OImg from "@/assets/result/O.svg";
import XImg from "@/assets/result/X.svg";
import Image from "next/image";

interface ResultPageProps {
  params: { questionId: string };
}

export default function ResultPage({ params }: ResultPageProps) {
  const isCorrect = true;
  const question = "길동님이 올해 가장 열심이었던 운동은?";
  const correctAnswer = "요가";
  const message = null;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 items-center">
        <Image
          src={isCorrect ? OImg : XImg}
          alt={isCorrect ? "O" : "X"}
          width={140}
          height={102}
        />
        <h1 className="font-bold text-[40px]">
          {isCorrect ? "정답!" : "오답"}
        </h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="bg-[#F7F7F7] py-5 px-10 rounded-xl flex flex-col gap-[14px] items-center">
          <p className="font-medium text-[18px] text-center">{question}</p>
          <p className="border-[1px] border-[#C6C6C6] rounded-full bg-white py-2 px-[14px]">
            정답: <strong className="font-bold">{correctAnswer}</strong>
          </p>
        </div>
        {message && (
          <div className="flex justify-end">
            <Link
              href={`/${params.questionId}/answer/message`}
              className="next-btn"
            >
              다음
            </Link>
          </div>
        )}
      </div>

      {!message && (
        <div className="flex flex-col gap-[14px]">
          <Link href="/" className="broad-btn">
            나도 문제 내러가기
          </Link>
          <button className="broad-btn">내 결과 공유하기</button>
        </div>
      )}
    </section>
  );
}
