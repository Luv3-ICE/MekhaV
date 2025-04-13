import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { flowers } from "../data/Flowers";
import Name from "/AppName.png";
import SettingIcon from "../assets/Setting.png";
import Setting from "../components/Setting";
import Map from "../components/Map";
import ThemeBTN from "../components/ThemeBTN";
import FloatFlower from "../components/FloatFlower.jsx";
import { fetchUserProfile } from "../server/GetFlower.js";
import Cam from "../assets/camera.png";

const Main = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userFlower, setUserFlower] = useState(() => {
    return JSON.parse(localStorage.getItem("userFlower")) || null;
  });
  const [userData, setUserData] = useState(
    () => JSON.parse(localStorage.getItem("userData")) || null
  );
  const hasFetched = useRef(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const newUserData = JSON.parse(localStorage.getItem("userData"));
      const newUserFlower = JSON.parse(localStorage.getItem("userFlower"));

      setUserData(newUserData);
      setUserFlower(newUserFlower);

      if (!newUserData) {
        navigate("/");
      }
    };
    if (!userData) {
      navigate("/");
    }
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchUserProfile(userData, setUserFlower, setUserData);
    }
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const updatedFlowers = flowers.map((flower) => {
    const isWatered = userFlower?.some(
      (userF) => userF.flower_id === flower.id
    );
    return { ...flower, status: isWatered ? "watered" : "thirsty" };
  });

  const goToUnity = () => {
    navigate("/cam");
  };

  return (
    <div className="BG w-svw h-svh bg-[58%] bg-cover">
      <div className="flex px-3 justify-between h-1/10 items-center">
        <div className="w-25">
          <img className="w-full" src={Name} alt="" />
        </div>
        <div className="transTL absolute left-1/2 text-sm font-bold top-1/20 text-sky-600">
          <div className="text-center">Welcome</div>
          <div>{userData ? `User : ${userData.phone}` : "Loading..."}</div>
        </div>
        <div className="w-10" onClick={() => setIsPopupOpen(true)}>
          <img className="w-full" src={SettingIcon} alt="" />
        </div>
      </div>
      <div className="h-9/10 text-center content-center relative">
        {userFlower && <FloatFlower flowers={updatedFlowers} />}
        <ThemeBTN
          text="Scan Marker"
          className="shadow absolute bottom-1/25 left-1/24 strokeBlue"
          onClick={goToUnity}
          icon={Cam}
        />
        {updatedFlowers.length > 0 && <Map flowers={updatedFlowers} />}
      </div>
      {isPopupOpen && (
        <Setting
          onClose={() => setIsPopupOpen(false)}
          flowers={updatedFlowers}
        />
      )}
    </div>
  );
};

export default Main;
