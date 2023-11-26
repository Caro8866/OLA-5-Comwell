import InputField from "@/components/formField/InputField";
import Heading from "@/components/text/heading/Heading";
import { BookingContext } from "@/context/BookingContext";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "@/context/AuthContext";

type GuestInformationProps = {
  onNext: () => void;
};

function GuestInformation({ onNext }: GuestInformationProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const totalPrice = Math.round(bookingData.selectedRoom.price * bookingData.selectedPackage.price + bookingData.selectedAddons.reduce((a, b) => a + b.price, 0));
  const { authState } = useContext(AuthContext);
  const isFormSubmitted = useRef(false);

  // first check if the user already completed the booking form ie they came back tp the GuestInformation form
  // if it's the first time on this form check if they are logged in and prefill the information
  const [fullName, setFullName] = useState(bookingData.guestInformation.fullName ? bookingData.guestInformation.fullName : authState.userData ? authState.userData.fullName : "");
  const [email, setEmail] = useState(bookingData.guestInformation.email ? bookingData.guestInformation.email : authState.userData ? authState.userData.email : "");
  const [phone, setPhone] = useState(bookingData.guestInformation.phone ? bookingData.guestInformation.phone : authState.userData ? authState.userData.phone : "");
  const [address, setAddress] = useState(bookingData.guestInformation.address ? bookingData.guestInformation.address : "");

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validators = {
    fullName: {
      fieldName: "fullName",
      validationFunction: () => fullName.split(/\s+/).length >= 2,
    },

    email: {
      fieldName: "email",
      validationFunction: () => email.includes("@") && email.includes("."),
    },

    phone: {
      fieldName: "phone",
      validationFunction: () => (phone ? Number.isInteger(Number(phone)) : false),
    },

    address: {
      fieldName: "address",
      validationFunction: () => address.trim() !== "",
    },
  };

  useEffect(() => {
    if (validationErrors.length === 0 && isFormSubmitted.current) {
      setBookingData({ ...bookingData, guestInformation: { ...bookingData.guestInformation, fullName, email, phone, address } });
      onNext();
    } else {
      isFormSubmitted.current = false;
    }
  }, [validationErrors]);

  return (
    <div>
      <Heading size={2} color="black" styles="font-light">
        Guest Information
      </Heading>
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <InputField
          label="Full Name"
          name="fullName"
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          errorMessage="You need to fill in your full name"
          validationCondition={() => validators.fullName.validationFunction()}
          validationOnSend={!validationErrors.includes("fullName")}
          setValidationErrors={setValidationErrors}
        />

        <InputField
          label="Email"
          name="email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage="Invalid email. Please verify your details"
          validationCondition={() => validators.email.validationFunction()}
          validationOnSend={!validationErrors.includes("email")}
          setValidationErrors={setValidationErrors}
        />
        <InputField
          label="Phone"
          name="phone"
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          errorMessage="Invalid phone number. Please verify your details"
          validationCondition={() => validators.phone.validationFunction()}
          validationOnSend={!validationErrors.includes("phone")}
          setValidationErrors={setValidationErrors}
        />
        <InputField
          label="Address"
          name="address"
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          errorMessage="Please enter an address"
          validationCondition={() => validators.address.validationFunction()}
          validationOnSend={!validationErrors.includes("address")}
          setValidationErrors={setValidationErrors}
        />
      </form>
      {/* overview section should be a seperate componenet as it is used on many booking form steps*/}
      <p>{bookingData.selectedRoom.name}</p>
      <p>{bookingData.selectedRoom.price}</p>
      <p>{bookingData.selectedPackage.description}</p>
      <p>{bookingData.selectedPackage.name}</p>
      <p>{bookingData.selectedAddons.map((a) => a.name)}</p>
      <p>{bookingData.selectedAddons.map((a) => a.price)}</p>
      <p>{totalPrice}</p> {/* with room price * package price + addons price */}
      <button
        onClick={() => {
          console.log(validationErrors);
          isFormSubmitted.current = true;
          Object.entries(validators).forEach(([key, value]) => {
            if (!value.validationFunction()) {
              setValidationErrors((prev) => Array.from(new Set([...prev, value.fieldName])));
            } else {
              setValidationErrors((prev) => prev.filter((e) => e !== value.fieldName));
            }
          });
        }}
      >
        Next
      </button>
    </div>
  );
}

export default GuestInformation;
