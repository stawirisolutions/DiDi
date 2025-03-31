import React from "react";
import RandomPopup from "./PopUp";
import ProductSlideshow from "./slideshow";
interface SectionCardProps {
  title: string;
  badge: string;
  image: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, badge, image }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      {/* <RandomPopup /> */}
      <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg mb-2" />
      <h2 className="font-bold text-lg text-black">
        {title} <span className="text-orange-500">({badge})</span>
      </h2>
    </div>
                

  );
};

export default SectionCard;
