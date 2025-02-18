import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CamScan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMarkerFound = (event) => {
      const markerId = event.target.id;
      let modelPath = "";

      if (markerId === "lavender") {
        modelPath = "/lavender.glb"; // URL ของโมเดลที่จะแสดง
      }
      if (modelPath) {
        // ทำการนำทางไปยังหน้า ModelViewer พร้อมส่ง URL ของโมเดล
        navigate(`/Model?model=${encodeURIComponent(modelPath)}`);
      }
    };
    // เพิ่ม event listener ให้กับ marker
    document.querySelectorAll("a-marker").forEach((marker) => {
      marker.addEventListener("markerFound", handleMarkerFound);
    });
    // ลบ event listener เมื่อ component ถูกทำลาย
    return () => {
      document.querySelectorAll("a-marker").forEach((marker) => {
        marker.removeEventListener("markerFound", handleMarkerFound);
      });
    };
  }, [navigate]);

  return (
    <a-scene embedded arjs>
      <a-marker
        id="lavender"
        preset="lavender"
        type="pattern"
        url="src/assets/marker/lavender.patt"
      >
        <a-box position="0 0.5 0" material="color: red"></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default CamScan;
