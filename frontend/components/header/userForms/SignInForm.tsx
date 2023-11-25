import InputField from "@/components/formField/InputField";
import BodyText from "@/components/text/bodyText/BodyText";
import { useState, FormEvent } from "react";
import { SignInValidators } from "./formTypes";

export default function SignInForm({
  toggleRegisterDrawer,
  isLoginVisible,
}: {
  toggleRegisterDrawer: () => void;
  isLoginVisible: boolean;
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const validators: SignInValidators = {
    loginEmail: {
      fieldName: "email",
      validationFunction: () =>
        loginEmail.includes("@") && loginEmail.includes("."),
    },
    loginPassword: {
      fieldName: "password",
      validationFunction: () => loginPassword !== "",
    },
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("da");
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={`absolute flex flex-col bg-slate-50 rounded-lg right-0 top-16 ${
        isLoginVisible ? "" : "hidden"
      }`}
    >
      <div className={`px-4 pt-6 pb-3 flex flex-col`}>
        <InputField
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
          value={loginEmail}
          name="email"
          id="email"
          label="Email"
        ></InputField>
        <InputField
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
          value={loginPassword}
          name="password"
          id="password"
          label="Password"
          type="password"
          styles="mt-2"
        ></InputField>
        <BodyText size={1} styles="text-charcoal-60 mt-2 font-regular">
          Forgot your password?
        </BodyText>
        <span
          className={`text-sea-80 underline font-regular w-max cursor-pointer`}
        >
          Reset password
        </span>
        <BodyText size={1} styles="text-charcoal-60 mt-2 font-regular">
          Don't have an account?
        </BodyText>
        <span
          onClick={toggleRegisterDrawer}
          className={`text-sea-80 underline font-regular w-max cursor-pointer`}
        >
          Sign up for Comwell club
        </span>
      </div>
      <span className={`pt-6 mt-2 border-t border-gray-300 px-6 pb-4`}>
        <button
          type="submit"
          className={`text-heading-xsmall-desktop mb-2 py-4 w-full text-center bg-sea-80 text-slate-50 hover:brightness-150 rounded-full font-semibold font-sans tracking-wide`}
        >
          Sign up
        </button>
      </span>
    </form>
  );
}
