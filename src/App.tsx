import { CssBaseline, GeistProvider, Link, Text } from "@geist-ui/core";
import { Github, Moon, Sun } from "@geist-ui/icons";
import Box from "components/Atoms/Box";
import SquareButton from "components/Atoms/SquareButton";
import ErrorBoundaryFallback from "components/Error/ErrorBoundaryFallback";
import useColorScheme from "hooks/useColorScheme";
import Home from "pages/Home";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

function App() {
  const { isDarkMode, switchThemes, themeType } = useColorScheme();

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
          <SquareButton
            icon={isDarkMode ? <Sun /> : <Moon />}
            onClick={switchThemes}
            title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          />
          <Link
            href="https://github.com/strlns/gitignore-patterns"
            title="View on GitHub"
          >
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
