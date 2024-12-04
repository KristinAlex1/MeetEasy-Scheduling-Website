// Apply "use client" only to components that need client-side logic
"use client"; 

import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles
import { Toaster } from "@/components/ui/sonner"; // Import the Toaster component
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // Import useTheme here
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useEffect } from "react"; // Import useEffect for client-side logic

const inter = Inter({ subsets: ["latin"] });

// A helper component to apply the dark theme class to the <html> element
const ThemeWrapper = ({ children }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider>
          <ThemeWrapper> {/* Add ThemeWrapper here */}
            <div className="min-h-screen">
              <header className="p-4 bg-gray-100 dark:bg-gray-800">
                <ThemeToggle /> {/* Dark Mode Toggle */}
              </header>
              <main>{children}</main>
            </div>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
