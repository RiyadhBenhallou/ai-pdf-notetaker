"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Loader2, Shield } from "lucide-react";
import Image from "next/image";
import UploadButton from "./upload-button";
import { useUserInfo } from "@/context/userInfoContext";

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
  const { userInfo, files } = useUserInfo();
  return (
    <div className="md:w-64 shadow h-screen relative">
      <div className="flex justify-center mb-12 p-3">
        <Image src={"/logo.svg"} alt="logo" width={38} height={38} />
      </div>
      <div className="flex flex-col w-full gap-2 p-3">
        <UploadButton
          nbrOfFiles={files?.length || 0}
          userCredits={userInfo?.credits || 0}
        />
        {sidebarLinks.map((link, i) => (
          <Button key={i} variant={"ghost"} className="w-full justify-center">
            <link.icon className="w-4 h-4" />
            {link.label}
          </Button>
        ))}
      </div>
      <div className="absolute bottom-20 w-full flex gap-1 flex-col items-center">
        <Progress
          value={(100 * (files?.length || 0)) / (userInfo?.credits || 0)}
          className="w-[80%]"
        />
        <p className="text-sm">
          {" "}
          {files && userInfo ? (
            `${files?.length}/${userInfo?.credits} PDFs uploaded`
          ) : (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
        </p>
      </div>
    </div>
  );
}
