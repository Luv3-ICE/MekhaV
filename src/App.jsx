import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import CamScan from "./pages/CamScan";
// import ModelViewer from "./pages/ModelViewer";
import UnityApp from "./pages/UnityApp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<UnityApp />} /> */}
        <Route path="/main" element={<Main />} />
        <Route path="/cam" element={<CamScan />} />
        <Route path="/game" element={<UnityApp />} />
      </Routes>
    </Router>
  );
};

export default App;
