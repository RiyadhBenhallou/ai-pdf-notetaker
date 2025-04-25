"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Save, FileText, HelpCircle } from "lucide-react";
import { useToast } from "@/contexts/toast-context";
import Link from "next/link";
import Image from "next/image";

interface WorkspaceHeaderProps {
  fileName?: string;
  onSave?: () => void;
  isSaving?: boolean;
}

export default function WorkspaceHeader({
  fileName,
  onSave,
  isSaving = false,
}: WorkspaceHeaderProps) {
  const { showToast } = useToast();

  const handleHelpClick = () => {
    showToast({
      id: "help-toast",
      title: "How to Use AI in Your Workspace",
      description:
        "Select text in the editor and click the sparkle icon to generate AI-powered responses based on your PDF content.",
      variant: "info",
    });
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="shrink-0 flex items-center">
          <Image src={"/logo.svg"} alt="" height={38} width={38} />
        </Link>
        <h1 className="text-lg font-medium truncate max-w-[200px] sm:max-w-md">
          {fileName || "Untitled Document"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="animate-pulse">Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save
            </>
          )}
        </Button>

        {/* <Button
          variant="ghost"
          size="icon"
          onClick={handleHelpClick}
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </Button> */}

        <ThemeToggle />
      </div>
    </div>
  );
}
