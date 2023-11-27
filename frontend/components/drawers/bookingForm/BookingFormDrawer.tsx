import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import { useContext, useEffect, useState } from "react";
import { BookingContext } from "@/context/BookingContext";
import BookingInfoHeader from "./BookingInfoHeader";
import RoomList from "./formSteps/roomList/RoomList";
import RoomDetail from "./formSteps/roomDetail/RoomDetail";
import Addons from "./formSteps/addons/Addons";
import GuestInformation from "./formSteps/guestInformation/GuestInformation";
import BookingOverview from "./formSteps/bookingOverview/BookingOverview";
import BookingConfirmation from "./formSteps/bookingConfirmation/BookingConfirmation";

type BookingFormDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

function BookingFormDrawer({ isOpen, onClose }: BookingFormDrawerProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const [bookingFormStep, setBookingFormStep] = useState(1);

  const nextStep = () => setBookingFormStep(bookingFormStep + 1);
  const prevStep = () => {
    if (bookingFormStep === 1) {
      onClose();
    } else {
      setBookingFormStep(bookingFormStep - 1);
    }
  };

  let content;
  switch (bookingFormStep) {
    case 1:
      content = <RoomList onNext={nextStep} />;
      break;
    case 2:
      content = <RoomDetail onNext={nextStep} />;
      break;
    case 3:
      content = <Addons onNext={nextStep} />;
      break;
    case 4:
      content = <GuestInformation onNext={nextStep} />;
      break;
    case 5:
      content = <BookingOverview onNext={nextStep} onPrev={prevStep} />;
      break;
    case 6:
      content = <BookingConfirmation onClose={onClose} setBookingFormStep={setBookingFormStep} />;
      break;
    case 7:
      break;
    default:
      content = null;
  }

  return (
    <Drawer open={isOpen} onClose={onClose} direction="right" className={`rounded-l-xl relative !w-screen lg:!w-[60vw] 2xl:!w-[55vw] overflow-hidden z-60`}>
      <div className="h-full flex flex-col">
        <BookingInfoHeader bookingData={bookingData} prevStep={prevStep} />
        <div className="h-full w-full pl-4 overflow-y-scroll">{content}</div>
      </div>
    </Drawer>
  );
}

export default BookingFormDrawer;
