import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ToastContextProvider from "./contexts/toast-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContextProvider>
      <App />
    </ToastContextProvider>
  </React.StrictMode>
);
