"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TextEditor from "../_components/text-editor";
import Navbar from "../_components/navbar";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function WorkspacePage() {
  const { fileId } = useParams<{ fileId: string }>();
  const file = useQuery(api.fileStorage.getFileById, {
    fileId: fileId as string,
  });
  const updateNotePage = useMutation(api.notes.updateNotePage);

  const savedPageNumber = useQuery(api.notes.getPageNumber, {
    fileId: fileId as string,
  });

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Set initial page number only once when savedPageNumber is loaded
  useEffect(() => {
    if (savedPageNumber !== undefined && !hasInitialized) {
      setPageNumber(savedPageNumber as number);
      setHasInitialized(true);
    }
  }, [savedPageNumber, hasInitialized]);

  // Update database only when page number is manually changed
  useEffect(() => {
    const updatePageInDb = async () => {
      if (fileId && hasInitialized && pageNumber !== savedPageNumber) {
        try {
          await updateNotePage({
            fileId: fileId as string,
            pageNumber: pageNumber,
          });
        } catch (error) {
          console.error("Error updating page number in database:", error);
        }
      }
    };

    updatePageInDb();
  }, [pageNumber, fileId, updateNotePage, savedPageNumber, hasInitialized]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || prev));
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = Number(e.target.value);
    if (numPages && page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
  };

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
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              disabled={pageNumber === 1}
              onClick={goToPreviousPage}
            >
              <MoveLeft />
            </Button>
            <p>
              <input
                type="text"
                value={pageNumber}
                className="w-10 text-center"
                onChange={handlePageInputChange}
              />{" "}
              of {numPages}
            </p>
            <Button
              variant="ghost"
              disabled={pageNumber === numPages}
              onClick={goToNextPage}
            >
              <MoveRight />
            </Button>
          </div>
          {file && (
            <Document
              file={file?.fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
