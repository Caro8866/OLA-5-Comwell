import { useState, useEffect, useContext } from "react";
import SelectionDrawer from "../SelectionDrawer";
import BodyText from "@/components/text/bodyText/BodyText";
import { BookingContext } from "@/context/BookingContext";

type DateInputDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (startDate: Date, endDate: Date) => void;
};

function DateInputDrawer({ isOpen, onClose, onSelect }: DateInputDrawerProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const [error, setError] = useState("");

  const { bookingData, setBookingData } = useContext(BookingContext);

  const validateDates = (newStartDate: Date, newEndDate: Date) => {
    if (newStartDate > newEndDate) {
      setError("Start date cannot be after end date");
      return false;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      setSelectedStartDate((prev) => prev || today);
      setSelectedEndDate((prev) => prev || tomorrow);
    }
  }, [isOpen]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    setSelectedStartDate(newStartDate);
    if (selectedEndDate && validateDates(newStartDate, selectedEndDate)) {
      onSelect(newStartDate, selectedEndDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    setSelectedEndDate(newEndDate);
    if (selectedStartDate && validateDates(selectedStartDate, newEndDate)) {
      onSelect(selectedStartDate, newEndDate);
      setBookingData({ ...bookingData, startDate: selectedStartDate, endDate: newEndDate });
    }
  };
  const handleConfirmSelect = () => {
    if (selectedStartDate && selectedEndDate) {
      onSelect(selectedStartDate, selectedEndDate);
      setBookingData({ ...bookingData, startDate: selectedStartDate, endDate: selectedEndDate });
      onClose();
    }
  };

  return (
    <SelectionDrawer isOpen={isOpen} onClose={onClose} title="Dates" onSelect={handleConfirmSelect}>
      <div className="mt-12">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="start-date" className="text-charcoal-60 text-[0.6rem] py-0">
              Check-in
            </label>
            <input id="start-date" type="date" value={selectedStartDate ? selectedStartDate.toISOString().split("T")[0] : ""} onChange={handleStartDateChange} />{" "}
          </div>
          <div className="flex flex-col">
            <label htmlFor="end-date" className="text-charcoal-60 text-[0.6rem] py-0">
              Check-out
            </label>
            <input id="end-date" type="date" value={selectedEndDate ? selectedEndDate.toISOString().split("T")[0] : ""} onChange={handleEndDateChange} />
          </div>
          {error && (
            <BodyText size={2} color="black" styles="text-charcoal-60 text-[0.8rem] ">
              {error}
            </BodyText>
          )}
        </div>
      </div>
    </SelectionDrawer>
  );
}

export default DateInputDrawer;
