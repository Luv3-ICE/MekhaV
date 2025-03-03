import React from "react";
import { motion } from "framer-motion";

const Button = ({
  text,
  icon,
  onClick,
  className = "",
  iconClassName = "w-1/12 mr-5",
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-11/12 py-2 text-2xl text-white font-bold rounded-lg bg-gradient-to-r theme border-3 border-blue-700 cursor-pointer ${className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{scale: 1.05}}
    >
      <div className="flex items-center justify-center">
        {icon && (
          <span className={iconClassName}>
            <img className="w-full" src={icon} alt={icon} />
          </span>
        )}
        <span>{text}</span>
      </div>
    </motion.button>
  );
};

export default Button;
