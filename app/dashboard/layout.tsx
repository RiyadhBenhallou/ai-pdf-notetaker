import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
