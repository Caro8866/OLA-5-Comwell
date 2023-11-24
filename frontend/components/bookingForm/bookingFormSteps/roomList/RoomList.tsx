import React from "react";
import RoomCard from "./RoomCard";

type RoomListProps = {
  onNext: () => void;
  onRoomSelect: (selectedRooms: string) => void;
};

function RoomList({ onNext, onRoomSelect }: RoomListProps) {
  /* Fetch rooms from selected hotel */
  /* for now use dummy data */

  const rooms = [
    {
      name: "Standard Double Room",
      description: "Our standard double room is perfect for a couple or two friends. The room is equipped with a double bed, desk and hairdryer.",
      price: 1000,
      tags: ["double bed", "desk", "hairdryer"],
      size: 20,
    },
    {
      name: "Deluxe Double Room",
      description: "Beautiful spacious room with a double bed, desk, hairdryer and balcony.",
      price: 2400,
      tags: ["double bed", "desk", "hairdryer", "balcony"],
      size: 40,
    },
    {
      name: "Standard Single Room",
      description: "Room perfect for one person. The room is equipped with a single bed, desk and hairdryer.",
      price: 800,
      tags: ["single bed", "desk", "hairdryer"],
      size: 10,
    },
    {
      name: "Deluxe Single Room",
      description: "Room perfect for one person. The room is equipped with a single bed, desk and hairdryer.",
      price: 800,
      tags: ["single bed", "desk", "hairdryer"],
      size: 10,
    },
  ];

  const handleRoomSelect = (selectedRooms: string) => {
    onRoomSelect(selectedRooms);
    onNext();
  };

  return (
    <div className="flex flex-col gap-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.name}
          name={room.name}
          description={room.description}
          price={room.price}
          tags={room.tags}
          size={room.size}
          imageUrl={room.imageUrl} // Add the imageUrl prop
          onSelect={() => handleRoomSelect(room)}
        />
      ))}
    </div>
  );
}

export default RoomList;
