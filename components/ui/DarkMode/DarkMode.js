import React, { useEffect } from "react";

import "./DarkMode.css";
import { Moon, Sun } from "lucide-react";

const DarkMode = () => {
  const setThemeDark = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const setThemeLight = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleTheme = e => {
    if(e.target.checked) {
        setThemeDark();
    } else {
        setThemeLight();
    }
  }

  useEffect(() => {
    // Check the initial theme state and set accordingly
    const darkModeToggle = document.getElementById("darkmode-toggle");
    if (darkModeToggle) {
      darkModeToggle.addEventListener("change", (e) => {
        if (e.target.checked) {
          setThemeDark();
        } else {
          setThemeLight();
        }
      });
    }

    // Cleanup event listener on component unmount
    return () => {
      if (darkModeToggle) {
        darkModeToggle.removeEventListener("change", () => {});
      }
    };
  }, []);

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
