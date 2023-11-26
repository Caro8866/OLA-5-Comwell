import { BookingContext } from "@/context/BookingContext";
import { HotelRoom } from "@/utils/HotelRoom.types";
import { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import RoomCard from "./RoomCard";
import TabGroup from "@/components/tabGroup/TabGroup";
import { log } from "console";

type RoomListProps = {
  onNext: () => void;
};

function RoomList({ onNext }: RoomListProps) {
  /* room or package select */
  const [bookingType, setBookingType] = useState("rooms"); // ["room", "package"]

  const { bookingData, setBookingData } = useContext(BookingContext);

  const [rooms, setRooms] = useState<HotelRoom[]>([]);

  const [seletedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* get rooms from hotel object in booking data*/
  useEffect(() => {
    if (bookingData.hotel) {
      setRooms(bookingData.hotel.rooms);
    }
  }, [bookingData.hotel]);

  const handleRoomSelect = (seletedRoom: HotelRoom) => {
    setSelectedRoom(seletedRoom);
    setBookingData({ ...bookingData, selectedRoom: seletedRoom });
    console.log(bookingData, "bookingData with selected room");
    onNext();
  };
  useEffect(() => {
    console.log(bookingData, "bookingData with selected room");
  }, [bookingData]);

  return (
    <div className="flex flex-col gap-4 mb-8">
      <h1 className="text-2xl font-semibold">Select a room</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#161616" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <TabGroup activeTab={bookingType} onTabChange={setBookingType} tabs={["rooms", "packages"]} />
          {bookingType === "rooms" && (
            <div className="flex flex-col gap-2">
              {rooms.map((room) => (
                <RoomCard key={room.name} room={room} onSelect={() => handleRoomSelect(room)} />
              ))}
            </div>
          )}
          {/* {bookingType === "packages" && (
            <div className="flex flex-col gap-2">
              {[packages].map((packages) => (
                <PackageCard key={package.id} package={package} onSelect={() => handleRoomSelect(package)} />
              ))}
            </div>
          )} */}
        </>
      )}
    </div>
  );
}

export default RoomList;
