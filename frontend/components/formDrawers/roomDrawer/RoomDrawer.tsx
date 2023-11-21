import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Heading from "@/components/text/heading/Heading";
import { BookingFormState } from "@/utils/bookingFormState";
import Counter from "@/components/counter/Counter";
import BodyText from "@/components/text/bodyText/BodyText";

type RoomDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  rooms: BookingFormState["rooms"];
  setRooms: (rooms: BookingFormState["rooms"]) => void;
};

function RoomDrawer({ isOpen, onClose, rooms, setRooms }: RoomDrawerProps) {
  const [warningMessage, setWarningMessage] = useState("");

  const handleCountChange = (roomIndex: number, type: "adults" | "children" | "toddlers", increment: boolean) => {
    const room = rooms[roomIndex];
    const totalPeople = room.adults + room.children + room.toddlers;

    if (increment && totalPeople >= 4) {
      setWarningMessage("Maximum 4 people allowed in one room");
      return;
    } else if (totalPeople <= 4) {
      setWarningMessage("");
    }

    setRooms(
      rooms.map((room, index) => {
        if (index === roomIndex) {
          const newValue = increment ? room[type] + 1 : room[type] - 1;
          return { ...room, [type]: newValue >= 0 ? newValue : 0 };
        }
        return room;
      })
    );
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0, toddlers: 0 }]);
  };

  const handleRemoveRoom = (roomIndex: number) => {
    setRooms(rooms.filter((_, index) => index !== roomIndex));
  };

  const renderCounter = (label: string, type: "adults" | "children" | "toddlers", room: any, index: number, subtitle?: string) => (
    <Counter label={label} subtitle={subtitle} value={room[type]} onIncrement={() => handleCountChange(index, type, true)} onDecrement={() => handleCountChange(index, type, false)} />
  );

  return (
    <Drawer open={isOpen} onClose={onClose} direction="right" size={450}>
      <Heading size={2} color="black">
        Guests and Rooms
      </Heading>
      {rooms.map((room, index) => (
        <div key={index} className="flex flex-col my-4">
          <div className="flex flex-col gap-2">
            <Heading size={3} color="black">
              Room {index + 1}
            </Heading>
            {renderCounter("Adults", "adults", room, index)}
            {renderCounter("Children", "children", room, index, "Age 2-12")}
            {renderCounter("Toddlers", "toddlers", room, index, "Under 2")}
          </div>
          {warningMessage && (
            <BodyText size={2} color="black">
              {warningMessage}
            </BodyText>
          )}
        </div>
      ))}
      <button onClick={handleAddRoom}>Add Room</button>
    </Drawer>
  );
}

export default RoomDrawer;
