import { peopleCountToString } from "@/components/searchWidget/SearchWidget";
import { BookingContext } from "@/context/BookingContext";
import { useContext, useEffect } from "react";

type bookingConfirmationProps = {};

function bookingConfirmation({}: bookingConfirmationProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  /* send completed booking to server and get reference number */

  useEffect(() => {
    // send bookingData to server
    // get booking reference number
    // setBookingData({...bookingData, bookingReferenceNumber: bookingReferenceNumber})
  }, []);

  return (
    <div>
      <h1>Booking Completed</h1>
      {/* booking reference number */}

      <div>
        <h2>Booking Details</h2>
        <p>
          {bookingData.startDate?.toISOString()} - {bookingData.endDate?.toISOString()}
        </p>
        <p>{peopleCountToString(bookingData.peopleCount)}</p>
        <p>{bookingData.hotel?.name}</p>
      </div>
      {/* comwell points sign up section */}

      {/* booking summary section same as on the previous ones but only has hotel room name, description, and total price*/}
    </div>
  );
}

export default bookingConfirmation;
