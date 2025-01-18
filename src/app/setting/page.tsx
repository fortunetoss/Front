"use client";

import { useState } from "react";
import AccountDeleteButton from "@/components/buttons/account-delete-button";
import LogoutButton from "@/components/buttons/logoutButton";
import CloseSettingButton from "@/components/header/close-setting-button";
import Header from "@/components/header/header";
import Logo from "@/components/header/logo";
import DeleteAccountModal from "@/components/modal/delete-account-modal";

export default function SettingPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalClose = async () => {
    setIsOpen(false);
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Header>
        <Logo />
        <CloseSettingButton />
      </Header>
      <main className="relative py-8 mx-5 h-[calc(100vh-56px)] bg-white">
        {isOpen && <DeleteAccountModal onClose={handleModalClose} />}
        <section className="flex flex-col items-start gap-5">
          <LogoutButton />
          <AccountDeleteButton onClick={handleModalOpen} />
        </section>
      </main>
    </>
  );
}
