import type { Metadata } from "next";
import "./globals.css";
import { BadgeProvider } from "@/context/BadgeContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { BadgeNotification } from "@/components/BadgeNotification";
import { VisitTracker } from "@/components/VisitTracker";
import { PWAInstall } from "@/components/PWAInstall";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("random-stuff-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <BadgeProvider>
            <VisitTracker />
            {children}
            <ThemeToggle />
            <BadgeNotification />
            <PWAInstall />
          </BadgeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
