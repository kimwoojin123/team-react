import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {Head, Board} from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Head />
    <Board />
  </React.StrictMode>
);

reportWebVitals();
