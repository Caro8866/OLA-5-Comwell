import { useEffect, useState } from "react";
import TabGroup from "@/components/tabGroup/TabGroup";
import HotelCard from "./HotelCard";
import { Hotel } from "@/utils/types";
import SelectionDrawer from "../SelectionDrawer";

type HotelInputDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (hotel: Hotel) => void;
};

function HotelInputDrawer({ isOpen, onClose, onSelect }: HotelInputDrawerProps) {
  const [region, setRegion] = useState("All");

  // fetch hotels from backend
  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    onSelect(hotel);
  };

  const handleConfirmSelect = () => {
    if (selectedHotel) {
      onSelect(selectedHotel);
      onClose();
    }
  };

  const filteredHotels = region === "All" ? hotels : hotels.filter((hotel) => hotel.region === region);

  return (
    <SelectionDrawer isOpen={isOpen} onClose={onClose} onSelect={handleConfirmSelect} title="Hotels">
      <TabGroup activeTab={region} onTabChange={setRegion} tabs={["All", "Zealand", "Funen", "Jutland"]} />
      {/* loop through hotels */}
      <ul className="flex flex-col gap-1">
        {filteredHotels.map((hotel: Hotel) => (
          <HotelCard key={hotel.name} hotel={hotel} isSelected={hotel === selectedHotel} onSelect={handleHotelSelect} />
        ))}
      </ul>
    </SelectionDrawer>
  );
}

export default HotelInputDrawer;
