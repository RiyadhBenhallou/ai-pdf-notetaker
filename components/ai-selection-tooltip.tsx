"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AISelectionTooltipProps {
  onAISelect: () => void;
  isProcessing: boolean;
}

export default function AISelectionTooltip({
  onAISelect,
  isProcessing,
}: AISelectionTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();

      if (selection && selection.toString().trim().length > 0) {
        // Get selection coordinates
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setPosition({
          top: rect.bottom + window.scrollY + 10,
          left: rect.left + window.scrollX + rect.width / 2 - 60,
        });

        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    };

    // Handle clicks outside the tooltip
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!showTooltip) return null;

  return (
    <div
      ref={tooltipRef}
      className={cn(
        "fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700 transition-opacity",
        isProcessing ? "opacity-50 pointer-events-none" : "opacity-100"
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <Button
        size="sm"
        variant="ghost"
        className="flex items-center gap-1 text-xs"
        onClick={onAISelect}
        disabled={isProcessing}
      >
        <Sparkles className="h-3 w-3 text-yellow-500" />
        {isProcessing ? "Processing..." : "Generate with AI"}
      </Button>
    </div>
  );
}
