"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Save, FileText, HelpCircle } from "lucide-react";
import { useState } from "react";
import { PersistentToast } from "@/components/ui/persistent-toast";
import Link from "next/link";

interface WorkspaceHeaderProps {
  fileName?: string;
  onSave?: () => void;
  isSaving?: boolean;
  onHelp?: () => void;
}

export default function WorkspaceHeader({
  fileName,
  onSave,
  isSaving = false,
  onHelp,
}: WorkspaceHeaderProps) {
  const [showHelp, setShowHelp] = useState(false);

  const handleHelpClick = () => {
    setShowHelp(!showHelp);
    if (onHelp) onHelp();
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Link href={"/dashboard"}>
          <FileText className="h-5 w-5 text-primary" />
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

        <Button
          variant="ghost"
          size="icon"
          onClick={handleHelpClick}
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>

        <ThemeToggle />
      </div>

      {showHelp && (
        <PersistentToast
          id="workspace-help"
          title="How to use AI in your workspace"
          description="Select text in the editor and click the sparkle icon to generate AI-powered responses based on your PDF content."
          variant="info"
          position="top-right"
          onDismiss={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}
