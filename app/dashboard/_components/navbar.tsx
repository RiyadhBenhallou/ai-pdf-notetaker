"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

export default function Navbar() {
  return (
    <div className="flex md:flex-row-reverse items-center justify-between container mx-auto py-3 px-3 bg-gray-50">
      {/* <div className="flex items-center space-x-4">
        <Image src="/logo.svg" alt="logo" width={38} height={38} />
        <h1 className="text-xl font-bold hidden sm:inline-block">
          Your App Name
        </h1>
      </div> */}
      <UserButton />
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-80 p-0">
            <Sidebar />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
