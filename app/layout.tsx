import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Navbar } from "@/components/features/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CoinPeek",
  description: "Real-time crypto market data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="absolute top-0 left-0 -z-10 pointer-events-none">
              <div className="w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
            </div>
            <div className="absolute bottom-0 right-0 -z-10 pointer-events-none">
              <div className="w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            </div>
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}