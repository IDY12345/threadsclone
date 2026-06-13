import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Relay — Keep your team in sync",
  description: "Relay is the enterprise workspace for team communication — posts, spaces, and people, all in one calm, focused place.",
  openGraph: {
    title: "Relay — Keep your team in sync",
    description: "The enterprise workspace for team communication — posts, spaces, and people, all in one calm, focused place.",
    type: "website",
    siteName: "Relay",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0f",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider ui={ui}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${spaceGrotesk.className} bg-dark-1 text-light-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
