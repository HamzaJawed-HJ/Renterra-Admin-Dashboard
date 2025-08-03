"use client";

import Header from "@/components/main/Header";
import SideMenu from "@/components/main/SideMenu";
import LoginAdminAccount from "@/components/forms/loginAdminModal";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoginAdminAccount />
      </div>
    );
  }
  return (
    <>
      <Header />
      <main className="flex gap-2.5 h-full pr-2.5">
        <SideMenu />
        <div className="relative pt-20 w-full">{children}</div>
      </main>
    </>
  );
} 

