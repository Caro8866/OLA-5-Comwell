import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";
import Heading from "@/components/text/heading/Heading";

type AddonsProps = {
  onNext: () => void;
};

function Addons({ onNext }: AddonsProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const handleAddonChange = (addon: { name: string; price: number; description?: string; image?: string }, isChecked: boolean) => {
    if (isChecked) {
      setBookingData({ ...bookingData, selectedAddons: [...bookingData.selectedAddons, addon] });
    } else {
      setBookingData({ ...bookingData, selectedAddons: bookingData.selectedAddons.filter((a) => a.name !== addon.name) });
    }
  };

  return (
    <div>
      <Heading size={3} color="black" styles="font-light">
        Select Addons
      </Heading>
      {bookingData.hotel.addons.map((addon: { name: string; price: number; description?: string; image?: string }) => (
        <div>
          <input type="checkbox" onChange={(e) => handleAddonChange(addon, e.target.checked)} />
          <p>{addon.name}</p>
          <p>{addon.price}</p>
          <p>{addon.description}</p>
        </div>
      ))}

      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default Addons;
