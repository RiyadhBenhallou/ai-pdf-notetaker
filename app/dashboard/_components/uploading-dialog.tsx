"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

export default function UploadingDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a PDF File</DialogTitle>
          <DialogDescription asChild>
            <div className="">
              <Label>Select a PDF File:</Label>
              <Input type="file" />
              <Label>Name</Label>
              <Input type="text" placeholder="Enter a name for your file" />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
          <Button>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
