import React, { useState, useEffect } from "react";
import Name from "/AppName.png";
import TutorialIcon from "../assets/Tutorial.png";
import Tutorial from "../components/Tutorial";
import MapView from "../components/Map";
import ThemeBTN from "../components/ThemeBTN";
import { useNavigate } from "react-router-dom";
import flower1 from "../assets/flower1.png";
import FloatFlower from "../components/FloatFlower.jsx";
import { getUserProfile } from "../server/GetFlower.js";
import Cam from "../assets/camera.png"

const flowers = [
  {
    id: 1,
    name: "ดอกไม้ a",
    lat: 13.678241,
    lng: 100.4381,
    icon: flower1,
    status: "thirsty",
  },
  {
    id: 2,
    name: "ดอกไม้ b",
    lat: 13.677132,
    lng: 100.438841,
    icon: flower1,
    status: "thirsty",
  },
  {
    id: 3,
    name: "ดอกไม้ c",
    lat: 13.677476,
    lng: 100.437408,
    icon: flower1,
    status: "thirsty",
  },
  {
    id: 4,
    name: "ดอกไม้ d",
    lat: 13.67798,
    lng: 100.437091,
    icon: flower1,
    status: "thirsty",
  },
  {
    id: 5,
    name: "ดอกไม้ e",
    lat: 13.67821,
    lng: 100.438604,
    icon: flower1,
    status: "thirsty",
  },
  {
    id: 6,
    name: "ดอกไม้ f",
    lat: 13.677157,
    lng: 100.438327,
    icon: flower1,
    status: "thirsty",
  },
];

const Main = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userFlower = JSON.parse(localStorage.getItem("userFlower"));

  const fetchProfile = async (userData) => {
    try {
      if (userData && userData.access_token) {
        const profileData = await getUserProfile(userData.access_token);
        if (profileData) {
          console.log("fetching now");

          localStorage.setItem(
            "userFlower",
            JSON.stringify(profileData.data.account_flowers)
          );
          navigate("/main");
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  function goToCam() {
    navigate("/cam");
  }

  useEffect(() => {
    if (!userData) {
      navigate("/");
    } else if (!localStorage.getItem("userFlower")) {
      fetchProfile(userData);
    }
  }, [navigate, userData]);

  return (
    <div className="BG w-svw h-svh bg-[58%] bg-cover">
      <div className="flex px-3 justify-between items-center h-1/10">
        <div className="w-25">
          <img className="w-full" src={Name} alt="" />
        </div>
        <div className="transTL absolute mt-4 left-1/2 text-sm font-bold">
          {userData ? userData.phone : "Loading..."}
        </div>
        <div className="w-10" onClick={() => setIsPopupOpen(true)}>
          <img className="w-full" src={TutorialIcon} alt="" />
        </div>
      </div>
      <div className="h-9/10 text-center content-center relative">
        {userFlower && <FloatFlower flowers={flowers} />}
        <ThemeBTN
          text="Open Camera"
          className="shadow absolute top-9/10 left-1/24 z-20"
          onClick={goToCam}
          icon={Cam}
        />
        {userFlower && <MapView flowers={flowers} />}
      </div>
      {isPopupOpen && <Tutorial onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Main;
