"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import TextEditor from "../_components/text-editor";
import Navbar from "../_components/navbar";
import PDFReader from "../_components/pdf-reader"; // Adjust the import path as needed

export default function WorkspacePage() {
  const { fileId } = useParams<{ fileId: string }>();
  const file = useQuery(api.fileStorage.getFileById, {
    fileId: fileId as string,
  });

  return (
    <div>
      <div className="p-3 shadow-sm">
        <Navbar fileName={file?.fileName} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <TextEditor />
        </div>
        <div className="col-span-1">
          {file && (
            <PDFReader fileId={fileId as string} fileUrl={file.fileUrl} />
          )}
        </div>
      </div>
    </div>
  );
}
