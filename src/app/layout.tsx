import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BadgeProvider } from "@/context/BadgeContext";
import { BadgeNotification } from "@/components/BadgeNotification";
import { PageTransition } from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BadgeProvider>
          <PageTransition>{children}</PageTransition>
          <BadgeNotification />
        </BadgeProvider>
      </body>
    </html>
  );
}
