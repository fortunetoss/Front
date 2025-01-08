export default function ResultPage() {
  const result = "정답!";
  const question = "길동님이 올해 가장 열심이었던 운동은?";
  const correctAnswer = "요가";

  return (
    <section>
      <div className="flex flex-col gap-5 items-center">
        <div className="w-[124px] h-[98px] mx-auto bg-disable"></div>
        <h1 className="font-bold text-[40px]">{result}</h1>
      </div>
      <div className="bg-[#F7F7F7] py-5 px-10 rounded-xl flex flex-col gap-[14px] items-center mt-7">
        <p className="font-medium text-[18px] text-center">{question}</p>
        <p className="border-[1px] border-[#C6C6C6] rounded-full bg-white py-2 px-[14px]">
          정답: <strong className="font-bold">{correctAnswer}</strong>
        </p>
      </div>
      {/*
      덕담이 있으면 => 다음 
      덕담이 없으면 => 나도 문제 내러가기, 내 결과 공유하기
      */}
    </section>
  );
}
