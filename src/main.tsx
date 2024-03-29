import App from "App";
import React from "react";
import ReactDOM from "react-dom/client";
import cssHasPseudo from "css-has-pseudo/browser";

cssHasPseudo(document);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
