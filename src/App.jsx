import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import CamScan from "./pages/CamScan";
import ModelViewer from "./pages/ModelViewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/cam" element={<CamScan />} />
        <Route path="/game" element={<ModelViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
