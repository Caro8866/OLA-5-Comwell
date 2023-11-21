import React, { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { region } from "@/utils/bookingFormState";
import Heading from "@/components/text/heading/Heading";
import TabGroup from "@/components/tabGroup/TabGroup";
import HotelCard from "@/components/hotelCard/HotelCard";
import { BeatLoader } from "react-spinners";

type HotelDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedHotel: string;
  onSelectHotel: (name: string) => void;
  currentRegion: string;
  onSelectRegion: (region: string) => void;
};

type Hotel = {
  _id: string;
  name: string;
  location: string;
  region: string;
  description: string;
  isHotel: boolean;
  isConferenceCenter: boolean;
  isBanquet: boolean;
  __v: number;
};

function HotelDrawer({ isOpen, onClose, selectedHotel, onSelectHotel, currentRegion, onSelectRegion }: HotelDrawerProps) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchHotels = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://localhost:5000/hotels");
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setHotels(data);
          console.log(data);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("We were unable to fetch hotels at this time. Please try again later.");
          }
          console.error("Fetching hotels failed:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };

      fetchHotels();
    }
  }, [isOpen]);

  const filteredHotels = hotels.filter((hotel) => currentRegion === region.all || hotel.region === currentRegion);

  return (
    <Drawer open={isOpen} onClose={onClose} direction="right" size={450}>
      <Heading size={2} color="black">
        Select Hotel
      </Heading>
      <TabGroup activeTab={currentRegion} onTabChange={onSelectRegion} tabs={Object.values(region)} />
      <div className="flex flex-col my-4">
        {loading && <div>Loading hotels...</div>}
        {error && <BeatLoader loading={loading} size={15} />}
        {!loading && !error && filteredHotels.map((hotel) => <HotelCard key={hotel.name} name={hotel.name} location={hotel.location} isSelected={selectedHotel === hotel.name} onSelect={() => onSelectHotel(hotel.name)} />)}
      </div>
    </Drawer>
  );
}

export default HotelDrawer;
