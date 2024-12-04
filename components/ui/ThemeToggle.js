"use client";

// components/ThemeToggle.js

import { useTheme } from "@/app/context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // Import icons for the toggle

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none">
      {isDarkMode ? <Moon className="w-6 h-6 text-white" /> : <Sun className="w-6 h-6 text-black" />}
    </button>
  );
};

export default ThemeToggle;
