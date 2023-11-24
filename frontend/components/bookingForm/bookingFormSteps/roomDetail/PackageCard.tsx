import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";

type PackageCardProps = {
  name: string;
  price: number;
  description: string;
  onSelect: (name: string) => void;
};

function PackageCard({ name, price, onSelect, description }: PackageCardProps) {
  return (
    <button type="button" className="group flex flex-col overflow-hidden text-left border border-charcoal-20 rounded-lg p-4 hover:border-charcoal-100" onClick={() => onSelect(name)}>
      <div className="flex justify-between mb-2">
        <Heading size={5} color="black" styles="font-regular">
          {name}
        </Heading>
      </div>
      <BodyText size={2} color="black" styles="mb-4">
        {description}
      </BodyText>

      <a href="#" className="text-heading-mini-desktop sm:text-heading-mini-mobile underline">
        Read more about this package
      </a>
      <BodyText size={1} color="black" styles="mt-4">
        {price} kr.
      </BodyText>
    </button>
  );
}

export default PackageCard;
