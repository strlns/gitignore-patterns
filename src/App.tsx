import { CssBaseline, GeistProvider } from "@geist-ui/core";
import ErrorBoundaryFallback from "components/Error/ErrorBoundaryFallback";
import Home from "pages/Home";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import useMediaQuery from "hooks/useMediaQuery";
import SquareButton from "components/Atoms/SquareButton";
import { Moon, Sun } from "@geist-ui/icons";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themeType, setThemeType] = useState(prefersDarkMode ? "dark" : "light");

  const isDarkMode = themeType === "dark";

  const switchThemes = () => {
    setThemeType((last) => (last === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setThemeType(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
    ],
    { basename: "/gitignore-patterns/" }
  );

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <RouterProvider router={router} />
        <SquareButton
          icon={isDarkMode ? <Sun /> : <Moon />}
          onClick={switchThemes}
          style={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
      </ErrorBoundary>
    </GeistProvider>
  );
}

export default App;
