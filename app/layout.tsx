import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/auth";
import AuthButtons from "@/components/auth-buttons";
import { HomeIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fire Homes",
  description: "Home listing app using Firebase and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider>
        <nav className="bg-primary text-secondary p-5 h-24 flex items-center justify-between">
          <Link href="/" className="text-3xl tracking-widest font-bold uppercase flex items-center gap-2">
            <HomeIcon/>
            <span>Fire Homes</span>
          </Link>
          <div className="flex space-x-4">
            <Link href="/property-search" className="button-link">
              Property Search
            </Link>
           <AuthButtons />
          </div>
        </nav>  
        {children} 
        <Toaster richColors closeButton position="top-center"/>         
        </AuthProvider>
      </body>
    </html>
  );
}
