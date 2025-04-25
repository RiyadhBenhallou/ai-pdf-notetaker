"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import TextEditor from "../_components/text-editor";
import PDFReader from "../_components/pdf-reader";
import WorkspaceHeader from "@/components/workspace-header";
import WorkspaceGuide from "@/components/workspace-guide";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function WorkspacePage() {
  const { fileId } = useParams<{ fileId: string }>();
  const file = useQuery(api.fileStorage.getFileById, {
    fileId: fileId as string,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Simulate saving for demo purposes
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  // For mobile view, we'll use tabs instead of a split view
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen">
        <WorkspaceHeader
          fileName={file?.fileName}
          onSave={handleSave}
          isSaving={isSaving}
        />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="flex-1 overflow-auto">
            <TextEditor />
          </TabsContent>

          <TabsContent value="pdf" className="flex-1 overflow-auto">
            {file && (
              <PDFReader fileId={fileId as string} fileUrl={file.fileUrl} />
            )}
          </TabsContent>
        </Tabs>

        <WorkspaceGuide />
      </div>
    );
  }

  // Desktop view with resizable panels
  return (
    <div className="flex flex-col h-screen">
      <WorkspaceHeader
        fileName={file?.fileName}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full overflow-auto">
            <TextEditor />
          </div>
        </ResizablePanel>

        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full overflow-auto">
            {file && (
              <PDFReader fileId={fileId as string} fileUrl={file.fileUrl} />
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <WorkspaceGuide />
    </div>
  );
}
