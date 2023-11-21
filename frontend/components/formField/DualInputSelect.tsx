import React, { useState } from "react";

type DualInputSelectProps = {
  label1: string;
  value1: string;
  label2: string;
  value2: string;
  onClick: () => void;
};

function DualInputSelect({ label1, value1, label2, value2, onClick }: DualInputSelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    setIsFocused(true);
    onClick();
  };

  return (
    <button className={`group relative min-w-[360px] flex w-full rounded-md border-[1px] ${isFocused ? "border-gray-800 hover:border-gray-800" : "border-cw-gray-300 hover:border-gray-400"} px-3 py-2`} onClick={handleClick}>
      <div className="flex flex-col text-left w-full relative">
        <span className="text-xs text-active-gray">{label1}</span>
        <span className="text-base font-semibold">{value1}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className={`absolute right-5 text-black w-4 top-0 bottom-0 my-auto ${isFocused ? "rotate-0 group-focus:rotate-0" : "rotate-180 group-focus:rotate-0 transition-transform duration-300"}`}
        >
          <path stroke="currentColor" strokeWidth="1.5" d="M16.666 12.916 10 6.666l-6.667 6.25"></path>
        </svg>
      </div>
      <div className="flex flex-col text-left w-full relative border-l-cw-gray-300 border-l-[1px] pl-3 -mr-3">
        <span className="text-xs text-active-gray">{label2}</span>
        <span className="text-base font-semibold">{value2}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className={`absolute right-5 text-black w-4 top-0 bottom-0 my-auto ${isFocused ? "rotate-0 group-focus:rotate-0" : "rotate-180 group-focus:rotate-0 transition-transform duration-300"}`}
        >
          <path stroke="currentColor" strokeWidth="1.5" d="M16.666 12.916 10 6.666l-6.667 6.25"></path>
        </svg>
      </div>
    </button>
  );
}

export default DualInputSelect;
