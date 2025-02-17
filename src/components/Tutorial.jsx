import React, { useState } from "react";
import Header from "../components/Header";
import Carousel from "./Carousel";
import ThemeBTN from "./ThemeBTN";

const Tutorial = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="rounded-xl border-3 border-blue-700 bg-blue-50 overflow-hidden text-center font-semibold w-9/10">
        <Header text="HOW TO PLAY" />
        <Carousel />
        <ThemeBTN onClick={onClose} text="close" />
      </div>
    </div>
  );
};

export default Tutorial;
