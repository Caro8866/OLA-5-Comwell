import React, { useEffect, useState } from "react";
import Heading from "../text/heading/Heading";
import InputSelect from "../formField/InputSelect";
import DualInputSelect from "../formField/DualInputSelect";
import Button from "../button/Button";
import TabGroup from "../tabGroup/TabGroup";
import HotelDrawer from "../formDrawers/hotelDrawer/HotelDrawer";
import RoomDrawer from "../formDrawers/roomDrawer/RoomDrawer";
import DateDrawer from "../formDrawers/dateDrawer/DateDrawer";
import { useBookingForm } from "@/context/BookingFormContext";
import { People, bookingType, region as RegionType } from "@/utils/bookingFormState";
import "react-modern-drawer/dist/index.css";
import BookingForm from "../bookingForm/BookingForm";

const DRAWER_TYPES = {
  HOTEL: "hotel",
  ROOMS: "rooms",
  DATE: "date",
  ROOM_SELECTION: "roomSelection",
};

function useRoomPeopleInfo() {
  const [rooms, setRooms] = useState<People[]>([{ adults: 1, children: 0, toddlers: 0 }]);
  const getTotalPeople = () => {
    return rooms.reduce((total, room) => total + room.adults + room.children + room.toddlers, 0);
  };
  const roomPeopleInfo = `${rooms.length} ${rooms.length > 1 ? "Rooms" : "Room"}, ${getTotalPeople()} ${getTotalPeople() === 1 ? "Person" : "People"} `;
  return { rooms, setRooms, roomPeopleInfo };
}

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function SearchWidget() {
  const [formState, setFormState] = useBookingForm();
  const [currentBookingType, setBookingType] = useState(bookingType.accomodation);
  const [currentRegion, setSelectedRegion] = useState(RegionType.all);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [openDrawer, setOpenDrawer] = useState("");
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const { rooms, setRooms, roomPeopleInfo } = useRoomPeopleInfo();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setStartDate(now);
    setEndDate(addDays(now, 1));
  }, []);
  const closeDrawer = () => setOpenDrawer("");
  const handleRegionChange = (selectedRegion: string) => {
    if (Object.values(RegionType).includes(selectedRegion as RegionType)) {
      setSelectedRegion(selectedRegion as RegionType);
    }
  };

  useEffect(() => {
    console.log("Form state updated:", formState);
  }, [formState]);

  useEffect(() => {
    setFormattedStartDate(startDate ? startDate.toLocaleDateString() : "");
    setFormattedEndDate(endDate ? endDate.toLocaleDateString() : "");
  }, [startDate, endDate]);

  return (
    <>
      <div className="bg-white p-6 max-w-[500px] mx-auto rounded-lg shadow-md">
        <Heading size={3} color="black">
          Check in at Comwell and discover Denmark
        </Heading>
        <TabGroup activeTab={currentBookingType} onTabChange={setBookingType} tabs={Object.values(bookingType)} />
        {currentBookingType === bookingType.accomodation && (
          <>
            <InputSelect label="Hotel" value={formState.selectedHotel || "Select Hotel"} onClick={() => setOpenDrawer(DRAWER_TYPES.HOTEL)} />
            <InputSelect label="Rooms" value={roomPeopleInfo || "Select Rooms"} onClick={() => setOpenDrawer(DRAWER_TYPES.ROOMS)} />
            <DualInputSelect label1="Check In" value1={formattedStartDate} label2="Check Out" value2={formattedEndDate} onClick={() => setOpenDrawer(DRAWER_TYPES.DATE)} />{" "}
            <Button onClick={() => setIsBookingFormOpen(true)} color="charcoal" isActive={true}>
              Search
            </Button>
          </>
        )}
      </div>
      <HotelDrawer
        isOpen={openDrawer === DRAWER_TYPES.HOTEL}
        onClose={closeDrawer}
        selectedHotel={formState.selectedHotel}
        onSelectHotel={(hotel) => setFormState((current: any) => ({ ...current, selectedHotel: hotel }))}
        currentRegion={formState.selectedRegion}
        onSelectRegion={(region) => setFormState((current: any) => ({ ...current, selectedRegion: region }))}
      />
      <RoomDrawer isOpen={openDrawer === DRAWER_TYPES.ROOMS} onClose={closeDrawer} rooms={formState.rooms} setRooms={(rooms) => setFormState((current: any) => ({ ...current, rooms }))} />
      {formState.startDate && (
        <DateDrawer
          isOpen={openDrawer === DRAWER_TYPES.DATE}
          onClose={closeDrawer}
          startDate={formState.startDate}
          endDate={formState.endDate}
          onStartDateChange={(startDate) => setFormState((current: any) => ({ ...current, startDate }))}
          onEndDateChange={(endDate) => setFormState((current: any) => ({ ...current, endDate }))}
        />
      )}
      <BookingForm isOpen={isBookingFormOpen} onClose={() => setIsBookingFormOpen(false)} />
    </>
  );
}
export default SearchWidget;
