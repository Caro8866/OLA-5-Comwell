import InputField from "@/components/formField/InputField";
import Heading from "@/components/text/heading/Heading";
import { BookingContext } from "@/context/BookingContext";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import BodyText from "@/components/text/bodyText/BodyText";
import Head from "next/head";
import Button from "@/components/button/Button";

type GuestInformationProps = {
  onNext: () => void;
};

function GuestInformation({ onNext }: GuestInformationProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const totalPrice = Math.round((bookingData.selectedRoom.price * bookingData.selectedPackage.price + bookingData.selectedAddons.reduce((a, b) => a + b.price, 0)) * 100) / 100;
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
      setBookingData({
        ...bookingData,
        guestInformation: {
          ...bookingData.guestInformation,
          fullName,
          email,
          phone,
          address,
        },
      });
      onNext();
    } else {
      isFormSubmitted.current = false;
    }
  }, [validationErrors]);

  console.log(bookingData);
  return (
    <div className={`grid lg:grid-cols-7 relative`}>
      <section className={`col-span-4 p-6 h-[calc(100vh-40px)]`}>
        <Heading size={3} color="black" styles="font-light mb-6">
          Guest Information
        </Heading>
        <form
          className="flex flex-col gap-4 pb-6 border-b border-sea-20"
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
      </section>
      <section className={`w-full h-[calc(100vh-40px)] bg-sea-10 col-span-3 p-6 z-80 border-l border-sea-20 hidden lg:flex lg:flex-col`}>
        <Heading size={3} color="black" styles="font-light mb-6">
          Overview
        </Heading>
        <div className={`flex`}>
          <BodyText size={2}>Room 1</BodyText>
        </div>
        <section className={`flex flex-row gap-2 justify-between`}>
          <Image height={128} width={128} src={bookingData.selectedRoom.image} alt={bookingData.selectedRoom.name} className={`rounded-md w-16 h-12`} />
          <div className={"max-w-[20ch] flex flex-col gap-1"}>
            <Heading size={6}>{`${bookingData.selectedRoom.name} Room`}</Heading>
            <BodyText size={1} styles="text-charcoal-80">
              {bookingData.selectedPackage.name}
            </BodyText>
          </div>
          <Heading size={6} styles="min-w-max">
            {`${(bookingData.selectedRoom.price * bookingData.selectedPackage.price).toFixed(2)} kr.`}
          </Heading>
        </section>
        <section className={`flex flex-row justify-between mb-6`}>
          <BodyText size={1} isBold>
            {bookingData.selectedAddons.map((a) => a.name)}
          </BodyText>
          <BodyText size={1} isBold>
            {`${bookingData.selectedAddons.map((a) => a.price)} kr.`}
          </BodyText>
        </section>
        <section className={`flex flex-row justify-between border-t border-b border-sea-20 py-4`}>
          <Heading size={4}>Total</Heading>
          <Heading size={4}>{`${totalPrice} kr.`}</Heading>
        </section>
      </section>
      <section className={`absolute w-full p-6 bottom-0 left-0 border-t border-sea-20 flex flex-row justify-end bg-white`}>
        <Button
          isActive
          color={"sea"}
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
        </Button>
      </section>
    </div>
  );
}

export default GuestInformation;
