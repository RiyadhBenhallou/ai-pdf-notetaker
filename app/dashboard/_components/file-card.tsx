import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRightFromSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FileCard(file: {
  _id: string;
  _creationTime: number;
  fileUrl: string;
  fileName: string;
  createdBy: string;
}) {
  return (
    <Card>
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
      <CardFooter className="flex flex-row-reverse justify-start">
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
