import { useEffect, useState } from "react";
import TabGroup from "@/components/tabGroup/TabGroup";
import HotelCard from "./HotelCard";
import { Hotel } from "@/utils/types";
import SelectionDrawer from "../SelectionDrawer";
import { BeatLoader } from "react-spinners";

type HotelInputDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (hotel: Hotel) => void;
};

function HotelInputDrawer({ isOpen, onClose, onSelect }: HotelInputDrawerProps) {
  const [region, setRegion] = useState("All");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchHotels = async () => {
        setLoading(true);

        try {
          const response = await fetch("http://localhost:5000/hotels");
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          const data = await response.json();
          setHotels(data);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("We were unable to fetch hotels at this time. Please try again later.");
          }
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      fetchHotels();
    }
  }, [isOpen]);

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
        {loading && <BeatLoader loading={loading} size={15} className="flex justify-center items-center mt-80" />}
        {error && <p>{error}</p>}
        {!loading && !error && filteredHotels.map((hotel: Hotel) => <HotelCard key={hotel.name} hotel={hotel} isSelected={hotel === selectedHotel} onSelect={handleHotelSelect} />)}
      </ul>
    </SelectionDrawer>
  );
}

export default HotelInputDrawer;
