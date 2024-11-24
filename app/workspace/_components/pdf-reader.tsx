import React, { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const PDFReader = ({
  fileId,
  fileUrl,
}: {
  fileId: string;
  fileUrl: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
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
          const currentPage = viewer.PDFViewerApplication.page;
          if (currentPage) {
            updateNotePage({
              fileId: fileId as string,
              pageNumber: currentPage,
            });
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
  }, [fileId, updateNotePage]);

  return (
    <div className="min-h-screen">
      {isLoading && (
        <div className="w-full h-[800px] flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={fileUrl}
        className={`w-full h-[800px] border-none ${isLoading ? "hidden" : "block"}`}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default PDFReader;
