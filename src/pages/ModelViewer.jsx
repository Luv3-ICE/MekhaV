import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "@google/model-viewer";

const ModelViewer = () => {
  const [phase, setPhase] = useState(1);
  const [searchParams] = useSearchParams();
  const modelUrl = searchParams.get("model");
  const modelPath = `/models/${modelUrl}${phase}.glb`;
  const modelViewerRef = useRef(null);
  const [watering, setWatering] = useState(false);

  const playAnimation = () => {
    if (phase < 3) {
      setWatering(true);
      setTimeout(() => {
        setWatering(false);
        setPhase((prevPhase) => (prevPhase < 3 ? prevPhase + 1 : prevPhase));
      }, 6000);
    }
  };

  return (
    <div className="bg-gray-900 w-svw h-svh z-100 fixed top-0 left-0">
      <model-viewer
        ref={modelViewerRef}
        className="transTL absolute top-1/2 left-1/2 w-svw h-svh z-20"
        src={modelPath}
        alt="3D Model"
        ar
        ar-modes="webxr quick-look"
        camera-controls
        touch-action="pan-y"
        autoplay
        scale="0.3 0.3 0.3"
        camera-orbit="0deg 75deg 2m"
      >
        <button slot="ar-button" style={arButtonStyle}>
          ดูใน AR
        </button>
      </model-viewer>
      {watering && (
        <model-viewer
          src="/models/wateringcan.glb"
          alt="Watering Can"
          animation-name="Animation.glb"
          autoplay
          className="transTL absolute top-1/2 left-1/2 w-svw h-svh z-10"
          camera-orbit="180deg 90deg 6m"
          position="0 0 0"
          scale="0.5 0.5 0.5"
        ></model-viewer>
      )}
      {/* ปุ่มรดน้ำ */}
      {phase < 3 && (
        <button onClick={playAnimation} style={buttonStyle}>
          รดน้ำดอกไม้ 🌿💦
        </button>
      )}
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

const buttonStyle = {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  top: "80%",
  padding: "10px 20px",
  fontSize: "18px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  zIndex: "50",
};

export default ModelViewer;
