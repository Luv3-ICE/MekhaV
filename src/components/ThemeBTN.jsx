import React from "react";
import { motion } from "framer-motion";

const Button = ({ text, icon, onClick, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-11/12 py-2 text-2xl text-white font-extrabold rounded-lg bg-gradient-to-r theme border-3 border-blue-700 cursor-pointer z-20 ${className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-center text-center">
        {icon && (
          <img
            className={`${!text ? "w-3/4 " : "w-1/14 mr-5"} max-w-14 `}
            src={icon}
            alt={icon}
          />
        )}
        <span className="">{text}</span>
      </div>
    </motion.button>
  );
};

export default Button;
