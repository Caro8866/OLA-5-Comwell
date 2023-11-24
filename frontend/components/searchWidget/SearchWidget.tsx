import { useState } from "react";
// import { useBookingContext } from "@/app/contexts/BookingContext";
import Heading from "../text/heading/Heading";
import InputSelect from "../formField/InputSelect";
import DualInputSelect from "../formField/DualInputSelect";
import Button from "../button/Button";
import TabGroup from "../tabGroup/TabGroup";

function SearchWidget() {
  const [bookingType, setBookingType] = useState("accomodation"); // ["accomodation", "conference", "banquet"]

  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({ adults: 1, children: 0, infants: 0 });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //   const { setBookingData } = useBookingContext();

  /* convert room object into string */
  const roomToString = (room: { adults: number; children: number; infants: number }) => {
    let totalPeople = room.adults + room.children + room.infants;
    let roomString = `1 Room, ${totalPeople} ${totalPeople > 1 ? "Persons" : "Person"}`;
    return roomString;
  };

  const handleSearch = () => {
    console.log("Search");
    // setBookingData({
    //   hotel: selectedHotel,
    //   room: selectedRoom,
    //   startDate: startDate,
    //   endDate: endDate,
    // });
  };

  return (
    <div className="bg-white p-6 max-w-[450px] rounded-lg shadow-md">
      <Heading size={3} color="black" styles="font-light">
        Check in at Comwell and discover Denmark
      </Heading>
      <TabGroup activeTab={bookingType} onTabChange={setBookingType} tabs={["accomodation", "conference", "banquet"]} />
      {bookingType === "accomodation" && (
        <form className="flex flex-col space-y-2 ">
          <InputSelect label="Hotel" onClick={() => {}} value={selectedHotel ? selectedHotel : "Choose hotel"} />
          <InputSelect label="Room" onClick={() => {}} value={roomToString(selectedRoom)} />
          <DualInputSelect label1={"Check in"} value1={startDate ? startDate : "Choose Date"} label2={"Check out"} value2={endDate ? endDate : "Choose Date"} onClick={() => {}} />
          <Button color="charcoal" isFullWidth={true} isActive={selectedHotel && selectedRoom && startDate && endDate ? true : false} onClick={handleSearch} styles="flex items-center justify-center gap-x-1 font-light">
            Search
            <svg xmlns="http://www.w3.org/2000/svg" height="20q" viewBox="0 -960 960 960" width="20q" fill="#fff">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </Button>
        </form>
      )}
    </div>
  );
}

export default SearchWidget;
