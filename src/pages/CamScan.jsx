import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeBTN from "../components/ThemeBTN";
import Home from "../assets/home.png";

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
    const markers = ["girl1", "girl2", "girl3", "boy1", "boy2", "boy3"];
    const handleMarkerFound = (event) => {
      const markerId = event.target.id;
      let modelPath = "";

      if (markerId === "boy1") {
        modelPath = "0";
      }
      if (markerId === "boy2") {
        modelPath = "1";
      }
      if (markerId === "boy3") {
        modelPath = "2";
      }
      if (markerId === "girl1") {
        modelPath = "3";
      }
      if (markerId === "girl2") {
        modelPath = "4";
      }
      if (markerId === "girl3") {
        modelPath = "5";
      }
      if (modelPath) {
        cleanupVideoElements();
        navigate(
          `/game?model=${modelPath}&player=${userData.access_token}&flower_1=${watered[0]}&flower_2=${watered[1]}&flower_3=${watered[2]}&flower_4=${watered[3]}&flower_5=${watered[4]}&flower_6=${watered[5]}`
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
    <div className="w-svw h-svh relative text-center bg-black bg-[58%] bg-cover z-0">
      <ThemeBTN
        onClick={exit}
        icon={Home}
        className="absolute top-3 left-3 z-10 w-12 h-12 "
      />
      <a-scene
        mindar-image="imageTargetSrc: /marker/final_targetsV2.mind;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        xr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        embedded
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0" id="boy1"></a-entity>
        <a-entity mindar-image-target="targetIndex: 1" id="boy2"></a-entity>
        <a-entity mindar-image-target="targetIndex: 2" id="boy3"></a-entity>
        <a-entity mindar-image-target="targetIndex: 3" id="girl1"></a-entity>
        <a-entity mindar-image-target="targetIndex: 4" id="girl2"></a-entity>
        <a-entity mindar-image-target="targetIndex: 5" id="girl3"></a-entity>
      </a-scene>
    </div>
  );
};

export default CamScan;
