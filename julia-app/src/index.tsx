import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Or replace with your custom styles
import JuliaChat from "./components/juliaChat";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <JuliaChat />
  </React.StrictMode>
);
