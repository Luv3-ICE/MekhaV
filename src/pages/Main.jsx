import React, { useState } from "react";
import Name from "../assets/AppName.png";
import TutorialIcon from "../assets/Tutorial.png";
import Tutorial from "../components/Tutorial";
import MapView from "../components/Map";
import ThemeBTN from "../components/ThemeBTN";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const UserName = "";

  function goToCam() {
    navigate("/Cam");
  }

  return (
    <div className="BG w-svw h-svh bg-[url('src/assets/MainBG.png')] bg-[58%] bg-cover opacity-50">
      <div className="flex px-3 justify-between items-center h-1/10">
        <div className="w-25">
          <img className="w-full" src={Name} alt="" />
        </div>
        <div className="transTL absolute mt-4 left-1/2 text-sm font-bold">
          {UserName}asdfzxcv
        </div>
        <div className="w-10" onClick={() => setIsPopupOpen(true)}>
          <img className="w-full" src={TutorialIcon} alt="" />
        </div>
      </div>

      <div className="h-9/10 text-center content-center relative">
        <ThemeBTN
          text="Open Camera"
          className="shadow transTL absolute top-9/10 left-1/2 z-50"
          onClick={goToCam}
        />
        <MapView />
      </div>

      {isPopupOpen && <Tutorial onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Main;
