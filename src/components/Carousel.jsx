import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HTP1 from "../assets/HTP1.png";
import HTP2 from "../assets/HTP2.png";
import HTP3 from "../assets/HTP3.png";
import "./Carousel.css";

const Carousel = ({ currentSlide, setCurrentSlide }) => {
  const totalSlides = 3;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => {
      setCurrentSlide(index);
      if (index === totalSlides - 1) {
        console.log("ถึงรูปสุดท้ายแล้ว! 🎉");
      }
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto textalign-center">
      <Slider {...settings} initialSlide={currentSlide}>
        <div>
          <img src={HTP1} alt="Slide 1" className="w-11/12 m-auto mt-4" />
        </div>
        <div>
          <img src={HTP2} alt="Slide 2" className="w-11/12 m-auto mt-4" />
        </div>
        <div>
          <img src={HTP3} alt="Slide 3" className="w-11/12 m-auto mt-4" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
