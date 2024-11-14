import { ReactNode } from "react";
import Navbar from "./_components/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="p-3 shadow">
        <Navbar />
      </div>
      {children}
    </div>
  );
}
