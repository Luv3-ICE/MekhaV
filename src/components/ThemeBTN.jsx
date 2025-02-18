import React from "react";

const Button = ({
  text,
  icon,
  onClick,
  className = "",
  iconClassName = "w-1/12 mr-5",
}) => {
  return (
    <button
      onClick={onClick}
      className={`my-5 w-11/12 py-2 text-2xl text-white font-bold rounded-lg bg-gradient-to-r theme border-3 border-blue-700 ${className}`}
    >
      <div className="flex items-center justify-center">
        {icon && (
          <span className={iconClassName}>
            <img className="w-full" src={icon} alt={iconAlt} />
          </span>
        )}
        <span>{text}</span>
      </div>
    </button>
  );
};

export default Button;
