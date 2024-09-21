import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import ErrorFallback from "./components/UI/ErrorFallback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace(window.location.pathname)}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
