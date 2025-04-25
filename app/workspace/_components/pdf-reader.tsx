"use client";

import { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";

const PDFReader = ({
  fileId,
  fileUrl,
}: {
  fileId: string;
  fileUrl: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const updateNotePage = useMutation(api.notes.updateNotePage);

  // Track page changes in the PDF viewer
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const checkCurrentPage = () => {
      try {
        const viewer = (iframe as any).contentWindow;
        if (viewer && viewer.PDFViewerApplication) {
          const pdfViewer = viewer.PDFViewerApplication;
          const currentPageNum = pdfViewer.page;
          const totalPagesNum = pdfViewer.pagesCount;

          if (currentPageNum && currentPageNum !== currentPage) {
            setCurrentPage(currentPageNum);
            updateNotePage({
              fileId: fileId as string,
              pageNumber: currentPageNum,
            });
          }

          if (totalPagesNum && totalPagesNum !== totalPages) {
            setTotalPages(totalPagesNum);
          }
        }
      } catch (error) {
        // Ignore errors from cross-origin iframe restrictions
        console.log(error);
      }
    };

    // Check for page changes every second
    const interval = setInterval(checkCurrentPage, 1000);

    return () => clearInterval(interval);
  }, [fileId, updateNotePage, currentPage, totalPages]);

  const handlePreviousPage = () => {
    try {
      const viewer = (iframeRef.current as any).contentWindow;
      if (viewer && viewer.PDFViewerApplication) {
        viewer.PDFViewerApplication.page--;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    try {
      const viewer = (iframeRef.current as any).contentWindow;
      if (viewer && viewer.PDFViewerApplication) {
        viewer.PDFViewerApplication.page++;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleZoomIn = () => {
    try {
      const viewer = (iframeRef.current as any).contentWindow;
      if (viewer && viewer.PDFViewerApplication) {
        viewer.PDFViewerApplication.zoomIn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleZoomOut = () => {
    try {
      const viewer = (iframeRef.current as any).contentWindow;
      if (viewer && viewer.PDFViewerApplication) {
        viewer.PDFViewerApplication.zoomOut();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRotate = () => {
    try {
      const viewer = (iframeRef.current as any).contentWindow;
      if (viewer && viewer.PDFViewerApplication) {
        const pdfViewer = viewer.PDFViewerApplication.pdfViewer;
        pdfViewer.pagesRotation = (pdfViewer.pagesRotation + 90) % 360;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* <div className="flex items-center justify-between p-2 border-b bg-muted/30">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousPage}
            disabled={currentPage <= 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <span className="text-sm">
            {isLoading ? "Loading..." : `${currentPage} / ${totalPages}`}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={isLoading}
          >
            <ZoomOut className="h-4 w-4" />
            <span className="sr-only">Zoom out</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={isLoading}
          >
            <ZoomIn className="h-4 w-4" />
            <span className="sr-only">Zoom in</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleRotate}
            disabled={isLoading}
          >
            <RotateCw className="h-4 w-4" />
            <span className="sr-only">Rotate</span>
          </Button>
        </div>
      </div> */}

      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={fileUrl}
          className={`w-full h-full border-none ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
};

export default PDFReader;
