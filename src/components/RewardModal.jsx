import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import thirsty from "../assets/thirsty.png";
import watered from "../assets/watered.png";
import ThemeBTN from "./ThemeBTN";
import { claimReward } from "../server/Redeem.js";

export function RewardModal({ onClose, updatedFlowers }) {
  const [isClosing, setIsClosing] = useState(false);
  const [phase, setPhase] = useState(1);
  const [staffCode, setStaffCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  useEffect(() => {
    if (userData.is_claim === 1 && phase === 1) {
      setPhase(3);
    }
  });

  const handleBTN = async () => {
    if (phase === 1) {
      setPhase(2);
    } else if (phase === 2) {
      if (!staffCode.trim()) {
        alert("Please enter the staff code.");
        return;
      }
      setIsLoading(true);
      const result = await claimReward(staffCode, userData.access_token);
      setIsLoading(false);

      if (result.success) {
        alert("Reward claimed successfully!");
        setPhase(3);
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
    <motion.div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50" onClick={handleClose}>
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        exit={{ y: "-100vh", opacity: 0 }}
        animate={isClosing ? { y: "-100vh", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="border-blue-700 bg-blue-50 rounded-xl border-3 w-9/10 overflow-hidden text-center font-semibold flex flex-col items-center"
      >
        <Header text={phase === 1 ? "Reward" : "Redeem Reward"} />
        <div className="py-3 ">
          {phase < 3 ? (
            "Contact staff to redeem your reward."
          ) : (
            <>
              <img src="/AppName.png" alt="" className="w-3/4 m-auto" />
              <p className="mt-5">
                Reward claimed successfully. Thank you for participating in the
                event.
              </p>
            </>
          )}
        </div>
        {updatedFlowers && phase === 1 ? (
          <div className="w-11/12 flex justify-between p-3 align-center border_theme">
            {updatedFlowers.map((flower) => (
              <WaterCan key={flower.id} flower={flower} />
            ))}
          </div>
        ) : (
          phase === 2 && (
            <div className="rounded-md border_theme px-3 py-2 w-11/12">
              <input
                type="password"
                placeholder="Enter your code"
                value={staffCode}
                onChange={(e) => setStaffCode(e.target.value)}
                className="outline-none flex-1 bg-transparent placeholder-gray-400 text-gray-700 w-full text-center"
              />
            </div>
          )
        )}
        {phase <= 2 && (
          <ThemeBTN
            text={
              isLoading
                ? "Processing..."
                : phase === 1
                ? "Redeem Reward"
                : "Confirm"
            }
            onClick={handleBTN}
            className="shadow mt-4"
          />
        )}
        <ThemeBTN
          text={phase === 3 ? "OK" : "CLOSE"}
          onClick={handleClose}
          className="shadow my-4"
        />
      </motion.div>
    </motion.div>
  );
}

export function WaterCan({ flower }) {
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
}
