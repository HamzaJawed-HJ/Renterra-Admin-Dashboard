import { primaryFont, secondaryFont } from "@/others/fonts";
import "../globals.css";

// Layout Components
import Header from "@/components/main/Header";
import SideMenu from "@/components/main/SideMenu";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedLayout from "./ProtectedLayout";
import LoginAdminAccount from "@/components/forms/loginAdminModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased h-screen`}
      >
        <AuthProvider>
          <ProtectedLayout>{children}</ProtectedLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
