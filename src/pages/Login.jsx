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
    <div className="BG w-svw h-svh relative bg-[url('src/assets/MainBG.png')] bg-[58%] bg-cover">
      <div className="absolute top-30 w-85 left-1/2 transTL">
        <img className="w-full" src={Name} alt="" />
      </div>
      <div className="absolute bottom-4 left-4 w-20">
        <img className="w-full" src={Logo} alt="" />
      </div>

      <div className="absolute flex flex-col items-center top-3/5 left-1/2 transTL w-9/10 rounded-xl border-3 border-blue-700 bg-blue-50 overflow-clip text-center font-semibold">
        <Header text="LOG IN" />
        <div className="w-11/12 content-center flex flex-col items-center">
          <p className="mx-12 my-5">
            In or der to participate in the event, please enter your name or
            phone number
          </p>

          <div className="flex items-center rounded-md border_theme px-3 py-2 w-11/12">
            <span className="w-6 mr-5">
              <img className="w-full " src={User} alt="" />
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
          <p className="mt-5 text-center mx-6 text-blue-950">
            Your progress will be recorded based on your name or phone number.
          </p>

          <ThemeBTN text="Join" onClick={handleSubmit} className="shadow" />
        </div>
      </div>
    </div>
  );
};

export default Login;
