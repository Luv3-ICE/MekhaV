import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeBTN from "../components/ThemeBTN";

const CamScan = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userFlower = JSON.parse(localStorage.getItem("userFlower")) || [];
  const totalFlowers = 6;
  let watered = new Array(totalFlowers).fill(0);

  userFlower.forEach((flower) => {
    if (flower.flower_id >= 1 && flower.flower_id <= totalFlowers) {
      watered[flower.flower_id - 1] = 1;
    }
  });

  // console.log("Watered array:", watered);

  const cleanupVideoElements = () => {
    const videos = document.querySelectorAll(".mindar-ui-overlay");
    videos.forEach((video) => {
      video.srcObject = null;
      video.remove();
    });
  };

  const exit = () => {
    cleanupVideoElements();
    navigate("/main");
  };

  useEffect(() => {
    const markers = ["lavender", "lavender2", "rose", "sunflower"];
    const handleMarkerFound = (event) => {
      const markerId = event.target.id;
      let modelPath = "";

      if (markerId === "lavender") {
        modelPath = "lavender";
      }
      if (markerId === "rose") {
        modelPath = "rose";
      }
      if (modelPath) {
        cleanupVideoElements;
        navigate(
          `/game?model=${encodeURIComponent(modelPath)}&player=${
            userData.access_token
          }&flower=${watered.join("")}`
        );
      }
    };
    markers.forEach((id) => {
      document
        .getElementById(id)
        ?.addEventListener("targetFound", handleMarkerFound);
    });

    return () => {
      markers.forEach((id) => {
        document
          .getElementById(id)
          ?.removeEventListener("targetFound", handleMarkerFound);
      });
    };
  }, [navigate]);

  return (
    <div className="w-svw h-svh relative text-center bg-[url('src/assets/MainBG.png')] bg-[58%] bg-cover z-0">
      <ThemeBTN
        onClick={exit}
        text="Exit"
        className="absolute transTL top-1/20 z-10"
      />
      {/* <a-scene
        embedded
        arjs="debugUIEnabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        vr-mode-ui="enabled: false"
      >
        <a-marker
          id="lavender"
          preset="lavender"
          type="pattern"
          url="/marker/iHere.patt"
        ></a-marker>
        <a-marker
          id="lavender2"
          preset="lavender2"
          type="pattern"
          url="/marker/dokARai.patt"
        ></a-marker>
        <a-entity camera></a-entity>
      </a-scene> */}
      <a-scene
        mindar-image="imageTargetSrc: /marker/targets.mind;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0" id="lavender"></a-entity>
        <a-entity mindar-image-target="targetIndex: 1" id="rose"></a-entity>
      </a-scene>
    </div>
  );
};

export default CamScan;
