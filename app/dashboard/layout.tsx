import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import UserInfoProvider from "@/context/userInfoContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UserInfoProvider>
      <div className="flex bg-gray-50">
        <Sidebar />
        <div className="w-full">
          <div className="shadow">
            <Navbar />
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </UserInfoProvider>
  );
}
