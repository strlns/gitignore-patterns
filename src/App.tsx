import { CssBaseline, GeistProvider } from "@geist-ui/core";
import ErrorBoundaryFallback from "components/Error/ErrorBoundaryFallback";
import Home from "pages/Home";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

function App() {
  const [themeType, setThemeType] = useState("light");
  const switchThemes = () => {
    setThemeType((last) => (last === "dark" ? "light" : "dark"));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </GeistProvider>
  );
}

export default App;
