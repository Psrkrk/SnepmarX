import React from "react";
import image from "../../assets/image.png"; // Import the image properly

const HeroSection = () => {
  return (
    <div className="w-full">
      {/* Responsive and styled image */}
      <img
        className="h-40 lg:h-full w-full object-cover"
        src={image}
        alt="Hero Section"
      />
    </div>
  );
};

export default HeroSection;
