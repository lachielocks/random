import type { Metadata } from "next";
import "./globals.css";
import { BadgeProvider } from "@/context/BadgeContext";
import { BadgeNotification } from "@/components/BadgeNotification";
import { VisitTracker } from "@/components/VisitTracker";
import { PWAInstall } from "@/components/PWAInstall";

export const metadata: Metadata = {
  title: "Random Stuff",
  description: "Silly tools, funny generators, and pointless diversions.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Random Stuff",
    description: "Silly tools, funny generators, and pointless diversions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <BadgeProvider>
          <VisitTracker />
          {children}
          <BadgeNotification />
          <PWAInstall />
        </BadgeProvider>
      </body>
    </html>
  );
}
