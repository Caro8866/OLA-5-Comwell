import React from "react";

type BookingInfoBarProps = {
  checkInDate: string;
  checkOutDate: string;
  totalRooms: number;
  totalPersons: number;
  hotelLocation: string;
  totalPrice: number;
};

const BookingInfoBar: React.FC<BookingInfoBarProps> = ({ checkInDate, checkOutDate, totalRooms, totalPersons, hotelLocation, totalPrice }) => {
  return (
    <div className=" flex items-center h-[68px] text-xs bg-white">
      <span className="border-r border-gray-300 px-4 flex items-center gap-2">
        {/* Icon for dates */}
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          {/* SVG Path */}
        </svg>
        {`${checkInDate} - ${checkOutDate}`}
      </span>
      <span className="border-r border-gray-300 px-4 flex items-center gap-2">
        {/* Icon for rooms and persons */}
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          {/* SVG Path */}
        </svg>
        {`${totalRooms} room${totalRooms > 1 ? "s" : ""}, ${totalPersons} person${totalPersons > 1 ? "s" : ""}`}
      </span>
      <span className="border-r border-gray-300 px-4 flex items-center gap-2">
        {/* Icon for location */}
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          {/* SVG Path */}
        </svg>
        {hotelLocation}
      </span>
      <div className="flex items-center pl-4">
        <span>{totalPrice} kr.</span>
      </div>
    </div>
  );
};

export default BookingInfoBar;
