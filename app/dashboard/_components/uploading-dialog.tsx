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
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { ReactNode, useState, useTransition } from "react";

export default function UploadingDialog({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const saveFile = useMutation(api.fileStorage.saveFile);
  const embedDoc = useAction(api.myActions.ingest);

  function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      // You can handle the uploaded files here
      setFile(files[0]);
    }
  }

  function handleUpload() {
    startTransition(async () => {
      const postUrl = await generateUploadUrl();
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file!.type },
        body: file,
      });
      const { storageId } = await result.json();
      const savedFile = await saveFile({
        storageId,
        fileName: fileName,
        createdBy: user?.primaryEmailAddress?.emailAddress as string,
      });
      const response = await fetch(`/api/pdf-loader?pdfUrl=${savedFile.url}`);
      const data = await response.json();
      console.log(data.result);
      await embedDoc({
        splitText: data.result,
        fileId: savedFile.fileId,
      });
      setIsOpen(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a PDF File</DialogTitle>
          <DialogDescription asChild>
            <div className="">
              <Label>Select a PDF File:</Label>
              <Input
                type="file"
                accept="application/pdf"
                className="cursor-pointer"
                onChange={onFileSelect}
              />
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Enter a name for your file"
                defaultValue={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={handleUpload}>
            {isPending && <Loader2 className="animate-spin" />}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
