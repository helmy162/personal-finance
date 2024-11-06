import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ExpenseTree",
  description: "Personal Finance Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen overflow-hidden">
          <aside className="hidden w-64 overflow-y-auto border-r bg-background md:block">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <span className="font-bold">ExpenseTree</span>
              </div>
              <Sidebar />
            </div>
          </aside>
          <div className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-14 items-center border-b px-4 md:hidden">
              <Sidebar />
              <span className="font-bold">ExpenseTree</span>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
