import React, { useState } from "react";
import Name from "../assets/AppName.png";
import TutorialIcon from "../assets/Tutorial.png";
import Tutorial from "../components/Tutorial";

function Map() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const UserName = "";
  return (
    <div className="BG w-screen h-screen relative bg-[url('src/assets/MainBG.png')] bg-[58%] bg-cover">
      <div className="absolute top-10 left-2 w-25">
        <img className="w-full" src={Name} alt="" />
      </div>
      <div className="transTL absolute top-17 left-1/2 text-sm">
        {UserName}asdfzxcv
      </div>
      <div
        className="transTL absolute top-17 left-10/11 w-10"
        onClick={() => setIsPopupOpen(true)}
      >
        <img className="w-full" src={TutorialIcon} alt="" />
      </div>

      {isPopupOpen && <Tutorial onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
}

export default Map;
