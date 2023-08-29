import React from "react";
import ReactDom from "react-dom/client"
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.js";
import { ThemeProvider } from "./context/ThemeProvider.js";
import { BrowserRouter } from "react-router-dom";

const root = ReactDom.createRoot(document.querySelector(".root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);