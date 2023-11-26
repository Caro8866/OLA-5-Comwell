import InputField from "@/components/formField/InputField";
import Heading from "@/components/text/heading/Heading";
import { BookingContext } from "@/context/BookingContext";
import { useContext } from "react";

type GuestInformationProps = {
  onNext: () => void;
};

function GuestInformation({ onNext }: GuestInformationProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  return (
    <div>
      <Heading size={2} color="black" styles="font-light">
        Guest Information
      </Heading>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <InputField
          label="Full Name"
          name="fullName"
          id="fullName"
          type="text"
          value={bookingData.guestInformation.fullName}
          onChange={(e) => setBookingData({ ...bookingData, guestInformation: { ...bookingData.guestInformation, fullName: e.target.value } })}
        />

        <InputField label="Email" name="email" id="email" type="email" value={bookingData.guestInformation.email} onChange={(e) => setBookingData({ ...bookingData, guestInformation: { ...bookingData.guestInformation, email: e.target.value } })} />
        <InputField label="Phone" name="phone" id="phone" type="text" value={bookingData.guestInformation.phone} onChange={(e) => setBookingData({ ...bookingData, guestInformation: { ...bookingData.guestInformation, phone: e.target.value } })} />
        <InputField
          label="Address"
          name="address"
          id="address"
          type="text"
          value={bookingData.guestInformation.address}
          onChange={(e) => setBookingData({ ...bookingData, guestInformation: { ...bookingData.guestInformation, address: e.target.value } })}
        />
      </form>
      {/* overview section should be a seperate componenet as it is used on many booking form steps*/}
      <p>{bookingData.selectedRoom.name}</p>
      <p>{bookingData.selectedRoom.price}</p>
      <p>{bookingData.selectedPackage.description}</p>
      <p>{bookingData.selectedPackage.name}</p>
      <p>{bookingData.selectedAddons.map((a) => a.name)}</p>
      <p>{bookingData.selectedAddons.map((a) => a.price)}</p>

      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default GuestInformation;
