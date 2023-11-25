import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";
import { HotelRoom } from "@/utils/HotelRoom.types";

type RoomCardProps = {
  room: HotelRoom;
  onSelect: () => void;
};

function RoomCard({ room, onSelect }: RoomCardProps) {
  return (
    <div onClick={onSelect} className="rounded-lg border border-charcoal-20 hover:border-charcoal-40 flex flex-col md:flex-row md:items-stretch cursor-pointer overflow-hidden">
      <div className="relative h-[200px] w-full lg:h-[242px]">
        <img alt={room.name} className="block h-full w-full object-cover" src={room.image} />
        <div className="absolute top-2 left-2 rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold">
          {room.size} m<sup>2</sup>
        </div>
      </div>
      <div className="relative flex w-full flex-col justify-between px-4 py-4 text-left">
        <Heading size={5} color="black" styles="fw-regular">
          {room.name}
        </Heading>
        <BodyText size={2} color={"black"} styles="mb-2 line-clamp-2">
          {room.description}
        </BodyText>
        <ul className="text-xs flex flex-row flex-wrap gap-2 mb-4">
          {/* {room.tags.map((tag, index) => (
              <li key={index} className="bg-gray-200 rounded-full px-2 py-1">
                {tag}
              </li>
            ))} */}
        </ul>
        <div className="font-semibold text-lg">{room.price} kr.</div>
      </div>
    </div>
  );
}

export default RoomCard;
