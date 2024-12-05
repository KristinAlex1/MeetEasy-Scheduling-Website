// Apply "use client" only to components that need client-side logic
"use client"; 

import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles
import { Toaster } from "@/components/ui/sonner"; // Import the Toaster component
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // Import useTheme here
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useEffect } from "react"; // Import useEffect for client-side logic
import DarkMode from "@/components/ui/DarkMode/DarkMode";

const inter = Inter({ subsets: ["latin"] });

// A helper component to apply the dark theme class to the <html> element
<nav className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800">
      <div>My Website</div>
      {/* Add the Dark Mode Toggle */}
      <ThemeToggle />
    </nav>

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        
       {/* Add ThemeWrapper here */}
            <div className="min-h-screen">
            
              <DarkMode />
              <main>{children}</main>
            </div>
          
      </body>
    </html>
  );
}
