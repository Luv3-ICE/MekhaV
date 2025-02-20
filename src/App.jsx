import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import CamScan from "./pages/CamScan";
import ModelViewer from "./pages/ModelViewer";
import ARScene from "./pages/tryModel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Cam" element={<CamScan />} />
        <Route path="/Model" element={<ModelViewer />} />
        {/* <Route path="/Model" element={<ARScene />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
