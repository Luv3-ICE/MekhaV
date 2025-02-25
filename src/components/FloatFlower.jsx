import React, { useEffect } from "react";
import thirsty from "../assets/thirsty.png";
import watered from "../assets/watered.png";

function FloatFlower({ flowers }) {
  const userFlower = JSON.parse(localStorage.getItem("userFlower")) || [];

  // อัปเดตสถานะของดอกไม้
  const updatedFlowers = flowers.map((flower) => {
    const isWatered = userFlower.some(
      (userFlower) => userFlower.flower_id === flower.id
    );
    return {
      ...flower,
      status: isWatered ? "watered" : "thirsty",
    };
  });

  useEffect(() => {
    console.log(updatedFlowers);
  }, [updatedFlowers]);

  return (
    <div className="border_theme shadow w-11/12 h-30 absolute bg-blue-50 z-50 rounded-xl border-3 transTL top-1/14 left-1/2 flex-col content-center">
      <div className="w-full flex justify-between px-3 align-center">
        {updatedFlowers.map((flower) => (
          <WaterCan key={flower.id} flower={flower} />
        ))}
      </div>
      <p className="text-sky-600">สะสมครบ 6 จุด เพื่อรับของรางวัล</p>
    </div>
  );
}

function WaterCan({ flower }) {
  return (
    <div className="w-1/8 text-center">
      <img
        className="w-full max-w-30"
        src={flower.status === "watered" ? watered : thirsty}
        alt={flower.name}
      />
      <p
        className={`${
          flower.status === "watered" ? "text-sky-600" : "stroke text-blue-50"
        } font-extrabold text-xl`}
      >
        {flower.id}
      </p>
    </div>
  );
}

export default FloatFlower;
