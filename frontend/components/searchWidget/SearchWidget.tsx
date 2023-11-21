import React, { useState } from "react";
import Heading from "../text/heading/Heading";
import InputSelect from "../formField/InputSelect";
import "react-modern-drawer/dist/index.css";
import { useBookingForm } from "@/context/BookingFormContext";
import { People, bookingType, region } from "@/utils/bookingFormState";
import hotelsData from "@/public/placeholderData/hotels.json";
import TabGroup from "../tabGroup/TabGroup";
import HotelDrawer from "../formDrawers/hotelDrawer/HotelDrawer";
import { region as RegionType } from "@/utils/bookingFormState";
import RoomDrawer from "../formDrawers/roomDrawer/RoomDrawer";
import DualInputSelect from "../formField/DualInputSelect";
import DateDrawer from "../formDrawers/dateDrawer/DateDrawer";
import Button from "../button/Button";
import RoomSelectionDrawer from "../formDrawers/roomSelectionDrawer/RoomSelectionDrawer";

function SearchWidget() {
  const [formState, setFormState] = useBookingForm();

  const [currentBookingType, setBookingType] = useState(bookingType.accomodation);
  const [currentRegion, setSelectedRegion] = useState(region.all);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [rooms, setRooms] = useState<People[]>([{ adults: 1, children: 0, toddlers: 0 }]);
  const [drawer, setDrawer] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const filteredHotels = hotelsData.filter((hotel) => currentRegion === region.all || hotel.region === currentRegion);

  const handleRegionChange = (selectedRegion: string) => {
    if (Object.values(RegionType).includes(selectedRegion as RegionType)) {
      setSelectedRegion(selectedRegion as RegionType);
    }
  };

  const getTotalPeople = () => {
    return rooms.reduce((total, room) => total + room.adults + room.children + room.toddlers, 0);
  };

  const roomPeopleInfo = `${rooms.length} ${rooms.length > 1 ? "Rooms" : "Room"}, ${getTotalPeople()}
  ${getTotalPeople() === 1 ? "Person" : "People"} `;
  return (
    <>
      <div className="bg-white p-6 max-w-[500px] mx-auto rounded-lg shadow-md">
        <Heading size={3} color="black">
          Check in at Comwell and discover Denmark
        </Heading>
        <TabGroup activeTab={currentBookingType} onTabChange={setBookingType} tabs={Object.values(bookingType)} />
        {currentBookingType === bookingType.accomodation && (
          <>
            <InputSelect label="Hotel" value={selectedHotel || "Select Hotel"} onClick={() => setDrawer("hotel")} />
            <InputSelect label="Rooms" value={roomPeopleInfo || "Select Rooms"} onClick={() => setDrawer("rooms")} />
            <DualInputSelect
              label1="Check In"
              value1={formState.startDate ? formState.startDate.toLocaleDateString("en-UK", { day: "numeric", month: "short" }) : ""}
              label2="Check Out"
              value2={formState.endDate ? formState.endDate.toLocaleDateString("en-UK", { day: "numeric", month: "short" }) : ""}
              onClick={() => setDrawer("date")}
            />
            <Button onClick={() => setDrawer("roomSelection")} color="charcoal" isActive={true}>
              Search
            </Button>
          </>
        )}
      </div>
      <HotelDrawer isOpen={drawer === "hotel"} onClose={() => setDrawer("")} selectedHotel={selectedHotel} onSelectHotel={setSelectedHotel} currentRegion={currentRegion} onSelectRegion={handleRegionChange} />
      <RoomDrawer isOpen={drawer === "rooms"} onClose={() => setDrawer("")} rooms={rooms} setRooms={setRooms} />
      <DateDrawer isOpen={drawer === "date"} onClose={() => setDrawer("")} startDate={formState.startDate} endDate={formState.endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} />
      <RoomSelectionDrawer isOpen={drawer === "roomSelection"} onClose={() => setDrawer("")} selectedRooms={selectedRooms} onClick={() => setDrawer("")} />
    </>
  );
}
export default SearchWidget;
