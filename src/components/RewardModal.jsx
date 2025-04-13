import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import thirsty from "../assets/thirsty.png";
import watered from "../assets/watered.png";
import ThemeBTN from "./ThemeBTN";
import { claimReward } from "../server/Redeem.js";

export const RewardModal = ({ onClose, updatedFlowers }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [phase, setPhase] = useState(1);
  const [staffCode, setStaffCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noCode, setNoCode] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (userData.is_claim === 1 && phase < 2) {
      setPhase(2);
    }
  });

  const handleBTN = async () => {
    if (phase === 1) {
      if (!staffCode.trim()) {
        setNoCode(true);
        return;
      }
      setIsLoading(true);
      const result = await claimReward(staffCode, userData.access_token);
      setIsLoading(false);
      if (result.success) {
        setPhase(2);
        userData.is_claim = 1;
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        alert(`Error: ${result.message}`);
      }
    }
  };
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        exit={{ y: "-100vh", opacity: 0 }}
        animate={isClosing ? { y: "-100vh", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="border-blue-700 bg-blue-50 rounded-xl border-3 w-9/10 overflow-hidden text-center font-semibold flex flex-col items-center"
      >
        <Header text={phase === 1 ? "Redeem Reward" : "Redeem Success"} />
        <div className="py-6">
          {phase < 2 ? (
            <>
              <div className="text-2xl">Claim your reward here</div>
              <div className="text-sm mt-3">
                Let staff enter the code and
                <br /> claim your reward!
              </div>
            </>
          ) : (
            <>
              <img src="/AppName.png" alt="" className="w-3/4 m-auto" />
              <p className="mt-5 px-8">
                Reward claimed successfully. Thank you for participating in the
                event.
              </p>
            </>
          )}
        </div>
        {phase === 1 ? (
          <>
            {noCode && <div className="text-rose-500 pb-5">Please enter code first!</div>}
            <div className="rounded-md border_theme px-3 py-2 w-11/12 shadow">
              <input
                type="password"
                placeholder="Enter your code"
                value={staffCode}
                onChange={(e) => setStaffCode(e.target.value)}
                className="outline-none flex-1 bg-transparent placeholder-gray-400 text-gray-700 w-full text-center"
              />
            </div>
          </>
        ) : (
          <></>
        )}
        {phase < 2 && (
          <ThemeBTN
            text={isLoading ? "Processing..." : "Confirm"}
            onClick={handleBTN}
            className="shadow mt-8 mb-4 strokeBlue"
          />
        )}
        <ThemeBTN
          text="Close"
          onClick={handleClose}
          className="shadow mb-6 strokeBlue"
        />
      </motion.div>
    </motion.div>
  );
};

export const WaterCan = ({ flower }) => {
  return (
    <div className="w-1/8 text-center max-w-15">
      <img
        className="w-full max-w-30"
        src={flower.status === "watered" ? watered : thirsty}
        alt={flower.name}
      />
      <p
        className={`${
          flower.status === "watered" ? "text-sky-600" : "stroke text-blue-50"
        } font-extrabold `}
      >
        {flower.id}
      </p>
    </div>
  );
};
