import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";
import { Hotel } from "@/utils/types";
import Image from "next/image";

type HotelCardProps = {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
  isSelected: boolean;
};

function HotelCard({ hotel, onSelect, isSelected }: HotelCardProps) {
  const handleSelect = () => {
    onSelect(hotel);
  };
  return (
    <div className={`flex items-center justify-between border ${isSelected ? "border-charcoal-80" : "border-charcoal-40"} rounded-lg shadow-sm cursor-pointer`} onClick={handleSelect}>
      <div className="flex flex-1 items-center space-x-4">
        <Image src={hotel.image} alt={hotel.name} objectFit="cover" width={100} height={100} />{" "}
        <div className="flex justify-between w-full items-center pr-2">
          <div className="flex flex-col">
            <BodyText color="black" styles="font-light" size={1}>
              {hotel.name}
            </BodyText>
            <BodyText color="black" styles="font-light text-charcoal-60" size={2}>
              {hotel.region}
            </BodyText>
          </div>
          {isSelected && (
            <div className={` ml-auto mr-0 items-center justify-center rounded-full bg-charcoal-80 text-white `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 16 16" className="w-5 p-0.5">
                <path fill="currentColor" fill-rule="evenodd" d="M6.668 10.6 3.134 7.067l-.733.666 3.533 3.534.734.733 7.067-7.067L13 4.2l-6.333 6.4Z" clip-rule="evenodd"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
