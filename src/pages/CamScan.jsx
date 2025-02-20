import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeBTN from "../components/ThemeBTN";

const CamScan = () => {
  const navigate = useNavigate();

  const cleanupVideoElements = () => {
    // ลบ video elements ทั้งหมดที่มี id เป็น arjs-video
    const videos = document.querySelectorAll("video#arjs-video");
    videos.forEach((video) => {
      // หยุดการเล่นวิดีโอ
      video.pause();
      // ล้าง source
      video.srcObject = null;
      // ลบ element
      video.remove();
    });
  };

  const exit = () => {
    cleanupVideoElements();
    navigate("/Main");
  };

  useEffect(() => {
    const handleMarkerFound = (event) => {
      const markerId = event.target.id;
      let modelPath = "";

      if (markerId === "lavender") {
        modelPath = "lavender";
      }
      if (modelPath) {
        navigate(`/Model?model=${encodeURIComponent(modelPath)}`);
      }
    };
    document.querySelectorAll("a-marker").forEach((marker) => {
      marker.addEventListener("markerFound", handleMarkerFound);
    });
    return () => {
      document.querySelectorAll("a-marker").forEach((marker) => {
        marker.removeEventListener("markerFound", handleMarkerFound);
      });
      cleanupVideoElements();
    };
  }, [navigate]);

  return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <ThemeBTN onClick={exit} text="exit" />
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
          renderer="logarithmicDepthBuffer: true;"
          vr-mode-ui="enabled: false"
        >
          <a-marker
            id="lavender"
            preset="lavender"
            type="pattern"
            url="src/assets/marker/lavender.patt"
          >
            {/* <a-box position="0 0.5 0" color="red"></a-box> */}
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </div>
  );
};

export default CamScan;
