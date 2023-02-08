import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import ErrorBoundaryFallback from "./components/Error/ErrorBoundaryFallback";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={(props) => <ErrorBoundaryFallback {...props} />}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
