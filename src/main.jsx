import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Profile from "./profile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile/:id" element={<Profile />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
