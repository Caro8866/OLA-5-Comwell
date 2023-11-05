import "@/app/globals.css";
import { useState, useRef } from "react";

type Props = {
  onClick: () => void;
  label?: string;
  value: string;
};

function InputSelect({ label, value, onClick }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    setIsFocused(true);
  };

  return (
    <div
      className={`flex max-content flex-col border-2 rounded border-gray-200 px-3 py-4 relative transition hover:border-gray-400 ${
        isFocused && "border-gray-800 hover:border-gray-800"
      } `}
      onClick={() => {
        handleClick();
        onClick();
      }}
    >
      <label
        className={`font-sans text-sm absolute bottom-2/4 transition translate-y-[-10%] font-medium `}
      >
        {label}
      </label>
      <p className={"font-semibold text-lg translate-y-1/4 bg-transparent "}>
        {value}
      </p>
      <div
        className={`pointer-events-none absolute right-3 bottom-2/4 flex min-content px-2 py-2 translate-y-[50%] justify-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className="w-[16px] rotate-180"
        >
          <path
            stroke="currentColor"
            stroke-width="1.5"
            d="M16.666 12.916 10 6.666l-6.667 6.25"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default InputSelect;
