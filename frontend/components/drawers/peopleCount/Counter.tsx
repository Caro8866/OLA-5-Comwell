import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";

type CounterProps = {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  subtitle?: string;
  disableIncrement: boolean;
  disableDecrement: boolean;
};

function Counter({ label, value, onIncrement, onDecrement, subtitle, disableIncrement, disableDecrement }: CounterProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="mr-auto flex flex-col">
        <Heading size={6} color={"black"}>
          {label}
        </Heading>
        {subtitle && (
          <BodyText size={2} color="black">
            {subtitle}
          </BodyText>
        )}
      </div>
      <button onClick={onDecrement} className="cursor-pointer rounded-full w-8 h-8 flex items-center justify-center bg-charcoal-20 disabled:bg-charcoal-20 disabled:cursor-not-allowed disabled:opacity-50" disabled={disableDecrement}>
        -
      </button>
      <input type="number" className="w-8 h-8 rounded-full text-center align-middle border-charcoal-20 focus:border-charcoal-100 border-[1px]" value={value} readOnly />
      <button onClick={onIncrement} className="cursor-pointer rounded-full w-8 h-8 bg-charcoal-20 flex items-center justify-center disabled:bg-charcoal-20 disabled:cursor-not-allowed disabled:opacity-50" disabled={disableIncrement}>
        +
      </button>
    </div>
  );
}

export default Counter;
