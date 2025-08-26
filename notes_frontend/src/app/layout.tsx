import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import React from "react";

export const metadata: Metadata = {
  title: "Notes",
  description: "Personal notes manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cssVars: React.CSSProperties = {
    // set CSS variables for brand colors
    ["--color-primary" as unknown as keyof React.CSSProperties]: "#2563eb",
    ["--color-secondary" as unknown as keyof React.CSSProperties]: "#64748b",
    ["--color-accent" as unknown as keyof React.CSSProperties]: "#facc15",
    ["--color-background" as unknown as keyof React.CSSProperties]: "#ffffff",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={cssVars} className="text-gray-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
