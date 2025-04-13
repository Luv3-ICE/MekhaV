import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Map from "../assets/map/map.png";
import zoomIn from "../assets/map/zoomIn.png";
import zoomOut from "../assets/map/zoomOut.png";
import zoomReset from "../assets/map/zoomReset.png";

const Map2 = ({ flowers }) => {
  const containerRef = useRef(null);
  const constraintsRef = useRef(null);
  const [scale, setScale] = useState(1);

  const handleWheel = (e) => {
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prevScale) => Math.max(0.5, Math.min(3, prevScale * zoomFactor)));
  };
  const flowerScale = Math.max(1.4, Math.min(2, scale * 0.7));

  const handleReset = () => {
    setScale(1);
  };

  return (
    <div
      className="h-full w-full overflow-hidden relative"
      onWheel={handleWheel}
    >
      <div className="absolute bottom-25 right-5 flex flex-col gap-2 z-10">
        <div
          className="w-10 h-10"
          onClick={() => setScale((prev) => Math.min(3, prev * 1.3))}
        >
          <img src={zoomIn} alt="zoomIn" />
        </div>
        <div
          className="w-10 h-10"
          onClick={() => setScale((prev) => Math.max(0.5, prev * 0.7))}
        >
          <img src={zoomOut} alt="" />
        </div>
        <div className="w-10 h-10" onClick={handleReset}>
          <img src={zoomReset} alt="" />
        </div>
      </div>
      <motion.div
        ref={constraintsRef}
        className="w-2/1 h-full absolute transTL top-1/2 left-1/2"
      >
        <motion.div
          className="forRotate absolute top-1/4 left-1/4 w-1/2"
          ref={containerRef}
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          animate={{
            scale,
          }}
          dragElastic={0.2}
          style={{ cursor: "grab" }}
        >
          <img src={Map} alt="Map" className="select-none" draggable={false} />
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${flower.x}`,
                top: `${flower.y}`,
                display: flower.feeling === "sad" ? "none" : "inline",
              }}
              animate={{ scale: flowerScale }}
              transition={{ type: "spring" }}
            >
              <img src={flower.status==="thirsty" ?flower.thirsty :flower.watered} alt="flower" className="w-8 h-8" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Map2;
