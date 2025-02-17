import React from "react";

function Header({ text }) {
  return (
    <div className="text-blue-50 text-2xl py-2.5 font-extrabold w-full theme">
      <span className="text_border">{text}</span>
    </div>
  );
}

export default Header;
