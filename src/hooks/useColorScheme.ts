import { useEffect, useState } from "react";
import useMediaQuery from "./useMediaQuery";

export default function useColorScheme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themeType, setThemeType] = useState(prefersDarkMode ? "dark" : "light");

  const isDarkMode = themeType === "dark";

  const switchThemes = () => {
    setThemeType((last) => (last === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setThemeType(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  return { isDarkMode, prefersDarkMode, switchThemes, themeType, setThemeType };
}
