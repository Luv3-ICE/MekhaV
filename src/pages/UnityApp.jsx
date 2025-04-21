import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeBTN from "../components/ThemeBTN";
import Home from "../assets/home.png";

const UnityApp = () => {
  const navigate = useNavigate();

  const exit = () => {
    navigate("/main");
  };

  const urlParams = new URLSearchParams(window.location.search);
  const modelPath = urlParams.get("model");
  const playerToken = urlParams.get("player");
  const flower1 = urlParams.get("flower_1");
  const flower2 = urlParams.get("flower_2");
  const flower3 = urlParams.get("flower_3");
  const flower4 = urlParams.get("flower_4");
  const flower5 = urlParams.get("flower_5");
  const flower6 = urlParams.get("flower_6");
  const unityUrl = `/Watering/index.html?model=${modelPath}&player=${playerToken}&flower_1=${flower1}&flower_2=${flower2}&flower_3=${flower3}&flower_4=${flower4}&flower_5=${flower5}&flower_6=${flower6}`;

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);
        if (data?.path === "/main") {
          console.log("Navigating to:", data.path);
          navigate("/main");
        } else if (data?.path === "/Camara") {
          navigate("/cam");
        }
      } catch (error) {
        console.error("Failed to parse message from Unity:", error);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  return (
    <>
      <iframe
        id="unity-iframe"
        src={unityUrl}
        title="Unity WebGL"
        style={{ width: "100svw", height: "100svh", border: "none" }}
        allow="camera;"
      />
    </>
  );
};

export default UnityApp;
