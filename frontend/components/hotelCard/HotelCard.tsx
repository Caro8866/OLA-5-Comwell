import React from "react";

type HotelCardProps = {
  name: string;
  location: string;
  isSelected: boolean;
  onSelect: () => void;
};

const HotelCard: React.FC<HotelCardProps> = ({ name, location, isSelected, onSelect }) => {
  const imageUrl = "../public/img/borup.svg";
  return (
    <div className={`p-4 flex items-center justify-between ${isSelected ? "bg-gray-200" : "bg-white"} rounded-lg shadow-md m-2 cursor-pointer`} onClick={onSelect}>
      <div className="flex items-center">
        <img src={imageUrl} alt={`${name}`} className="h-16 w-16 rounded-lg mr-4" />
        <div>
          <h2 className="font-semibold">{name}</h2>
          <p>{location}</p>
        </div>
      </div>
      {isSelected && <img src="./public/img/chevron.svg" className={"h-6 w-6 "} alt="Chevron" />}
    </div>
  );
};

export default HotelCard;
