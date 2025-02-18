import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Carousel from "./Carousel";
import ThemeBTN from "./ThemeBTN";
import "../index.css";

const Tutorial = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClosing, setIsClosing] = useState(false); // state สำหรับ animation ตอนปิด

  const handleClose = () => {
    setIsClosing(true); // เริ่ม animation ปิด
    setTimeout(onClose, 500); // รอ 500ms ก่อนปิดจริง
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-150">
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        exit={{ y: "-100vh", opacity: 0 }}
        animate={isClosing ? { y: "-100vh", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="rounded-xl border-3 border-blue-700 bg-blue-50 overflow-hidden text-center font-semibold w-9/10"
      >
        <Header text="HOW TO PLAY" />
        <Carousel
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
        <p className="px-8">{HTP(currentSlide)}</p>
        <ThemeBTN onClick={handleClose} text="close" />
      </motion.div>
    </div>
  );
};

const HTP = (currentSlide) => {
  switch (currentSlide) {
    case 1:
      return "แตะค้างที่ Icon บัวรดน้ำเพื่อรดน้ำต้นไม้";
    case 2:
      return "เมื่อรวบรวมจนครบทั้ง 6 แบบ สามารถนำหน้า Landing Page มาแสดงให้กับทีมงานเพื่อร่วมใช้งาน Video Booth ได้";
    default:
      return "แสกน QR ตามพื้นที่ ที่กำหนดให้ในแผนที";
  }
};

export default Tutorial;
