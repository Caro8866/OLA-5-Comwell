import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { region } from "@/utils/bookingFormState";
import hotelsData from "@/public/placeholderData/hotels.json";
import Heading from "@/components/text/heading/Heading";
import TabGroup from "@/components/tabGroup/TabGroup";
import HotelCard from "@/components/hotelCard/HotelCard";

type HotelDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedHotel: string;
  onSelectHotel: (name: string) => void;
  currentRegion: string;
  onSelectRegion: (region: string) => void;
};

function HotelDrawer({ isOpen, onClose, selectedHotel, onSelectHotel, currentRegion, onSelectRegion }: HotelDrawerProps) {
  const filteredHotels = hotelsData.filter((hotel) => currentRegion === region.all || hotel.region === currentRegion);

  return (
    <Drawer open={isOpen} onClose={onClose} direction="right" size={450}>
      <Heading size={2} color="black">
        Select Hotel
      </Heading>
      <TabGroup activeTab={currentRegion} onTabChange={onSelectRegion} tabs={Object.values(region)} />
      <div className="flex flex-col my-4">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.name} name={hotel.name} location={hotel.location} isSelected={selectedHotel === hotel.name} onSelect={() => onSelectHotel(hotel.name)} />
        ))}
      </div>
    </Drawer>
  );
}

export default HotelDrawer;
