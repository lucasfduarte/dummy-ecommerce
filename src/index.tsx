import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import ProductDetail from "./screens/ProductDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={ProductDetail} path="/product" />
        <Route Component={Cart} path="/cart" />
      </Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
