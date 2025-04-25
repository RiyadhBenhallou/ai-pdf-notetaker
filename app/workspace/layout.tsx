import type React from "react";
// import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

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
    <>
      {/* <html lang="en" suppressHydrationWarning> */}
      {/* <body className={inter.className}> */}
      {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
      <TooltipProvider>{children}</TooltipProvider>
      {/* </ThemeProvider> */}
      {/* </body> */}
      {/* </html> */}
    </>
  );
}
