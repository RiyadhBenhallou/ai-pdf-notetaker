"use client";

import { useEffect } from "react";
import { useToast } from "@/contexts/toast-context";

const guides = [
  {
    id: "select-text-guide",
    title: "How to Use AI in Your Workspace",
    description:
      "Select any text in the editor, then click the sparkle icon to generate AI responses based on your PDF content.",
  },
  {
    id: "save-notes-guide",
    title: "Save Your Notes",
    description:
      "Your notes are automatically saved when you use AI, but you can also manually save by clicking the save icon.",
  },
  {
    id: "pdf-navigation-guide",
    title: "PDF Navigation",
    description:
      "The PDF viewer tracks your current page. Use the PDF controls to navigate through the document.",
  },
];

export default function WorkspaceGuide() {
  const { showToast } = useToast();

  // Show the first guide on mount
  useEffect(() => {
    // Add a slight delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      showToast({
        id: guides[0].id,
        title: guides[0].title,
        description: guides[0].description,
        variant: "info",
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [showToast]);

  return null;
}
