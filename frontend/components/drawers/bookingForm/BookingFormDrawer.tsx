import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import { useContext, useState } from "react";
import { BookingContext } from "@/context/BookingContext";
import BookingInfoHeader from "./BookingInfoHeader";

type BookingFormDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

function BookingFormDrawer({ isOpen, onClose }: BookingFormDrawerProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [bookingFormStep, setBookingFormStep] = useState(1);

  const nextStep = () => setBookingFormStep(bookingFormStep + 1);
  const prevStep = () => setBookingFormStep(bookingFormStep - 1);

  let content;
  switch (bookingFormStep) {
    case 1:
      //   content = <RoomList onNext={nextStep} bookingData={bookingData} />;
      break;
    case 2:
      //   content = <RoomDetail onNext={nextStep} bookingData={bookingData} />;
      break;
    case 3:
      //   content = <AddOns onNext={nextStep} bookingData={bookingData} />;
      break;
    case 4:
      //   content = <GuestInformation onNext={nextStep} bookingData={bookingData} />;
      break;
    case 5:
      // content = <OrderOverview onNext={nextStep} bookingData={bookingData} />;
      break;
    case 6:
      // content = <FinalBooking onConfirm={nextStep}  bookingData={bookingData} />;
      break;
    case 7:
      // content = <BookingConfirmation bookingData={bookingData} />;
      break;
    default:
      content = null;
  }

  return (
    <Drawer open={isOpen} onClose={onClose} direction="right" size={700}>
      <div className="h-full flex flex-col">
        <BookingInfoHeader bookingData={bookingData} onClick={prevStep} />
        <div className="h-full w-full">{content}</div>
      </div>
    </Drawer>
  );
}

export default BookingFormDrawer;
