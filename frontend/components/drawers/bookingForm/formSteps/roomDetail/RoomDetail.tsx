import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";
import Image from "next/image";
import Heading from "@/components/text/heading/Heading";
import BodyText from "@/components/text/bodyText/BodyText";
import Label from "@/components/label/Label";
import { HotelPackage } from "@/utils/HotelPackage.types";

type RoomDetailProps = {
  onNext: () => void;
};

function RoomDetail({ onNext }: RoomDetailProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const selectPackage = (selectedPackage: HotelPackage) => {
    setBookingData({ ...bookingData, selectedPackage: selectedPackage });
    onNext();
  };

  return (
    /* flex col */
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 h-36">
        <div className="flex flex-col relative h-36 w-full rounded-md overflow-hidden">
          <Image src={bookingData.selectedRoom.image} alt="package image" width="350" height="144" objectFit="cover" /> {/* css class instead */}
        </div>
        <div className="flex flex-col relative h-36 w-full rounded-md overflow-hidden">
          <Image src={bookingData.selectedRoom.image} alt="package image" width="350" height="144" objectFit="cover" />
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <div className="flex flex-col w-1/2 gap-4">
          <Heading size={2} color="black" styles="!font-light">
            {bookingData.selectedRoom.name}
          </Heading>
          <Label color="charcoal">
            {bookingData.selectedRoom.size} m<sup>2</sup>
          </Label>
        </div>
        <div className="flex flex-col w-1/2">
          <BodyText size={2} color="black" styles="font-light line-clamp-2 text-charcoal-60">
            {bookingData.selectedRoom.description}
          </BodyText>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Heading size={3} color="black" styles="!font-light">
          Packages
        </Heading>
        <div className="grid grid-cols-2 gap-4">
          {bookingData.hotel.packages.map((roomPackage) => (
            <div className="flex flex-col justify-start border border-charcoal-100 rounded-md p-4 h-28 g-4" onClick={() => selectPackage(roomPackage)}>
              <Heading size={7} color="black" styles="font-light">
                {roomPackage.name}
              </Heading>

              <BodyText size={2} color="black" styles="!font-light line-clamp-2">
                {roomPackage.description}
              </BodyText>
              <Heading size={5} color="black" styles="mb-0 mt-auto !font-light">
                {Math.round(roomPackage.price * bookingData.selectedRoom.price)} kr.
              </Heading>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
