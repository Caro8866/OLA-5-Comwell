import React from "react";

type BookingInfoBarProps = {
  checkInDate: string;
  checkOutDate: string;
  totalRooms: number;
  totalPersons: number;
  hotelLocation: string;
  totalPrice: number;
};

function BookingInfoBar({ checkInDate, checkOutDate, totalRooms, totalPersons, hotelLocation, totalPrice }: BookingInfoBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
      <div className="flex items-center">
        {/* Icon for dates */}
        <span className="mx-2">{`${checkInDate} - ${checkOutDate}`}</span>
      </div>

      <div className="flex items-center">
        {/* Icon for rooms and persons */}
        <span className="mx-2">{`${totalRooms} room${totalRooms > 1 ? "s" : ""}, ${totalPersons} person${totalPersons > 1 ? "s" : ""}`}</span>
      </div>

      <div className="flex items-center">
        {/* Icon for location */}
        <span className="mx-2">{hotelLocation}</span>
      </div>

      <div className="flex items-center">
        <span className="mx-2">{totalPrice} kr.</span>
      </div>
    </div>
  );
}

export default BookingInfoBar;
