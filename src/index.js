import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import Game from "./Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Game />}/>
  //   </Routes>
  // </BrowserRouter>
  <App />
);