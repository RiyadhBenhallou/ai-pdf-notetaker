import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full container mx-auto flex items-center justify-between">
      <Image src={"/logo.svg"} alt="logo" width={38} height={38} />
      <UserButton />
    </div>
  );
}
