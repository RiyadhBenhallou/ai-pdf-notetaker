import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="shadow">
          <Navbar />
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
