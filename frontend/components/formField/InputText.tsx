import "@/app/globals.css";
import { useState, useRef } from "react";

type Props = {
  onChange: (e: any) => void;
  placeholder?: string;
  label?: string;
  value: string;
};

function InputText({ label, value, onChange }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const ref = useRef<any>(null);

  const handleClick = () => {
    setIsFocused(true);
    ref.current && ref.current.focus();
  };

  return (
    <div
      className={`flex max-content flex-col border-2 rounded border-gray-200 px-3 py-4 relative transition ${
        isFocused && "border-gray-800"
      }`}
      onClick={handleClick}
      onBlur={() => setIsFocused(false)}
    >
      <label
        className={`font-sans font-semibold absolute bottom-2/4 translate-y-2/4 transition ${
          isFocused || value
            ? " translate-y-[-15%] font-normal text-gray-600"
            : "translate-y-2/4"
        } `}
      >
        {label}
      </label>
      <input
        ref={ref}
        autoFocus={isFocused ? true : false}
        type="text"
        value={value}
        onChange={onChange}
        className={
          "font-semibold text-lg translate-y-1/4 bg-transparent focus:outline-none"
        }
      />
    </div>
  );
}

export default InputText;
