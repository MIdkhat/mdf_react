import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MapProvider } from "./context/MapContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  </React.StrictMode>
);