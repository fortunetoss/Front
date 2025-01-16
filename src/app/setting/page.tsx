import AccountDeleteButton from "@/components/buttons/account-delete-button";
import LogoutButton from "@/components/buttons/logoutButton";
import CloseSettingButton from "@/components/header/close-setting-button";
import Header from "@/components/header/header";
import Logo from "@/components/header/logo";

export default function SettingPage() {
  return (
    <>
      <Header>
        <Logo />
        <CloseSettingButton />
      </Header>
      <main className="py-8 px-5 bg-white">
        <section className="flex flex-col items-start gap-5">
          <LogoutButton />
          <AccountDeleteButton />
        </section>
      </main>
    </>
  );
}
