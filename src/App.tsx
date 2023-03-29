import { CssBaseline, GeistProvider } from "@geist-ui/core";
import ErrorBoundaryFallback from "components/Error/ErrorBoundaryFallback";
import RouteError from "components/Error/RouteError";
import BottomBar from "components/Layout/BottomBar";
import useColorScheme from "hooks/useColorScheme";
import Home from "pages/Home";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import "styles/_global.css";

function App() {
  const { themeType } = useColorScheme();

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
