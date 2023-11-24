import Button from "@/components/button/Button";
import Heading from "@/components/text/heading/Heading";
import React, { ChangeEvent } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

type DateDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  startDate: any;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
};

function DateDrawer({ isOpen, onClose, startDate, endDate, onStartDateChange, onEndDateChange }: DateDrawerProps) {
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    onStartDateChange(date);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    onEndDateChange(date);
  };

  return (
    <Drawer open={isOpen} onClose={onClose} direction="right" size={450}>
      <div className="flex flex-col gap-2">
        <Heading size={2} color="black">
          Check In
        </Heading>
        <form className="flex flex-col gap-2">
          <input type="date" value={startDate?.toISOString().split("T")[0]} onChange={handleStartDateChange} />
          <Heading size={2} color="black">
            Check Out
          </Heading>
          <input type="date" value={endDate?.toISOString().split("T")[0]} onChange={handleEndDateChange} /> {/* button to close drawer */}
          <Button onClick={onClose} color="charcoal" isFullWidth={true} isActive={true}>
            Select
          </Button>
        </form>
      </div>
    </Drawer>
  );
}

export default DateDrawer;
