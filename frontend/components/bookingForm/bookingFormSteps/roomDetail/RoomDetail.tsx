import React from "react";
import Button from "@/components/button/Button";
import PackageCard from "./PackageCard";
import Heading from "@/components/text/heading/Heading";
import BodyText from "@/components/text/bodyText/BodyText";

type RoomDetailProps = {
  onNext: () => void;
  bookingData: any;
  selectedRoom: any;
};

function RoomDetail({ onNext, bookingData, selectedRoom }: RoomDetailProps) {
  const name = selectedRoom.name;
  const description = selectedRoom.description;
  const price = selectedRoom.price;
  const tags = selectedRoom.tags;
  const size = selectedRoom.size;

  return (
    <div className={"relative h-full pt-10"}>
      {/* images carousel */}
      <div className={"pt-3 overflow-hidden"}>{/* image coursel content */}</div>

      <div className={"flex flex-col md:flex-row"}>
        <div className={"md:w-1/2 flex justify-between"}>
          <Heading size={4} color="black" styles="font-regular">
            {name}
          </Heading>

          <div className="rounded-full bg-charcoal-100 text-white px-2.5 py-1.5 text-xs font-semibold ">
            {size} m<sup>2</sup>
          </div>
        </div>

        <div className={"md:w-1/2"}>
          {/* tags */}
          {tags.map((tag: string) => (
            <span className="rounded-full text-xs font-regular mr-2">{tag}</span>
          ))}
          <BodyText size={2} color="black" styles="mb-4">
            {description}
          </BodyText>
        </div>
      </div>
      <PackageCard name="Accomodation with breakfast buffet" price={1000} description="Enjoy a delicious breakfast buffet in our restaurant." onSelect={() => {}} />
      <Button onClick={onNext} color={"charcoal"} isSmall={true} isActive={true}>
        Continue
      </Button>
    </div>
  );
}

export default RoomDetail;
