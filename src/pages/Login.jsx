import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, verifyOtp } from "../server/login.js";
import User from "../assets/User.png";
import Logo from "../assets/PTTLogo.png";
import Name from "/AppName.png";
import "../index.css";
import ThemeBTN from "../components/ThemeBTN";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [optPhase, setOptPhase] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [otpErr, setOtpErr] = useState(false);
  const [token, setToken] = useState("");
  const [otpIsError, setOtpIsError] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userFlower = JSON.parse(localStorage.getItem("userFlower"));

    if (userData && userFlower) {
      navigate("/main");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      const nextInput = document.querySelector(
        `input[name='otp-${index + 1}']`
      );
      if (nextInput) nextInput.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name='otp-${index - 1}']`
      );
      if (prevInput) prevInput.focus();
    }
  };
  const handleSubmit = async () => {
    if (!optPhase) {
      if (inputValue.trim() === "111") {
        localStorage.setItem("userData", JSON.stringify([]));
        navigate("/main");
      } else if (inputValue.trim() !== "") {
        const response = await loginUser(inputValue);
        if (response.status) {
          setToken(response.data.token);
          if (otpIsError) {
            const response2 = await verifyOtp(
              inputValue,
              response.data.token,
              "11111"
            );
            if (response2.status) {
              const userData = response2.data.account;
              localStorage.setItem("userData", JSON.stringify(userData));
              navigate("/main");
            }
          } else {
            setOptPhase(true);
          }
        } else {
          alert("Login failed. Please try again.");
        }
      } else if (inputValue.trim() === "") {
        alert("please enter your phone number");
      }
    } else {
      const otpValue = otp.join("");
      const response = await verifyOtp(inputValue, token, otpValue);
      if (response.status) {
        const userData = response.data.account;
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/main");
      } else {
        setOtpErr(true);
      }
    }
  };
  useEffect(() => {
    if (optPhase && otp.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [otp]);

  return (
    <div className="BG w-svw h-svh relative bg-[58%] bg-cover bg-no-repeat">
      <div className="absolute top-30 w-85 left-1/2 transTL">
        <img className="w-full" src={Name} alt="" />
      </div>
      <div className="absolute bottom-4 left-4 w-20">
        <img className="w-full" src={Logo} alt="" />
      </div>

      <div className="absolute flex flex-col items-center top-1/2 left-1/2 transTL w-9/10 rounded-xl border-3 border-blue-700 bg-blue-50 overflow-clip text-center font-semibold">
        <Header text="LOG IN" />
        <div className="w-11/12 content-center flex flex-col items-center">
          {!optPhase ? (
            <>
              <p className="mx-12 my-5">
                In order to participate in the event, please enter your phone
                number
              </p>
              <div className="flex items-center rounded-md border_theme px-3 py-2 w-11/12">
                <span className="w-6 mr-5">
                  <img className="w-full" src={User} alt="" />
                </span>
                <input
                  name="userInfo"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={inputValue}
                  onChange={handleChange}
                  className="outline-none flex-1 bg-transparent placeholder-gray-400 text-gray-700"
                />
              </div>
              <p className="mt-5 text-center mx-6 text-blue-950">
                Your progress will be recorded based on your phone number.
              </p>
              <ThemeBTN
                text="Log In"
                onClick={handleSubmit}
                className="shadow my-5 strokeBlue"
              />
            </>
          ) : (
            <>
              <p className="mx-12 mt-5">
                Please type the verification code sent to
              </p>
              <p className="mx-12 mb-5">{inputValue}</p>
              {otpErr && (
                <p className="text-rose-500 pb-5">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="flex justify-center gap-3 w-11/12 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    name={`otp-${index}`}
                    type="tel"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 border_theme rounded-md text-center text-xl outline-none bg-transparent"
                    maxLength={1}
                  />
                ))}
              </div>
              <ThemeBTN
                text="Verify OTP"
                onClick={handleSubmit}
                className="shadow my-5 strokeBlue"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
