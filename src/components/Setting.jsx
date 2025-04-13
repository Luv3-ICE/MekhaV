import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Close from "../assets/Close.png";
import TutorialPopup from "./Tutorial";
import Tutorial from "../assets/Tutorial.png";
import Watered from "../assets/Watered.png";
import giftBoxCC from "../assets/giftBoxCC.png";
import ThemeBTN from "./ThemeBTN";
import { useNavigate } from "react-router-dom";
import Mascot from "../assets/mascot.png";

const Setting = ({ onClose, flowers }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isClosing, setIsClosing] = useState(false);

  const wateredCount = flowers.filter(
    (flower) => flower.status !== "thirsty"
  ).length;
  const totalFlowers = flowers.length;

  const progressPercentage = (wateredCount / totalFlowers) * 100;
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  const deleteLS = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userFlower");
    navigate("/");
  };

  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-black/70 z-30">
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        exit={{ y: "-100vh", opacity: 0 }}
        animate={isClosing ? { y: "-100vh", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="rounded-xl border-3 border-blue-700 bg-blue-50 overflow-hidden text-center font-semibold w-9/10 relative"
      >
        <div onClick={handleClose} className="absolute h-10 w-10 top-2 right-2">
          <img src={Close} alt="" />
        </div>
        <Header text="Setting" />
        <div className="flex justify-center items-center my-5">
          <div>Tutorial</div>
          <div onClick={() => setIsPopupOpen(true)} className="h-6 w-6 ml-3">
            <img src={Tutorial} alt="" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pr-5">
          <div className="w-1/2 pb-3">
            <img src={Mascot} alt="" />
          </div>
          <div className="relative w-2/5 border_theme">
            <div className="relative h-5 w-full rounded-2xl overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#5CAFE1]"
                style={{ width: `${progressPercentage}%` }}
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-xs font-bold drop-shadow-md">
                  {wateredCount}/{totalFlowers}
                </span>
              </div>
            </div>
            <div className="absolute w-10 h-10 left-1/1 transTL top-1/2">
              <img src={giftBoxCC} alt="" />
            </div>
          </div>
          <div className="text-sm font-bold mt-5">
            {userData ? `User : ${userData.phone}` : "Loading..."}
          </div>
        </div>
        <ThemeBTN text="Log out" className="my-5 themeRed border-rose-400 strokeRed" onClick={deleteLS} />
      </motion.div>
      {isPopupOpen && <TutorialPopup onClose={() => setIsPopupOpen(false)} />}
    </motion.div>
  );
};

export default Setting;
