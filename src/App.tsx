import { CssBaseline, GeistProvider } from "@geist-ui/core";
import ErrorBoundaryFallback from "components/Error/ErrorBoundaryFallback";
import RouteError from "components/Error/RouteError";
import BottomBar from "components/Layout/BottomBar";
import useColorScheme from "hooks/useColorScheme";
import Home from "pages/Home";
import { useLayoutEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import "styles/_global.css";

function App() {
  const { themeType, isDarkMode } = useColorScheme();

  //no SSR or SSG here, so this is fine.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
        errorElement: <RouteError />,
      },
    ],
    { basename: "/gitignore-patterns/" }
  );

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <RouterProvider router={router} />
        <BottomBar />
      </ErrorBoundary>
    </GeistProvider>
  );
}

export default App;
