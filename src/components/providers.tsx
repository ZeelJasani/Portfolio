"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { AppProgressProvider } from "@bprogress/next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <JotaiProvider>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          storageKey="theme"
          defaultTheme="dark"
          attribute="class"
        >
          <AppProgressProvider
            color="var(--foreground)"
            height="2px"
            delay={500}
            options={{ showSpinner: false }}
          >
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </AppProgressProvider>

          <Toaster position="top-center" />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </JotaiProvider>
    </ClerkProvider>
  );
}
