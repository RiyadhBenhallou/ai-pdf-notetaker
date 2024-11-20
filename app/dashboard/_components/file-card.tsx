import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRightFromSquare, Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeletionDialog from "./deletion-dialog";
import { EditDialog } from "./edit-dialog";

export default function FileCard(file: {
  _id: string;
  _creationTime: number;
  fileUrl: string;
  fileName: string;
  createdBy: string;
}) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <Image src={"/pdf.png"} width={50} height={50} alt="" />
        </CardTitle>
        <CardDescription>
          <Link
            className="flex items-center gap-2 mt-3"
            href={file.fileUrl}
            target="_blank"
          >
            <ArrowUpRightFromSquare className="w-4 h-4" />
            Open File
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1>{file.fileName}</h1>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <EditDialog file={file}>
            <Button variant={"ghost"} size={"icon"}>
              <Edit className="w-4 h-4" />
            </Button>
          </EditDialog>
          <DeletionDialog fileId={file._id}>
            <Button variant={"ghost"} size={"icon"}>
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </DeletionDialog>
        </div>
        <Button asChild size={"sm"}>
          <Link
            href={`/workspace/${file._id}`}
            target={"_blank"}
            className="text-sm"
          >
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
