import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";
import Image from "next/image";

type RoomDetailProps = {
  onNext: () => void;
};

function RoomDetail({ onNext }: RoomDetailProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  return (
    /* what do i need to show */
    <>
      <p>{bookingData.selectedRoom.name}</p>
      <p>{bookingData.selectedRoom.description}</p>
      <p>{bookingData.selectedRoom.price}</p>
      <p>{bookingData.selectedRoom.size}</p>
      <Image src={bookingData.selectedRoom.image} alt="room image" width={500} height={500} />

      {bookingData.hotel.packages.map((roomPackage) => (
        <div>
          <p>{roomPackage.name}</p>
          <p>{roomPackage.description}</p>
          <p>{roomPackage.price * bookingData.selectedRoom.price}</p>
          <Image src={roomPackage.image} alt="package image" width={500} height={500} />
        </div>
      ))}
    </>
  );
}

export default RoomDetail;
