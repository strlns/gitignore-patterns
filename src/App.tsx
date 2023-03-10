import { CssBaseline, GeistProvider, Link, Text } from "@geist-ui/core";
import ErrorBoundaryFallback from "components/Error/ErrorBoundaryFallback";
import Home from "pages/Home";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import useMediaQuery from "hooks/useMediaQuery";
import SquareButton from "components/Atoms/SquareButton";
import { Github, Moon, Sun } from "@geist-ui/icons";
import Box from "components/Atoms/Box";

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
        <Box
          justifyContent="space-between"
          style={{ position: "fixed", top: "1rem", right: "1rem" }}
        >
          <SquareButton icon={isDarkMode ? <Sun /> : <Moon />} onClick={switchThemes} />
          <Link href="https://github.com/strlns/gitignore-patterns">
            <SquareButton icon={<Github />} />
          </Link>
        </Box>
        <Text small style={{ position: "fixed", bottom: "0.5rem", left: "0.5rem" }}>
          <Link href="https://moritzrehbach.de">MR 03/2023</Link>
        </Text>
      </ErrorBoundary>
    </GeistProvider>
  );
}

export default App;
