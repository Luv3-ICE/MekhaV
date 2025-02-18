import React from "react";
import "@google/model-viewer";

function ARModel() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <model-viewer
        src="/lavender.glb" // เปลี่ยนเป็นไฟล์โมเดลของคุณ
        alt="3D Model"
        ar
        ar-modes="webxr quick-look"
        camera-controls
        touch-action="pan-y"
        style={{ width: "100%", height: "500px" }}
      >
        <button slot="ar-button" style={arButtonStyle}>
          ดูใน AR
        </button>
      </model-viewer>
    </div>
  );
}

// ปรับแต่งสไตล์ปุ่ม AR
const arButtonStyle = {
  background: "#000",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

export default ARModel;
