"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Layout, Loader2, Plus, Shield } from "lucide-react";
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
  const { user } = useUser();
  const userInfo = useQuery(api.user.getUserByEmail, {
    email: user?.primaryEmailAddress?.emailAddress as string,
  });
  const files = useQuery(api.fileStorage.getUserFiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress as string,
  });
  return (
    <div className="md:w-64 shadow h-screen relative">
      <div className="flex justify-center mb-12 p-3">
        <Image src={"/logo.svg"} alt="logo" width={38} height={38} />
      </div>
      <div className="flex flex-col w-full gap-2 p-3">
        <UploadingDialog>
          <Button
            className="justify-center w-full"
            disabled={(files?.length || 0) >= (userInfo?.credits || 0)}
          >
            {files && userInfo ? (
              <Plus />
            ) : (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            Upload PDF
          </Button>
        </UploadingDialog>
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
