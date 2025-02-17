import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Map from "./pages/Map";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
