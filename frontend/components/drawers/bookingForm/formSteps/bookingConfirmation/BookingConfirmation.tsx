import { peopleCountToString } from "@/components/searchWidget/SearchWidget";
import { BookingContext } from "@/context/BookingContext";
import { useContext, useEffect, useState } from "react";

type bookingConfirmationProps = {};

function bookingConfirmation({}: bookingConfirmationProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [bookingReferenceNumber, setBookingReferenceNumber] = useState<string | null>(null);

  const totalPrice = Math.round(bookingData.selectedRoom.price * bookingData.selectedPackage.price + bookingData.selectedAddons.reduce((a, b) => a + b.price, 0));

  const convertedStartDate = bookingData.startDate && bookingData.startDate.toISOString();
  const convertedEndDate = bookingData.endDate && bookingData.endDate.toISOString();

  const formatedBookingData = {
    bookingType: "accomodation",
    hotelId: bookingData.hotel?._id,
    rooms: [bookingData.selectedRoom],
    checkInDate: convertedStartDate,
    checkOutDate: convertedEndDate,
    hotelPackageId: bookingData.selectedPackage._id,
    addons: bookingData.selectedAddons,
    guest: {
      fullName: bookingData.guestInformation.fullName,
      email: bookingData.guestInformation.email,
      phone: bookingData.guestInformation.phone,
      address: bookingData.guestInformation.address,
    },
    termsAccepted: true,
    price: totalPrice,
    booker: {
      fullName: bookingData.guestInformation.fullName,
      email: bookingData.guestInformation.email,
      phone: bookingData.guestInformation.phone,
    },
    comment: bookingData.comment,
    discount: 0,
  };

  /* 
  (
    bookingType: string,
    hotelId: string,
    rooms: HotelRoom[],
    checkInDate: Date,
    checkOutDate: Date,
    hotelPackageId: string,
    addons: {
      name: string;
      price: number;
    }[],
    guest: Guest,
    termsAccepted: boolean,
    price: number,
    booker?: Booker,
    comment?: string,
    discount?: number,
  )*/

  console.log(formatedBookingData);

  useEffect(() => {
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatedBookingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setBookingReferenceNumber(data._id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <div>
        <h1>Booking Completed</h1>
        {bookingReferenceNumber && <p>Your booking reference number is: {bookingReferenceNumber}</p>}
      </div>
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
