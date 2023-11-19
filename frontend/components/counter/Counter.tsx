// CounterComponent.tsx
import React from "react";

type CounterProps = {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  subtitle?: string;
};

function Counter({ label, value, onIncrement, onDecrement, subtitle }: CounterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="mr-auto flex flex-col">
        <span className="text-lg font-semibold leading-none">{label}</span>
        {subtitle && <span className="text-sm">{subtitle}</span>}
      </div>
      <button onClick={onDecrement} className="opacity-50 rounded-full w-8 h-8 bg-cw-gray-200 flex items-center justify-center">
        -
      </button>
      <input type="number" className="w-8 h-8 rounded-full text-center align-middle border-cw-gray-300 focus:border-black border-[1px]" value={value} readOnly />
      <button onClick={onIncrement} className="cursor-pointer rounded-full w-8 h-8 bg-cw-gray-200 flex items-center justify-center">
        +
      </button>
    </div>
  );
}

export default Counter;
