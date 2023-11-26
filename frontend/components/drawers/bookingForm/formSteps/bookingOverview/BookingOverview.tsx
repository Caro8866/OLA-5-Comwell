import InputField from "@/components/formField/InputField";
import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";
import Image from "next/image";
import { BookingContext } from "@/context/BookingContext";
import { useContext } from "react";
import Button from "@/components/button/Button";

type BookingOverviewProps = {
  onNext: () => void;
  onPrev: () => void;
};

function BookingOverview({ onNext, onPrev }: BookingOverviewProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const handlePaymentSelection = (paymentMethod: string) => {
    if ("card") {
      setBookingData({ ...bookingData, paymentMethod: "card" });
    }
    if ("mobilepay") {
      setBookingData({ ...bookingData, paymentMethod: "card" });
    }
    if ("checkin") {
      setBookingData({ ...bookingData, paymentMethod: "checkin" });
    }
  };

  const totalPrice = Math.round((bookingData.selectedRoom.price * bookingData.selectedPackage.price + bookingData.selectedAddons.reduce((a, b) => a + b.price, 0)) * 100) / 100;
  return (
    <div className={`grid lg:grid-cols-7 relative`}>
      <section className={`col-span-4 p-6 h-full min-h-[calc(100vh-40px)] flex gap-4 flex-col`}>
        {/* my booking section */}
        <Heading size={3} color="black" styles="font-light mb-4">
          My Booking
        </Heading>
        {/* hotel information */}
        <div className={`border border-sea-20 rounded-md flex flex-row gap-4 p-4`}>
          <span className={`w-[36px] h-[36px] flex rounded-full bg-sea-20 items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-[18px]">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M21 10.5V21h1.5v1.5h-21V21H3V3a1.5 1.5 0 0 1 1.5-1.5H15A1.5 1.5 0 0 1 16.5 3v6h3a1.5 1.5 0 0 1 1.5 1.5zm-12-3h1.5v3H9zM9 12h1.5v3H9zm4.5-4.5H12v3h1.5zM12 12h1.5v3H12zm-1.5 4.5H9v3h1.5zm1.5 0h1.5v3H12zM4.5 3H15v18H4.5zm12 7.5V21h3V10.5z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <div className={`flex flex-col gap-0`}>
            <Heading size={5} styles="mb-2">
              {bookingData.hotel.name}
            </Heading>
            <BodyText size={1} styles="mb-[-2px]">
              {bookingData.hotel.location}
            </BodyText>
            <BodyText size={1} styles="mb-[-2px]">
              {bookingData.hotel.region}
            </BodyText>
            <BodyText size={1} styles="mb-[-2px]">
              Denmark
            </BodyText>
          </div>
        </div>
        <div className={`border border-sea-20 rounded-md flex flex-row gap-4 p-4 relative`}>
          <span className={`w-[36px] h-[36px] flex rounded-full bg-sea-20 items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-[18px]">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M8.334.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM6.743 2.909a2.25 2.25 0 1 1 3.181 3.182 2.25 2.25 0 0 1-3.181-3.182Zm.09 5.841a3.75 3.75 0 0 0-3.75 3.75v2.75h10.501V12.5a3.75 3.75 0 0 0-3.75-3.75h-3Zm5.25 5V12.5a2.249 2.249 0 0 0-2.25-2.25h-3a2.25 2.25 0 0 0-2.25 2.25v1.25h7.5Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          {/* guest information with edit possibilit which sends users on step back */}
          <div className={`flex flex-col gap-0 `}>
            <Heading size={5} styles="mb-2">
              Guest info
            </Heading>
            <BodyText size={1} styles="mb-[-2px]">
              {bookingData.guestInformation.fullName}
            </BodyText>
            <BodyText size={1} styles="mb-[-2px]">
              {bookingData.guestInformation.email}
            </BodyText>
            <BodyText size={1} styles="mb-[-2px]">
              {bookingData.guestInformation.phone}
            </BodyText>
          </div>
          <button onClick={onPrev} className={`absolute top-2 right-4 underline text-sea-80`}>
            Edit
          </button>
        </div>
        <div className={`border border-sea-20 rounded-md flex flex-row gap-4 p-4 relative`}>
          {/* date information  */}
          <span className={`w-[36px] h-[36px] flex rounded-full bg-sea-20 items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-[18px]">
              <path fill="#161616" d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5Zm0 16.5h-15V9h15v10.5Zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3v3Z"></path>
            </svg>
          </span>
          <div>
            <Heading size={5} styles="mb-2">
              Date
            </Heading>
            <p>{`${bookingData.startDate?.toISOString()} - ${bookingData.endDate?.toISOString()}`}</p>
          </div>
        </div>
        <div>
          {/* Optional comment section  */}
          <Heading size={3} color="black" styles="font-light mb-6 mt-4">
            Add Optional Comment
          </Heading>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputField label="Write comment..." name="comment" id="comment" type="text" value={bookingData.comment} onChange={(e) => setBookingData({ ...bookingData, comment: e.target.value })} />
          </form>
          {/* textfielf for user to add a commment  */}
        </div>
        <div>
          {/* payment terms section  */}
          <Heading size={3} color="black" styles="font-light mb-6 mt-4">
            Payment terms
          </Heading>
          <ul className={`text-sm flex gap-2 flex-col text-earth-100`}>
            {/* list of payment terms details  */}
            <li>- To guarantee your booking we will ask for your credit card information</li>
            <li>- At reservation time we reserve the up to dkk. 500,- on your card</li>
            <li>- You will only be charged, if you do not show up for your booking at the hotel</li>
            <li>- You will not get charged unless otherwise stated. You will pay for your stay at the hotel</li>
          </ul>
        </div>
        <div className={`flex flex-col gap-2`}>
          {/* MISSING LOGIC, will be done after writing remaining logic for last two form steps  | Caroline 12pm 26 Nov*/}
          {/* payment method section  */}
          <Heading size={3} color="black" styles="font-light mb-6 mt-4">
            Payment method
          </Heading>
          <div onClick={() => alert("Feature not available yet")} className={`rounded-md border border-sea-20 p-4 flex gap-4 flex-row group hover:border-sea-60 align-center h-[64px] bg-sea-20 cursor-not-allowed relative`}>
            {/* pay with card  */}
            <Heading size={6} styles={`w-fit flex justify-center items-center`}>
              Pay with card
            </Heading>
            <div className={`flex flex-row gap-2 w-fit`}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" fill="none">
                  <rect width="39" height="27" x=".5" y=".5" fill="#fff" rx="5.5"></rect>
                  <path
                    fill="#172B85"
                    fill-rule="evenodd"
                    d="M12 18.43H9.577L7.76 11.448c-.086-.321-.27-.605-.539-.739A7.848 7.848 0 0 0 5 9.97v-.269h3.904c.538 0 .942.404 1.01.873l.943 5.036 2.422-5.909h2.355L12 18.43Zm4.98 0H14.69l1.885-8.729h2.288L16.98 18.43Zm4.846-6.31c.067-.47.471-.74.942-.74a4.238 4.238 0 0 1 2.222.403l.404-1.88a5.757 5.757 0 0 0-2.087-.403c-2.221 0-3.837 1.209-3.837 2.887 0 1.277 1.145 1.947 1.953 2.35.874.403 1.21.672 1.143 1.075 0 .604-.673.872-1.345.872-.808 0-1.617-.2-2.356-.537l-.404 1.88c.808.335 1.682.47 2.49.47 2.49.067 4.039-1.141 4.039-2.954 0-2.283-3.164-2.417-3.164-3.424Zm11.172 6.31-1.817-8.729H29.23c-.404 0-.809.27-.943.672l-3.365 8.057h2.356l.47-1.275h2.895l.269 1.275h2.087Zm-3.43-6.378.672 3.29h-1.884l1.212-3.29Z"
                    clip-rule="evenodd"
                  ></path>
                  <rect width="39" height="27" x=".5" y=".5" stroke="#E0E0E0" rx="5.5"></rect>
                </svg>
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" fill="none">
                  <rect width="39" height="27" x=".5" y=".5" fill="#fff" rx="5.5"></rect>
                  <path
                    fill="#ED0006"
                    fill-rule="evenodd"
                    d="M20 19.517a7.266 7.266 0 0 1-4.722 1.733C11.258 21.25 8 18.004 8 14s3.258-7.25 7.278-7.25c1.802 0 3.452.653 4.723 1.733a7.266 7.266 0 0 1 4.722-1.733c4.02 0 7.278 3.246 7.278 7.25s-3.258 7.25-7.278 7.25a7.266 7.266 0 0 1-4.722-1.733Z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill="#F9A000"
                    fill-rule="evenodd"
                    d="M20 19.517A7.223 7.223 0 0 0 22.555 14 7.223 7.223 0 0 0 20 8.483a7.266 7.266 0 0 1 4.723-1.733C28.743 6.75 32 9.996 32 14s-3.259 7.25-7.278 7.25A7.266 7.266 0 0 1 20 19.517Z"
                    clip-rule="evenodd"
                  ></path>
                  <path fill="#FF5E00" fill-rule="evenodd" d="M19.993 19.517a7.223 7.223 0 0 0 2.555-5.516 7.223 7.223 0 0 0-2.555-5.517 7.222 7.222 0 0 0-2.555 5.517c0 2.209.991 4.187 2.555 5.516Z" clip-rule="evenodd"></path>
                  <rect width="39" height="27" x=".5" y=".5" stroke="#E0E0E0" rx="5.5"></rect>
                </svg>
              </span>
            </div>
            <span className={`absolute w-8 h-8 rounded-full flex right-4 border border-sea-20 group-hover:border-sea-60`}></span>
          </div>
          <div onClick={() => alert("Feature not available yet")} className={`rounded-md border border-sea-20 p-4 flex gap-4 flex-row group hover:border-sea-60 align-center h-[64px] bg-sea-20 cursor-not-allowed relative`}>
            {/* pay with mobile pay  */}
            <Heading size={6} styles={`w-fit flex justify-center items-center`}>
              Pay with mobile pay
            </Heading>
            <div className={`flex flex-row gap-2 w-fit`}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" fill="none">
                  <rect width="39" height="27" x=".5" y=".5" fill="#fff" rx="5.5"></rect>
                  <path
                    fill="#5A78FF"
                    d="M18.448 22.5a1.45 1.45 0 0 1-1.339-.887L12.11 9.638a1.432 1.432 0 0 1 .784-1.877l5.235-2.152a1.457 1.457 0 0 1 1.108 0c.354.146.636.426.783.777l4.998 11.976a1.432 1.432 0 0 1-.783 1.876L19 22.39c-.175.072-.363.109-.552.109Zm.235-16.227a.67.67 0 0 0-.256.05l-5.235 2.152a.665.665 0 0 0-.362.867l4.999 11.975a.67.67 0 0 0 .873.36l5.235-2.154a.659.659 0 0 0 .361-.866L19.3 6.682a.67.67 0 0 0-.617-.41Z"
                  ></path>
                  <path fill="#4A61DA" d="M23.06 14.305c-1.498.616-2.748 1.466-3.567 2.49l-2.11-5.06a8.913 8.913 0 0 1 3.566-2.488c1.497-.617 3.01-.915 4.295-.741l2.111 5.058a8.97 8.97 0 0 0-4.296.741Z"></path>
                  <path fill="#5A78FF" d="M23.747 15.846c-1.621 0-3.105.311-4.255.945v-5.114a8.97 8.97 0 0 1 4.255-.945c1.62 0 3.133.298 4.253.946v5.115a8.966 8.966 0 0 0-4.253-.947Z"></path>
                  <rect width="39" height="27" x=".5" y=".5" stroke="#E0E0E0" rx="5.5"></rect>
                </svg>
              </span>
            </div>
            <span className={`absolute w-8 h-8 rounded-full flex right-4 border border-sea-20 group-hover:border-sea-60`}></span>
          </div>
          <div
            className={`rounded-md border border-sea-20 p-4 flex gap-4 flex-row group hover:border-charcoal-100 align-center h-[64px] cursor-pointer relative mb-4 ${bookingData.paymentMethod === "checkin" ? `border-charcoal-100` : ""}`}
            onClick={() => handlePaymentSelection("checkin")}
          >
            {/* add checkbox for temrs and conditions */}
            {/* the one we will do is pay at check in (doesnt exist on website but i think it makes logic sense) or card payment */}
            <Heading size={6} styles={`w-fit flex justify-center items-center`}>
              Pay at check in
            </Heading>
            <span
              className={`absolute border-box w-8 h-8 rounded-full flex items-center justify-center right-4 border ${
                bookingData.paymentMethod === "checkin" ? `border-charcoal-100 bg-charcoal-100 group-hover:border-charcoal-100` : "border-sea-20 group-hover:border-charcoal-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={`w-[18px] h-[18px] fill-white`}>
                <rect></rect>
                <path fillRule="evenodd" d="M6.668 10.6 3.134 7.067l-.733.666 3.533 3.534.734.733 7.067-7.067L13 4.2l-6.333 6.4Z" clipRule="evenodd"></path>
              </svg>
            </span>
          </div>
        </div>
      </section>
      <section className={`w-full h-full bg-sea-10 col-span-3 p-6 z-80 border-l border-sea-20 hidden lg:flex lg:flex-col`}>
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
      <section className={`col-span-7 flex flex-row justify-end p-6 border-t border-sea-20`}>
        <Button onClick={onNext} color={"sea"} isActive={bookingData.paymentMethod !== "" ? true : false}>
          Next
        </Button>
      </section>
      {/* also uses the overview section from guestinformatioon */}
    </div>
  );
}

export default BookingOverview;
