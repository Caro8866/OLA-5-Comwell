import { useContext, useState } from "react";
import { BookingContext } from "@/context/BookingContext";
import Heading from "../text/heading/Heading";
import InputSelect from "../formField/InputSelect";
import DualInputSelect from "../formField/DualInputSelect";
import Button from "../button/Button";
import TabGroup from "../tabGroup/TabGroup";
import { PeopleCount } from "@/utils/PeopleCount.types";
import HotelInputDrawer from "@/components/drawers/hotel/HotelInputDrawer";
import PeopleCountInputDrawer from "../drawers/peopleCount/PeopleCountInputDrawer";
import DateInputDrawer from "../drawers/date/DateInputDrawer";
import InputField from "../formField/InputField";
import BookingFormDrawer from "../drawers/bookingForm/BookingFormDrawer";
import { Hotel } from "@/utils/Hotel.types";
import { bookingType } from "@/utils/bookingFormState";

export const peopleCountToString = (peopleCount: PeopleCount) => {
  let totalPeople = peopleCount.adults + peopleCount.children + peopleCount.infants;
  let peopleCountString = `1 Room, ${totalPeople} ${totalPeople > 1 ? "Persons" : "Person"}`;
  return peopleCountString;
};

type SearchWidgetProps = {
  bookingType: string;
  setBookingType: (bookingType: string) => void;
  selectedHotel: Hotel;
  setSelectedHotel: (hotel: Hotel) => void;
  selectedPeopleCount: PeopleCount;
  setSelectedPeopleCount: (peopleCount: PeopleCount) => void;
  selectedStartDate: Date;
  setSelectedStartDate: (startDate: Date) => void;
  selectedEndDate: Date;
  setSelectedEndDate: (endDate: Date) => void;
  isHotelDrawerOpen: boolean;
  setHotelDrawerOpen: (isOpen: boolean) => void;
  isPeopleCountDrawerOpen: boolean;
  setPeopleCountDrawerOpen: (isOpen: boolean) => void;
  isDateDrawerOpen: boolean;
  isBookingFormDrawerOpen: boolean;
  setBookingFormDrawerOpen: (isOpen: boolean) => void;
  handleHotelDrawerOpen: () => void;
  handleHotelDrawerClose: () => void;
  handleHotelSelect: (hotel: Hotel) => void;
  handlePeopleCountDrawerOpen: () => void;
  handlePeopleCountDrawerClose: () => void;
  handlePeopleCountSelect: (selectedPeopleCount: PeopleCount) => void;
  handleDateDrawerOpen: () => void;
  handleDateDrawerClose: () => void;
  handleDateSelect: (startDate: Date, endDate: Date) => void;
  handleSearch: () => void;
};

function SearchWidget({
  bookingType,
  setBookingType,
  selectedHotel,
  selectedPeopleCount,
  selectedStartDate,
  selectedEndDate,
  isHotelDrawerOpen,
  isPeopleCountDrawerOpen,
  isDateDrawerOpen,
  isBookingFormDrawerOpen,
  setBookingFormDrawerOpen,
  handleHotelDrawerOpen,
  handleHotelDrawerClose,
  handleHotelSelect,
  handlePeopleCountDrawerOpen,
  handlePeopleCountDrawerClose,
  handlePeopleCountSelect,
  handleDateDrawerOpen,
  handleDateDrawerClose,
  handleDateSelect,
  handleSearch,
}: SearchWidgetProps) {
  const [isBookingCodeInputVisible, setIsBookingCodeInputVisible] = useState(false);

  return (
    <>
      <div className="bg-white p-6 max-w-[450px] rounded-lg shadow-md z-[100] relative">
        <Heading size={3} color="black" styles="font-light">
          Check in at Comwell and discover Denmark
        </Heading>
        <TabGroup activeTab={bookingType} onTabChange={setBookingType} tabs={["accomodation", "conference", "banquet"]} />
        {bookingType === "accomodation" && (
          <form className="flex flex-col space-y-2 " onSubmit={(e) => e.preventDefault()}>
            <InputSelect label="Hotel" onClick={handleHotelDrawerOpen} value={selectedHotel ? selectedHotel.name : "Choose hotel"} />
            <InputSelect label="Room" onClick={handlePeopleCountDrawerOpen} value={peopleCountToString(selectedPeopleCount)} />
            <DualInputSelect
              label1={"Check in"}
              value1={selectedStartDate ? selectedStartDate.toLocaleDateString() : "Choose Date"}
              label2={"Check out"}
              value2={selectedEndDate ? selectedEndDate.toLocaleDateString() : "Choose Date"}
              onClick={handleDateDrawerOpen}
            />
            {!isBookingCodeInputVisible && (
              <Button color="blank" isFullWidth={false} isActive={true} styles="flex items-center justify-center gap-x-1 font-light text-sm self-center cursor-pointer" onClick={() => setIsBookingCodeInputVisible(true)}>
                <div className="mr-2 rounded-full bg-charcoal-20 p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4">
                    <path stroke="currentColor" stroke-width="1.5" d="M12 3.5v17M3.5 12h17"></path>
                  </svg>
                </div>
                Add booking code
              </Button>
            )}
            {isBookingCodeInputVisible && <InputField name="bookingCode" id="bookingCode" label="Booking code" onChange={() => alert("Feature not available yet")} value={"Enter booking code"} />}

            <Button color="charcoal" isFullWidth={true} isActive={selectedHotel && selectedPeopleCount && selectedStartDate && selectedEndDate ? true : false} onClick={handleSearch} styles="flex items-center justify-center gap-x-1 font-light">
              Search
              <svg xmlns="http://www.w3.org/2000/svg" height="20q" viewBox="0 -960 960 960" width="20q" fill="#fff">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </Button>
          </form>
        )}
        {bookingType === "conference" && (
          <form className="flex flex-col space-y-2 " onSubmit={(e) => e.preventDefault()}>
            <InputSelect label="Amount of participants" onClick={() => alert("Feature not available yet")} value={"8"} />
            <InputSelect label="Hotel" onClick={() => alert("Feature not available yet")} value={"Choose hotel"} />
            <InputSelect label="Date" onClick={() => alert("Feature not available yet")} value={"25 Nov - 26 Nov"} />
            <DualInputSelect label1={"Start"} value1={"08:00"} label2={"End"} value2={"16:00"} onClick={() => alert("Feature not available yet")} />
            <Button color="charcoal" isFullWidth={true} isActive={false} onClick={() => alert("Feature not available yet")} styles="flex items-center justify-center gap-x-1 font-light">
              Request
              <svg xmlns="http://www.w3.org/2000/svg" height="20q" viewBox="0 -960 960 960" width="20q" fill="#fff">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </Button>
          </form>
        )}
        {bookingType === "banquet" && (
          <form className="flex flex-col space-y-2 " onSubmit={(e) => e.preventDefault()}>
            <InputSelect label="Event type" onClick={() => alert("Feature not available yet")} value={"Choose tyle"} />
            <InputSelect label="Amount of participants" onClick={() => alert("Feature not available yet")} value={"25"} />
            <InputSelect label="Hotel" onClick={() => alert("Feature not available yet")} value={"Choose hotel"} />
            <InputSelect label="Date" onClick={() => alert("Feature not available yet")} value={"25 Nov - 26 Nov"} />
            <Button color="charcoal" isFullWidth={true} isActive={false} onClick={() => alert("Feature not available yet")} styles="flex items-center justify-center gap-x-1 font-light">
              Request
              <svg xmlns="http://www.w3.org/2000/svg" height="20q" viewBox="0 -960 960 960" width="20q" fill="#fff">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default SearchWidget;
