import React, { useState } from "react";
import User from "../assets/User.png";
import Logo from "../assets/PTTLogo.png";
import Name from "../assets/AppName.png";
import "../index.css";
import ThemeBTN from "../components/ThemeBTN";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }
  function handleSubmit() {
    console.log("User Input:", inputValue);
    navigate("/Main");
  }

  return (
    <div className="BG w-screen h-screen relative bg-[url('src/assets/MainBG.png')] bg-[58%] bg-cover">
      <div className="absolute bottom-4 left-4 w-20">
        <img className="w-full" src={Logo} alt="" />
      </div>
      <div className="absolute top-35 w-85 left-1/2 transTL">
        <img className="w-full" src={Name} alt="" />
      </div>

      <div className="absolute flex flex-col items-center top-1/2 left-1/2 transTL w-9/10 rounded-xl border-3 border-blue-700 bg-blue-50 overflow-hidden text-center font-semibold">
        <Header text="LOG IN" />
        <p className="mx-15 my-5">
          In or der to participate in the event, please enter your name or phone
          number
        </p>
        <div className="flex items-center rounded-md border_theme px-3 py-2 w-full max-w-xs">
          <span className="w-1/12 mr-5">
            <img className="w-ful" src={User} alt="" />
          </span>
          <input
            name="userInfo"
            type="text"
            placeholder="Enter your Name or number"
            value={inputValue}
            onChange={handleChange}
            className="outline-none flex-1 bg-transparent placeholder-gray-400 text-gray-700"
          />
        </div>
        <p className="mt-5 text-center mx-10 text-blue-950">
          Your progress will be recorded based on your name or phone number.
        </p>
        <ThemeBTN text="Join" onClick={handleSubmit} className="shadow" />
      </div>
    </div>
  );
};

export default Login;
