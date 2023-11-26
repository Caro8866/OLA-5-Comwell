import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";
import Image from "next/image";
import Heading from "@/components/text/heading/Heading";
import BodyText from "@/components/text/bodyText/BodyText";
import Label from "@/components/label/Label";

type RoomDetailProps = {
  onNext: () => void;
};

function RoomDetail({ onNext }: RoomDetailProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const selectPackage = () => {
    bookingData.hotel &&
      setBookingData({
        ...bookingData,
        selectedPackage: bookingData.hotel.packages[0],
      });
    onNext();
  };

  return (
    /* flex col */
    <div className="flex flex-col gap-4 pr-4">
      <div className="flex flex-row gap-4 h-36">
        <div className="flex flex-col relative h-36 w-full rounded-md overflow-hidden justify-center">
          <Image
            src={bookingData.selectedRoom.image}
            alt="package image"
            width="400"
            height="144"
            className={`object-cover object-center w-full`}
          />
        </div>
        <div className="flex flex-col relative h-36 w-full rounded-md overflow-hidden justify-center">
          <Image
            src={bookingData.selectedRoom.image}
            alt="package image"
            width="400"
            height="144"
            className={`object-cover object-center w-full`}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <div className="flex flex-col w-1/2 gap-4">
          <Heading size={2} color="black" styles="!font-light">
            {bookingData.selectedRoom.name}
          </Heading>
          <Label color="charcoal" styles="max-w-fit">
            {bookingData.selectedRoom.size} m<sup>2</sup>
          </Label>
        </div>
        <div className="flex flex-col w-1/2">
          <BodyText
            size={2}
            color="black"
            styles="font-light line-clamp-2 text-charcoal-60"
          >
            {bookingData.selectedRoom.description}
          </BodyText>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Heading size={3} color="black" styles="!font-light">
          Packages
        </Heading>
        <div className="grid grid-cols-2 gap-4">
          {bookingData.hotel &&
            bookingData.hotel.packages.map((roomPackage) => (
              <div
                className={`flex flex-col justify-start border border-charcoal-50 rounded-md p-4 min-h-28 g-4 relative group hover:border-charcoal-80  ${
                  bookingData.selectedPackage === roomPackage
                    ? "border-charcoal-80"
                    : ""
                }`}
                onClick={selectPackage}
              >
                <span
                  className={`w-6 h-6 rounded-full border border-charcoal-50 absolute top-1.5 right-1.5 group-hover:border-charcoal-80 flex justify-center ${
                    bookingData.selectedPackage === roomPackage
                      ? "bg-charcoal-80 border-charcoal-80"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    className={`w-3/4 hidden group-hover:flex fill-slate-50 ${
                      bookingData.selectedPackage === roomPackage
                        ? "fill-slate-50 !flex"
                        : ""
                    }`}
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </span>
                <Heading size={7} color="black" styles="font-light mb-2">
                  {roomPackage.name}
                </Heading>

                <BodyText
                  size={2}
                  color="black"
                  styles="!font-light line-clamp-2 mb-2"
                >
                  {roomPackage.description}
                </BodyText>
                <Heading
                  size={5}
                  color="black"
                  styles="mb-0 mt-auto !font-semi-bold"
                >
                  {Math.round(
                    roomPackage.price * bookingData.selectedRoom.price
                  )}{" "}
                  kr.
                </Heading>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
