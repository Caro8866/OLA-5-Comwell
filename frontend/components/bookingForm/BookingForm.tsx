/* Booking Form with the different steps. gets preliminary search information from searchWidget */

import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import RoomList from "./bookingFormSteps/roomList/RoomList";
import BookingInfoBar from "../bookingInfoBar/BookingInfoBar";
import RoomDetail from "./bookingFormSteps/roomDetail/RoomDetail";
import GuestInformation from "./bookingFormSteps/guestInformation/GuestInformation";
import AddOns from "./bookingFormSteps/addOns/AddOns";

type BookingFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

function BookingForm({ isOpen, onClose }: BookingFormProps) {
  const [formStep, setFormStep] = useState(1);
  const [bookingData, setBookingData] = useState({});

  const nextStep = () => setFormStep(formStep + 1);
  const prevStep = () => setFormStep(formStep - 1);

  let content;
  switch (formStep) {
    case 1:
      content = <RoomList onNext={nextStep} onRoomSelect={(room: any) => setBookingData({ ...bookingData, selectedRoom: room })} />;
      break;
    case 2:
      content = <RoomDetail onNext={nextStep} bookingData={bookingData} selectedRoom={bookingData.selectedRoom} />;
      break;
    case 3:
      content = <AddOns onNext={nextStep} bookingData={bookingData} />;
      break;
    case 4:
      content = <GuestInformation onNext={nextStep} bookingData={bookingData} />;
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
    <Drawer open={isOpen} onClose={onClose} direction="right" size={650}>
      <BookingInfoBar
        checkInDate={bookingData.checkInDate}
        checkOutDate={bookingData.checkOutDate}
        totalRooms={bookingData.totalRooms}
        totalPersons={bookingData.totalPersons}
        hotelLocation={bookingData.hotelLocation}
        totalPrice={bookingData.totalPrice}
      />
      {content}
      {/*             {formStep >= 4 && formStep <= 7 && <Overview />} // Show Overview for steps 4-7 */}
    </Drawer>
  );
}

export default BookingForm;
