import InputField from "@/components/formField/InputField";
import BodyText from "@/components/text/bodyText/BodyText";
import { useState, FormEvent } from "react";
import { SignInValidators } from "./formTypes";
import InputError from "@/components/formField/InputError";
import { getCookie } from "cookies-next";

export default function SignInForm({
  toggleRegisterDrawer,
  isLoginVisible,
}: {
  toggleRegisterDrawer: () => void;
  isLoginVisible: boolean;
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [unauthorizedError, setUnauthorizedError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  console.log(getCookie("token"));

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
    Object.entries(validators).forEach(([key, value]) => {
      if (!value.validationFunction()) {
        setValidationErrors((prev) =>
          Array.from(new Set([...prev, value.fieldName]))
        );
      } else {
        setValidationErrors((prev) =>
          prev.filter((e) => e !== value.fieldName)
        );
      }
    });

    if (
      validators.loginEmail.validationFunction() &&
      validators.loginPassword.validationFunction()
    ) {
      fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              // Display an error if the user doesn't exist or the password is wrong
              setUnauthorizedError(true);
              throw new Error(`Server error! Message: ${errorData.message}`);
            });
          }
          // Parse the response data as needed
          return response.json();
        })
        .then((data) => {
          // remove error if the login was successful
          setUnauthorizedError(false);
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={`absolute flex flex-col bg-slate-50 rounded-lg right-0 top-16 ${
        isLoginVisible ? "" : "hidden"
      }`}
    >
      <div className={`px-4 pt-6 pb-3 flex flex-col gap-4`}>
        <InputField
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
          value={loginEmail}
          id="email"
          name="email"
          label="Email"
          styles={`w-96`}
          type="email"
          errorMessage="Please use a valid email address"
          validationCondition={() => validators.loginEmail.validationFunction()}
          validationOnSend={!validationErrors.includes("email")}
          setValidationErrors={setValidationErrors}
        />

        <InputField
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
          value={loginPassword}
          id="password"
          name="password"
          label="Password"
          type="password"
          styles={`w-96`}
          errorMessage="You need to fill in a password"
          validationCondition={() =>
            validators.loginPassword.validationFunction()
          }
          validationOnSend={!validationErrors.includes("password")}
          setValidationErrors={setValidationErrors}
        />

        <InputError
          message="Something went wrong. Try again"
          showError={unauthorizedError}
        />

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
