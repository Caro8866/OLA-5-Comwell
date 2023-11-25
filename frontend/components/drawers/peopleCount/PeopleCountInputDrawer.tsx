import { useEffect, useState } from "react";
import SelectionDrawer from "../SelectionDrawer";
import { PeopleCount } from "@/utils/types";
import Counter from "./Counter";
import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";

type PeopleCountInputDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (peopleCount: PeopleCount) => void;
};

function PeopleCountInputDrawer({ isOpen, onClose, onSelect }: PeopleCountInputDrawerProps) {
  const [peopleCount, setPeopleCount] = useState({ adults: 1, children: 0, infants: 0 });

  const [error, setError] = useState("");

  const handleConfirmSelect = () => {
    onSelect(peopleCount);
    onClose();
  };

  const totalPeople = peopleCount.adults + peopleCount.children + peopleCount.infants;

  const handleIncrement = (type: "adults" | "children" | "infants") => {
    if (totalPeople > 4) {
      setError("There is a maximum of 4 people per room. Contact the hotel directly for specific requirements.");
    } else {
      setPeopleCount({ ...peopleCount, [type]: peopleCount[type] + 1 });
    }
  };

  const handleDecrement = (type: "adults" | "children" | "infants") => {
    setPeopleCount({ ...peopleCount, [type]: peopleCount[type] - 1 });
    if (totalPeople > 4) {
      setError("");
    }
  };

  useEffect(() => {
    if (totalPeople >= 4) {
      setError("There is a maximum of 4 people per room. Contact the hotel directly for specific requirements.");
    } else {
      setError("");
    }
  }, [totalPeople]);

  return (
    <>
      <SelectionDrawer isOpen={isOpen} onClose={onClose} title="Guests & Rooms" onSelect={handleConfirmSelect}>
        <div className="mt-12">
          <BodyText size={2} color="black" styles="text-charcoal-60 text-[0.6rem] py-0">
            ROOM 1
          </BodyText>
          <Counter label="Adults" value={peopleCount.adults} onIncrement={() => handleIncrement("adults")} onDecrement={() => handleDecrement("adults")} disableDecrement={peopleCount.adults <= 1} disableIncrement={totalPeople >= 4} />
          <Counter
            label="Kids"
            subtitle="3-11 years"
            value={peopleCount.children}
            onIncrement={() => handleIncrement("children")}
            onDecrement={() => handleDecrement("children")}
            disableDecrement={peopleCount.children <= 0}
            disableIncrement={totalPeople >= 4}
          />
          <Counter
            label="Infants (0-2 years)"
            subtitle="0 - 2"
            value={peopleCount.infants}
            onIncrement={() => handleIncrement("infants")}
            onDecrement={() => handleDecrement("infants")}
            disableDecrement={peopleCount.infants <= 0}
            disableIncrement={totalPeople >= 4}
          />
          <BodyText size={2} color="black" styles="text-charcoal-60 text-[0.8rem] line-clamp-2">
            {error}
          </BodyText>
        </div>
      </SelectionDrawer>
    </>
  );
}

export default PeopleCountInputDrawer;
