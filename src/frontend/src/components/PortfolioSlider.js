import React from "react";
import Slider from "react-slick";
import "./PortfolioSlider.css";

const images = [
  "/logo192.png",
  "/logo512.png",
];

const PortfolioSlider = () => {
    
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Make slider infinite
    speed: 500, // Transition speed
    slidesToShow: 1, // Only show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Auto-scroll
    autoplaySpeed: 3000, // Change image every 3 seconds
    pauseOnHover: true, // Pause slider on hover
  };

  return (
    <div className="portfolio-slider-container">
      <Slider {...settings} className="portfolio-slider">
        {images.map((image, index) => (
          <div key={index} className="portfolio-slide">
            <img src={image} alt={`Portfolio Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PortfolioSlider;
