import Button from "@/components/button/Button";
import Heading from "@/components/text/heading/Heading";
import AddOnCard from "./AddOnCard";

type AddOnsProps = {
  onNext: () => void;
  bookingData: BookingData; // Replace with the actual type
};

type AddOn = {
  name: string;
  description: string;
  price: number;
};

const addons: AddOn[] = [
  { name: "Early Check-in", description: "Check in 2 hours earlier than normal", price: 200 },
  { name: "Late Departure", description: "Check out 2 hours later than normal", price: 200 },
];

function AddOns({ onNext, bookingData }: AddOnsProps) {
  return (
    <>
      <Heading size={2} color="black">
        Select addons
      </Heading>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {addons.map((addon) => (
          <AddOnCard key={addon.name} {...addon} onSelect={() => {}} />
        ))}
      </div>
      <Button onClick={onNext} color="charcoal" isSmall={true} isActive={true}>
        Continue
      </Button>
    </>
  );
}

export default AddOns;
