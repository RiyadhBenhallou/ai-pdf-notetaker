"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function WorkspacePage() {
  const { fileId } = useParams();
  const file = useQuery(api.fileStorage.getFileById, {
    fileId: fileId as string,
  });
  useEffect(() => {
    console.log(file);
  }, [file]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-1"></div>
      <div className="col-span-1 min-h-screen">
        <iframe
          src={`${file?.fileUrl}#toolbar=0`}
          width={"100%"}
          className="h-[90vh] w-full"
        />
      </div>
    </div>
  );
}
