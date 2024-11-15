"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import TextEditor from "../_components/text-editor";
import Navbar from "../_components/navbar";

export default function WorkspacePage() {
  const { fileId } = useParams();
  const file = useQuery(api.fileStorage.getFileById, {
    fileId: fileId as string,
  });
  useEffect(() => {
    console.log(file?.fileName);
  }, [file]);
  return (
    <div>
      <div className="p-3 shadow">
        <Navbar fileName={file?.fileName} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <TextEditor />
        </div>
        <div className="col-span-1 min-h-screen">
          <iframe
            src={`${file?.fileUrl}#toolbar=0`}
            width={"100%"}
            height={"100%"}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
