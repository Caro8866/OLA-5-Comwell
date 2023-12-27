import "@/app/globals.css";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import InputError from "./InputError";

type Props = {
  onChange: (e: any) => void;
  placeholder?: string;
  label?: string;
  value: string | number;
  name: string;
  id: string;
  type?: string;
  styles?: string;
  // a condition that will be checked onBlur
  validationCondition?: () => boolean;
  // a condition that is checked when the submit action is triggered
  validationOnSend?: boolean;
  // setter function for validation errors array
  setValidationErrors?: React.Dispatch<React.SetStateAction<string[]>>;
  // an error message that will be displayed if
  // validationCondition or validationOnSend fail
  errorMessage?: string;
};

function InputField({
  label,
  value,
  onChange,
  name,
  id,
  type = "text",
  styles,
  validationCondition,
  setValidationErrors,
  validationOnSend,
  errorMessage,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [conditionPassed, setConditionPassed] = useState(true);
  const ref = useRef<any>(null);
  const handleClick = () => {
    setIsFocused(true);
    ref.current && ref.current.focus();
  };

  return (
    <>
      <div
        className={`flex max-content flex-col border-2 rounded border-gray-300 px-3 py-4 relative transition hover:border-gray-400 ${
          isFocused && "border-gray-800 hover:border-gray-800"
        }  ${styles}`}
        onClick={handleClick}
        onBlur={() => {
          setIsFocused(false);

          // if there are validation rules check if they pass
          // and display an error message accordingly
          setValidationErrors &&
            setValidationErrors((prev) => prev.filter((e) => e !== name));
          validationCondition && value
            ? setConditionPassed(validationCondition())
            : setConditionPassed(true);
        }}
      >
        <label
          htmlFor={id}
          className={`font-sans font-semibold absolute bottom-2/4 translate-y-2/4 transition ${
            isFocused || value !== ""
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
          type={type}
          value={value}
          onChange={onChange}
          className={`font-semibold text-lg translate-y-1/4 bg-transparent focus:outline-none text-charcoal-80`}
        />
      </div>

      <InputError
        message={errorMessage}
        showError={!validationOnSend || !conditionPassed ? true : false}
      />
    </>
  );
}

export default InputField;
