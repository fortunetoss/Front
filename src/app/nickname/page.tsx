import Header from "@/components/header/header";
import NicknameForm from "@/components/nickname/nickname-form";

export default function NicknamePage() {
  return (
    <>
      <Header>
        <div>LOGO</div>
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        <h1 className="text-xl font-bold">이름을 입력해주세요</h1>
        <NicknameForm />
      </main>
    </>
  );
}
