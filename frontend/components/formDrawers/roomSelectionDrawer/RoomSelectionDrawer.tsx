import BookingInfoBar from "@/components/bookingInfoBar/BookingInfoBar";
import Button from "@/components/button/Button";
import TabGroup from "@/components/tabGroup/TabGroup";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

interface RoomSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRooms: string;
  onClick: () => void;
}

function RoomSelectionDrawer({ isOpen, onClose, selectedRooms, onClick }: RoomSelectionDrawerProps) {
  const [roomBookingType, setRoomBookingType] = useState("rooms");

  return (
    <>
      <Drawer open={isOpen} onClose={onClose} direction="right" size={600}>
        {/* TODO: Styling and get props from form */}
        <BookingInfoBar checkInDate="12.03" checkOutDate="15.03" totalRooms={1} totalPersons={2} hotelLocation="Copenhagen" totalPrice={1000} />
        {/* TODO: room cards */}
        {/* TODO: button to continue */}
      </Drawer>
    </>
  );
}
export default RoomSelectionDrawer;
