import { peopleCountToString } from "@/components/searchWidget/SearchWidget";
import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";
import { BookingContext } from "@/context/BookingContext";
import {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Image from "next/image";
import Button from "@/components/button/Button";

type BookingConfirmationProps = {
  onClose: () => void;
  setBookingFormStep: Dispatch<SetStateAction<number>>;
};

function BookingConfirmation({
  onClose,
  setBookingFormStep,
}: BookingConfirmationProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [bookingReferenceNumber, setBookingReferenceNumber] = useState<
    string | null
  >(null);

  const totalPrice = Math.round(
    bookingData.selectedRoom.price * bookingData.selectedPackage.price +
      bookingData.selectedAddons.reduce((a, b) => a + b.price, 0)
  );

  const convertedStartDate =
    bookingData.startDate && bookingData.startDate.toISOString();
  const convertedEndDate =
    bookingData.endDate && bookingData.endDate.toISOString();

  const startDate = bookingData.startDate?.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const endDate = bookingData.endDate?.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const formatedBookingData = {
    bookingType: "accomodation",
    hotelId: bookingData.hotel?._id,
    rooms: [bookingData.selectedRoom],
    checkInDate: convertedStartDate,
    checkOutDate: convertedEndDate,
    hotelPackageId: bookingData.selectedPackage._id,
    addons: bookingData.selectedAddons,
    peopleCount: bookingData.peopleCount,
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
    <div className={`grid lg:grid-cols-7 relative`}>
      <section
        className={`col-span-4 p-6 h-full min-h-[calc(100vh-40px)] flex gap-4 flex-col`}
      >
        <div className="flex gap-3 items-center">
          <svg
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2_20691)">
              <circle cx="15.5346" cy="16.4174" r="14.4643" fill="black" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2182 19.3644L8.48605 14.6323L7.50391 15.5251L12.236 20.2573L13.2182 21.2394L22.6825 11.7751L21.7003 10.793L13.2182 19.3644Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_20691">
                <rect
                  width="30"
                  height="30"
                  fill="white"
                  transform="translate(0 0.882812)"
                />
              </clipPath>
            </defs>
          </svg>

          <Heading size={3} color="black" styles="font-light">
            Booking Completed
          </Heading>
        </div>
        {bookingReferenceNumber && (
          <p className={`mt-2 text-earth-80 text-body-small font-medium`}>
            Your booking reference number is:{" "}
            <span className="text-charcoal-100 font-semibold font-sans">
              {bookingReferenceNumber}
            </span>
          </p>
        )}

        <div className="flex gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-[16px] w-[16px]"
          >
            <path
              fill="#161616"
              d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5Zm0 16.5h-15V9h15v10.5Zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3v3Z"
            ></path>
          </svg>
          <BodyText color="black" size={2}>
            {startDate} - {endDate}
          </BodyText>
        </div>

        <div className="flex gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-[16px] w-[16px]"
          >
            <path
              fill="#161616"
              d="M12.5 3a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0-1.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM20 22.5h-1.5v-3.75A3.75 3.75 0 0 0 14.75 15h-4.5a3.75 3.75 0 0 0-3.75 3.75v3.75H5v-3.75a5.25 5.25 0 0 1 5.25-5.25h4.5A5.25 5.25 0 0 1 20 18.75v3.75Z"
            ></path>
            <path fill="#000" d="M19 21v1.5H6V21z"></path>
          </svg>
          <BodyText color="black" size={2}>
            {peopleCountToString(bookingData.peopleCount)}
          </BodyText>
        </div>

        <div className="flex gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-[16px] w-[16px]"
          >
            <g fill="currentColor">
              <path d="M12 13.5A3.75 3.75 0 1 1 12 6a3.75 3.75 0 0 1 0 7.5zm0-6a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z"></path>
              <path d="m12 22.5-6.327-7.462a26.911 26.911 0 0 1-.26-.338A8.167 8.167 0 0 1 3.75 9.75a8.25 8.25 0 1 1 16.5 0 8.163 8.163 0 0 1-1.661 4.948l-.001.002s-.225.296-.259.335zm-5.39-8.704s.174.231.214.281L12 20.181l5.183-6.113.209-.274A6.676 6.676 0 0 0 18.75 9.75a6.75 6.75 0 0 0-13.5 0 6.68 6.68 0 0 0 1.36 4.046z"></path>
            </g>
          </svg>
          <BodyText color="black" size={2}>
            {bookingData.hotel.name}
          </BodyText>
        </div>

        <Button
          onClick={() => {
            setBookingData({
              hotel: {
                _id: "",
                name: "",
                location: "",
                region: "",
                description: "",
                image: "",
                addons: [],
                packages: [],
                offers: [],
                rooms: [],
                roomsDescription: "",
                isHotel: true,
                isConferenceCenter: false,
                isBanquet: false,
              },
              peopleCount: { adults: 1, children: 0, infants: 0 },
              roomCount: 1,
              startDate: null,
              endDate: null,
              selectedRoom: {
                _id: "",
                name: "",
                size: 0,
                description: "",
                image: "",
                price: 0,
              },
              selectedPackage: {
                name: "",
                type: "",
                tags: [],
                description: "",
                price: 0,
                image: "",
                discount: 0,
                _id: "",
              },
              selectedAddons: [],
              guestInformation: {
                fullName: "",
                email: "",
                phone: "",
                address: "",
              },
              comment: "",
              paymentMethod: "",
            });
            setBookingFormStep(1);
            onClose();
          }}
          color={"sea"}
          isActive={bookingData ? true : false}
          styles={`py-1 px-5 mt-4`}
        >
          Complete booking
        </Button>
      </section>

      <section
        className={`w-full h-full bg-sea-10 col-span-3 p-6 z-80 border-l border-sea-20 hidden lg:flex lg:flex-col`}
      >
        <Heading size={3} color="black" styles="font-light mb-6">
          Overview
        </Heading>
        <div className={`flex`}>
          <BodyText size={2}>Room 1</BodyText>
        </div>
        <section className={`flex flex-row gap-2 justify-between`}>
          <Image
            height={128}
            width={128}
            src={bookingData.selectedRoom.image}
            alt={bookingData.selectedRoom.name}
            className={`rounded-md w-16 h-12`}
          />
          <div className={"max-w-[20ch] flex flex-col gap-1"}>
            <Heading
              size={6}
            >{`${bookingData.selectedRoom.name} Room`}</Heading>
            <BodyText size={1} styles="text-charcoal-80">
              {bookingData.selectedPackage.name}
            </BodyText>
          </div>
          <Heading size={6} styles="min-w-max">
            {`${(
              bookingData.selectedRoom.price * bookingData.selectedPackage.price
            ).toFixed(2)} kr.`}
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
        <section
          className={`flex flex-row justify-between border-t border-b border-sea-20 py-4`}
        >
          <Heading size={4}>Total</Heading>
          <Heading size={4}>{`${totalPrice} kr.`}</Heading>
        </section>
      </section>
    </div>
  );
}

export default BookingConfirmation;
