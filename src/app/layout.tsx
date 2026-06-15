import type { Metadata } from "next";
import "./globals.css";
import { BadgeProvider } from "@/context/BadgeContext";
import { BadgeNotification } from "@/components/BadgeNotification";

export const metadata: Metadata = {
  title: "Random Stuff",
  description: "Silly tools, funny generators, and pointless diversions.",
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
          {children}
          <BadgeNotification />
        </BadgeProvider>
      </body>
    </html>
  );
}
