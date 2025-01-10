import { authApiClient } from "@/api/api-client";
import Header from "@/components/header/header";
import NicknameForm from "@/components/nickname/nickname-form";

export default async function NicknamePage() {
  const response = await authApiClient.get("api/name");
  const initialName = response.data.data.name;

  return (
    <>
      <Header>
        <div>LOGO</div>
      </Header>
      <main className="flex flex-col gap-16 px-5 py-8 bg-white">
        <h1 className="text-xl font-bold">이름을 입력해주세요</h1>
        <NicknameForm initialName={initialName} />
      </main>
    </>
  );
}