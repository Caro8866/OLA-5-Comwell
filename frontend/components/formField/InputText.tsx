import "@/app/globals.css";
import React from "react";
import { useState, useRef } from "react";

type Props = {
  onChange: (e: any) => void;
  placeholder?: string;
  label?: string;
  value: string;
  name: string;
  id: string;
  isPassword?: boolean;
  styles?: string;
};

function InputText({
  label,
  value,
  onChange,
  name,
  id,
  isPassword,
  styles,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const ref = useRef<any>(null);

  const handleClick = () => {
    setIsFocused(true);
    ref.current && ref.current.focus();
  };

  return (
    <div
      className={`flex max-content flex-col border-2 rounded border-gray-300 px-3 py-4 relative transition hover:border-gray-400 ${
        isFocused && "border-gray-800 hover:border-gray-800"
      }  ${styles}`}
      onClick={handleClick}
      onBlur={() => setIsFocused(false)}
    >
      <label
        htmlFor={id}
        className={`font-sans font-semibold absolute bottom-2/4 translate-y-2/4 transition ${
          isFocused || value
            ? " translate-y-[-15%] text-gray-600 font-medium"
            : "translate-y-2/4 text-charcoal-80"
        } `}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        ref={ref}
        autoFocus={isFocused ? true : false}
        type={isPassword ? "password" : "text"}
        value={value}
        onChange={onChange}
        className={`font-semibold text-lg translate-y-1/4 bg-transparent focus:outline-none text-charcoal-80`}
      />
    </div>
  );
}

export default InputText;
