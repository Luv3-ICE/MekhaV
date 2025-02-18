import React, { useState } from "react";
import Name from "../assets/AppName.png";
import TutorialIcon from "../assets/Tutorial.png";
import Tutorial from "../components/Tutorial";
import MapView from "../components/Map";
import ThemeBTN from "../components/ThemeBTN";

const Main = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const UserName = "";
  return (
    <div className="BG w-screen h-screen bg-[url('src/assets/MainBG.png')] bg-[58%] bg-cover">
      <div className="flex pt-12 px-3 justify-between items-center">
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
      <div className="flex flex-col items-center">
        <MapView />
        <ThemeBTN text="Camera" className="shadow " />
      </div>

      {isPopupOpen && <Tutorial onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Main;
