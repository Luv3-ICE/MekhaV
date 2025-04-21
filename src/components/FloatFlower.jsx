import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import gift from "../assets/gift.png";
import { RewardModal, WaterCan } from "./RewardModal";

const FloatFlower=({ flowers })=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const allWatered = userData.is_reward;

  return (
    <div className="border_theme shadow w-11/12 h-32 absolute bg-blue-50 z-30 rounded-xl border-3 top-0 left-1/24 flex-col content-center">
      <div className="w-full flex justify-between px-3 align-center">
        {flowers.map((flower) => (
          <WaterCan key={flower.id} flower={flower} />
        ))}
      </div>
      {allWatered ? (
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="text-sky-600 font-bold rounded mt-1 flex w-full justify-center items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="w-5 mr-2">
            <img src={gift} alt="" />
          </div>
          Click to redeem reward!
        </motion.div>
      ) : (
        <p className="text-sky-600">Collect all 6 locations to redeem reward</p>
      )}
      {isModalOpen && (
        <RewardModal
          onClose={() => setIsModalOpen(false)}
          updatedFlowers={flowers}
        />
      )}
    </div>
  );
}

export default FloatFlower;
