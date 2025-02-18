import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "@google/model-viewer";

const ModelViewer = () => {
    const [searchParams] = useSearchParams();
    const modelUrl = searchParams.get("model");

  return (
    <div className="">
      <model-viewer
        src={modelUrl}
        alt="3D Model"
        ar
        ar-modes="webxr quick-look"
        camera-controls
        touch-action="pan-y"
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
          zindex: "100",
        }}
      >
        <button slot="ar-button" style={arButtonStyle}>
          ดูใน AR
        </button>
      </model-viewer>
    </div>
  );
};

const arButtonStyle = {
  background: "#000",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

export default ModelViewer;
