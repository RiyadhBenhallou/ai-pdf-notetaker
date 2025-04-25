"use client";

import { useState, useEffect } from "react";
import { PersistentToast } from "@/components/ui/persistent-toast";
import { Sparkles, MousePointer, FileText } from "lucide-react";

const guides = [
  {
    id: "select-text-guide",
    title: "Select Text for AI Analysis",
    description:
      "Select any text in the editor, then click the sparkle icon to generate an AI response based on your selection.",
    icon: Sparkles,
  },
  {
    id: "save-notes-guide",
    title: "Save Your Notes",
    description:
      "Your notes are automatically saved when you use AI, but you can also manually save by clicking the save icon.",
    icon: FileText,
  },
  {
    id: "pdf-navigation-guide",
    title: "PDF Navigation",
    description:
      "The PDF viewer tracks your current page. Use the PDF controls to navigate through the document.",
    icon: MousePointer,
  },
];

export default function WorkspaceGuide() {
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Check if user has seen the guide before, but only once during initial mount
  useEffect(() => {
    if (!hasInitialized) {
      const hasSeenGuide = localStorage.getItem("hasSeenWorkspaceGuide");
      if (hasSeenGuide === "true") {
        setShowGuide(false);
      }
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  const handleDismissAll = () => {
    setShowGuide(false);
    localStorage.setItem("hasSeenWorkspaceGuide", "true");
  };

  const handleNext = () => {
    setCurrentGuideIndex((prev) => (prev + 1) % guides.length);
  };

  if (!showGuide) return null;

  const currentGuide = guides[currentGuideIndex];

  return (
    <PersistentToast
      id={currentGuide.id}
      title={currentGuide.title}
      description={currentGuide.description}
      variant="info"
      position="bottom-right"
      onDismiss={handleDismissAll}
    />
  );
}
