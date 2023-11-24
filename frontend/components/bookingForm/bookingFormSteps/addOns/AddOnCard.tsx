import BodyText from "@/components/text/bodyText/BodyText";

type AddOnCardProps = {
  name: string;
  price: number;
  description: string;
  onSelect: (name: string) => void;
};

function AddOnCard({ name, price, onSelect, description }: AddOnCardProps) {
  return (
    <button type="button" className="group flex flex-col overflow-hidden text-left border border-charcoal-20 rounded-lg p-4 hover:border-charcoal-100" onClick={() => onSelect(name)}>
      <div className="flex justify-between mb-2">
        <BodyText size={1} color="black">
          {name}
        </BodyText>
        <BodyText size={1} color="black">
          {price} kr.
        </BodyText>
      </div>
      <BodyText size={2} color="black" styles="mb-4">
        {description}
      </BodyText>

      <a href="#" className="text-heading-mini-desktop sm:text-heading-mini-mobile underline">
        Read more
      </a>
      <div className="pointer-events-none absolute right-4 top-4 flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-gray-300 group-hover:border-black/30"></div>
    </button>
  );
}

export default AddOnCard;
