import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between container mx-auto py-3">
      <div className=""></div>
      <div className="">
        <UserButton />
      </div>
    </div>
  );
}
