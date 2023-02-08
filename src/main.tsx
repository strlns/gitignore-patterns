import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./pages/App";
import ErrorBoundaryFallback from "./components/Error/ErrorBoundaryFallback";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={(props) => <ErrorBoundaryFallback {...props} />}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
