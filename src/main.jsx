import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { ToastProvider } from "./components/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Router>
);
