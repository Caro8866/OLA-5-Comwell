import Header from "@/components/header/Header";
import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";
import React from "react";

type RoomCardProps = {
  name: string;
  description: string;
  price: number;
  tags: string[];
  size: number;
  onSelect: () => void;
  imageUrl: string;
};

function RoomCard({ name, description, price, tags, size, onSelect, imageUrl }: RoomCardProps) {
  return (
    <button onClick={onSelect} className="rounded-lg border border-gray-200 hover:border-gray-400 overflow-hidden flex flex-col lg:flex-row lg:items-stretch my-6">
      <div className="relative h-[200px] w-full lg:h-[242px]">
        <img alt={name} className="block h-full w-full object-cover" src={imageUrl} />
        <div className="absolute top-2 left-2 rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold">
          {size} m<sup>2</sup>
        </div>
      </div>
      <div className="relative flex w-full flex-col justify-between px-4 py-4 text-left">
        <Heading size={5} color="black" styles="fw-regular">
          {name}
        </Heading>
        <BodyText size={2} color={"black"} styles="mb-2 line-clamo-2">
          {description}
        </BodyText>
        <ul className="text-xs flex flex-row flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <li key={index} className="bg-gray-200 rounded-full px-2 py-1">
              {tag}
            </li>
          ))}
        </ul>
        <div className="font-semibold text-lg">{price} kr.</div>
      </div>
    </button>
  );
}

export default RoomCard;
