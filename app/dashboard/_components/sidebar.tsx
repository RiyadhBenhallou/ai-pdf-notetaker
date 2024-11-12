import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Plus, Shield } from "lucide-react";
import Image from "next/image";
import UploadingDialog from "./uploading-dialog";

const sidebarLinks = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Shield,
    label: "Subscriptions",
    href: "/subscriptions",
  },
];

export default function Sidebar() {
  return (
    <div className="md:w-64 shadow h-screen relative">
      <div className="flex justify-center mb-12 p-3">
        <Image src={"logo.svg"} alt="logo" width={38} height={38} />
      </div>
      <div className="flex flex-col w-full gap-2 p-3">
        <UploadingDialog>
          <Button className="justify-center w-full">
            <Plus className="mr-2" />
            Upload PDF
          </Button>
        </UploadingDialog>
        {sidebarLinks.map((link, i) => (
          <Button key={i} variant={"ghost"} className="w-full justify-center">
            <link.icon className="w-4 h-4 mr-2" />
            {link.label}
          </Button>
        ))}
      </div>
      <div className="absolute bottom-20 w-full flex gap-1 flex-col items-center">
        <Progress value={33} className="w-[80%]" />
        <p className="text-sm"> 3 / 2 PDFs uploaded</p>
      </div>
    </div>
  );
}
