import type React from "react";
// import "./globals.css";
import type { Metadata } from "next";
// import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Document Workspace",
  description:
    "AI-powered document workspace for analyzing PDFs and taking notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
    <TooltipProvider>{children}</TooltipProvider>
    // </ThemeProvider>
  );
}
