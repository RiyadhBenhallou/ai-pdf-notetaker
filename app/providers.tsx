"use client";

import { GlobalToastContainer } from "@/components/global-toast-container";
import { ToastProvider } from "@/contexts/toast-context";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: ReactNode }) {
  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
    <ToastProvider>
      <TooltipProvider>
        <ClerkProvider afterSignOutUrl={"/"}>
          <ConvexProvider client={convex}>{children}</ConvexProvider>;
        </ClerkProvider>
      </TooltipProvider>
      <GlobalToastContainer />
    </ToastProvider>
    // </ThemeProvider>
  );
}
