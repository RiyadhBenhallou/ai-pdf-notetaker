import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { ReactNode, useState, useTransition } from "react";

export function EditDialog({
  children,
  file,
}: {
  children: ReactNode;
  file: {
    _id: string;
    _creationTime: number;
    fileUrl: string;
    fileName: string;
    createdBy: string;
  };
}) {
  const [fileName, setFileName] = useState<string>(file.fileName);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const editFile = useMutation(api.fileStorage.editFile);
  const handleSubmit = () => {
    startTransition(async () => {
      editFile({
        fileId: file._id,
        fileName,
      });
      setIsOpen(false);
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit file</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Filename
            </Label>
            <Input
              id="username"
              defaultValue={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isPending} onClick={handleSubmit}>
            {" "}
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />} Save
            changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
