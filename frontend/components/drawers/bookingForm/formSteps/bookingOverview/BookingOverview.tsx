import InputField from "@/components/formField/InputField";
import { BookingContext } from "@/context/BookingContext";
import { useContext } from "react";

type BookingOverviewProps = {
  onNext: () => void;
  onPrev: () => void;
};

function BookingOverview({ onNext, onPrev }: BookingOverviewProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const handlePaymentSelection = (isChecked: boolean) => {
    if (isChecked) {
      setBookingData({ ...bookingData, paymentMethod: "card" });
    } else {
      setBookingData({ ...bookingData, paymentMethod: "pay at check in" });
    }
  };
  return (
    <>
      {/* my booking section */}
      <h1>My Booking</h1>
      {/* hotel information */}
      <div>
        <h2>{bookingData.hotel.name}</h2>
        <p>{bookingData.hotel.location}</p>
        <p>{bookingData.hotel.region}</p>
        <p>Denmark</p>
      </div>
      <div>
        {/* guest information with edit possibilit which sends users on step back */}
        <h2>Guest info</h2>
        <p>{bookingData.guestInformation.fullName}</p>
        <p>{bookingData.guestInformation.email}</p>
        <p>{bookingData.guestInformation.phone}</p>
        <button onClick={onPrev}>Edit</button>
      </div>
      <div>
        {/* date information  */}
        <h2>Date</h2>
        <p>{bookingData.startDate?.toISOString()}</p>
        <p>{bookingData.endDate?.toISOString()}</p>
      </div>
      <div>
        {/* Optional comment section  */}
        <h1>Add Optional Comment</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputField
            label="Write comment..."
            name="comment"
            id="comment"
            type="text"
            value={bookingData.comment}
            onChange={(e) =>
              setBookingData({ ...bookingData, comment: e.target.value })
            }
          />
        </form>
        {/* textfielf for user to add a commment  */}
      </div>
      <div>
        {/* payment terms section  */}
        <h1>Payment terms</h1>
        <ul>
          {/* list of payment terms details  */}
          <li>
            To guarantee your booking we will ask for your credit card
            information
          </li>
          <li>
            At reservation time we reserve the up to dkk. 500,- on your card
          </li>
          <li>
            You will only be charged, if you do not show up for your booking at
            the hotel
          </li>
          <li>
            You will not get charged unless otherwise stated. You will pay for
            your stay at the hotel
          </li>
        </ul>
      </div>
      <div>
        {/* MISSING LOGIC, will be done after writing remaining logic for last two form steps  | Caroline 12pm 26 Nov*/}
        {/* payment method section  */}
        <h1>Payment method</h1>
        <div onClick={() => alert("Feature not available yet")}>
          {/* pay with card  */}
          <p>Pay with card</p>
          <input
            type="checkbox"
            onChange={() => alert("Feature not available yet")}
          />
        </div>
        <div onClick={() => alert("Feature not available yet")}>
          {/* pay with mobile pay  */}
          <p>Pay with moile pay</p>
          <input
            type="checkbox"
            onChange={() => alert("Feature not available yet")}
          />
        </div>
        <div onClick={() => alert("Feature not available yet")}>
          {/* the one we will do is pay at check in (doesnt exist on website but i think it makes logic sense) or card payment */}
          <p>Pay at check in</p>
          <input
            type="checkbox"
            onChange={(e) => handlePaymentSelection(e.target.checked)}
          />
        </div>
      </div>

      {/* add checkbox for temrs and conditions */}

      {/* also uses the overview section from guestinformatioon */}
    </>
  );
}

export default BookingOverview;
