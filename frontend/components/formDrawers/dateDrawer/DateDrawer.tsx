import Heading from "@/components/text/heading/Heading";
import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

type DateDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
};

function DateDrawer({ isOpen, onClose, startDate, endDate, onStartDateChange, onEndDateChange }: DateDrawerProps) {
  return (
    <Drawer open={isOpen} onClose={onClose} direction="right" size={450}>
      <div className="flex flex-col gap-2">
        <Heading size={2} color="black">
          Check In
        </Heading>
        <Heading size={2} color="black">
          Check Out
        </Heading>
      </div>
    </Drawer>
  );
}

export default DateDrawer;
