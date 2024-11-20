import { UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ fileName }: { fileName: string | undefined }) {
  return (
    <div className="w-full container mx-auto flex items-center justify-between">
      <Link href={"/dashboard"}>
        <Image src={"/logo.svg"} alt="logo" width={38} height={38} />
      </Link>
      <h2 className="font-semibold">
        {fileName || <Loader2 className="w-4 h-4 animate-spin" />}
      </h2>
      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </div>
  );
}
