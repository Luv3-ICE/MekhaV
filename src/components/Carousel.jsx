import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import User from "../assets/User.png";
import Logo from "../assets/PTTLogo.png";
import Name from "../assets/AppName.png";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // จำนวนรูปทั้งหมด (ปรับตามจำนวนรูป)

  const settings = {
    dots: true,
    infinite: false, // ไม่ให้เลื่อนไม่มีที่สิ้นสุด
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, // กำหนดให้เลื่อนได้ทีละอัน
    // afterChange: (index) => {
    //   setCurrentSlide(index);
    //   if (index === totalSlides - 1) {
    //     console.log("ถึงรูปสุดท้ายแล้ว! 🎉");
    //   }
    // },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Slider {...settings}>
        <div>
          <img src={User} alt="Slide 1" className="w-full h-auto" />
        </div>
        <div>
          <img src={Logo} alt="Slide 2" className="w-full h-auto" />
        </div>
        <div>
          <img src={Name} alt="Slide 3" className="w-full h-auto" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
