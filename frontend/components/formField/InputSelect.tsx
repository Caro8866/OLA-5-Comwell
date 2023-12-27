import "@/app/globals.css";
import { useState, useRef } from "react";

type Props = {
  onClick: () => void;
  label?: string;
  value: string;
  isExpanded?: boolean;
};

function InputSelect({ label, value, onClick, isExpanded }: Props) {
  const ref = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex max-content flex-col border-2 rounded border-gray-300 px-3 py-4 relative transition hover:border-gray-400 cursor-pointer ${
        isFocused && "border-gray-800 hover:border-gray-800"
      } `}
      onClick={() => {
        onClick();
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      ref={ref}
    >
      <label
        className={`font-sans font-semibold absolute bottom-2/4 translate-y-2/4 transition ${
          isFocused || value !== ""
            ? " translate-y-[-15%] text-gray-600 font-medium"
            : "translate-y-2/4 text-charcoal-80"
        } `}
      >
        {label}
      </label>
      <p className={"text-lg translate-y-1/4 bg-transparent font-medium "}>
        {value}
      </p>
      <div
        className={`pointer-events-none absolute right-3 bottom-2/4 flex min-content px-2 py-2 translate-y-[50%] justify-center ${
          isExpanded ? "rotate-180" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className="w-[16px] rotate-180"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M16.666 12.916 10 6.666l-6.667 6.25"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default InputSelect;
