import InputField from "@/components/formField/InputField";
import { useState, FormEvent, useContext } from "react";
import { SignInValidators } from "../../../utils/formTypes";
import InputError from "@/components/formField/InputError";
import { AuthContext } from "@/context/AuthContext";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [unauthorizedError, setUnauthorizedError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [errorText, setErrorText] = useState("");

  const { onSignInSuccess, authState } = useContext(AuthContext);

  authState.isAuthenticated && console.log(authState.userData);

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
              setErrorText("Email or password are wrong. Please try again");
              throw new Error(`Server error! Message: ${errorData.message}`);
            });
          }

          const token = getCookie("token");
          const responseAdmin = await fetch(
            "http://localhost:5000/auth/admin",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          if (!responseAdmin.ok) {
            return responseAdmin.json().then((errorData) => {
              // Display an error if the user doesn't exist or the password is wrong
              setUnauthorizedError(true);
              setErrorText("You are not authorized to access this area");
              throw new Error(`Server error! Message: ${errorData.message}`);
            });
          }

          // Run the callback from the auth context to check if the cookie token in still valid
          onSignInSuccess();
          return responseAdmin.json();
        })
        .then((data) => {
          // remove error if the login was successful
          setUnauthorizedError(false);
          setErrorText("");
          console.log("Response:", "login was successful");
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }

  return (
    <>
      <svg
        enableBackground="new 0 0 500 144"
        viewBox="0 0 500 144"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-24 absolute top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        <g fill={`black`}>
          <path d="m71.7 25.6c-7.4-3.8-16-6.1-24.9-6.1-18.6 0-31.5 10.9-31.5 26.5 0 15.8 13.5 29.9 34.2 29.9 10.1 0 20.2-2.9 28.7-6.8h.4l-6.9 12.5c-6.3 2.4-13.3 3.2-20.3 3.2-31.8 0-51.4-14.2-51.4-37.2 0-22.3 19.6-37 47.2-37 8.2 0 16.5 1.2 24.5 2.7z"></path>
          <path d="m117.2 84.5c19 0 35.1-11.2 35.1-26.7 0-7.3-4.2-14.4-11-19.3-6.5-4.5-13.9-6.4-22.5-6.4-19.4 0-35.6 10.4-35.6 26.6-.1 15.3 15.5 25.8 34 25.8zm.6-7.1c-13.7 0-21.1-10.7-21.1-20.6 0-9.7 8.1-17.5 20.6-17.5 14.4 0 21.4 10.3 21.4 20.8 0 9.6-8.5 17.3-20.9 17.3z"></path>
          <path d="m167.2 33.6c3 0 6.2-.1 8.3-1.4h.4v8.5c4.7-5.8 10-8.5 19-8.5 9.5 0 16 3 21 9.4 5.3-5.8 11.6-9.4 21.5-9.4 19.1 0 24.1 8.7 24.1 22.4v16.6c0 4.6-.8 9.9 5.9 11.6v.3h-23.3v-.3c5.9-2.7 5.1-6.7 5.1-11.6v-13.9c0-11-4.3-18-15.1-18-12.1 0-15.5 6.1-15.5 16.3v15.6c0 5-.8 8.9 5.1 11.6v.3h-22.5v-.3c5.9-2.7 5.1-6.7 5.1-11.6v-14.9c0-11.3-7-17-15.3-17-10.2 0-15.2 5.1-15.2 15.4v16.5c0 5-.8 8.8 5 11.6v.3h-22.3v-.3c5.9-2.7 5.1-6.7 5.1-11.6v-25.8c0-5 .8-8.8-5.1-11.5v-.3z"></path>
          <path d="m270.9 33.6c4.3 0 9.1.5 12.4-1.4h.4c.1 1.6.8 3.8 1.7 5.6l15.7 32.7 12.2-25.3c1.9-3.9 5.3-9-1.2-11.3v-.3h17.6v1.6c0 1.1 1.3 3.8 1.9 4.9l13.9 30.3 12.5-25.3c1.7-3.7 5.4-8.6-1.9-11.3v-.3h18l-26.6 51.5c-9.1-3.9-10.2-5.7-13.6-12.8l-11.6-24.7-18.4 37.5c-9.6-4-10.9-5.3-14.5-12.8l-14.8-30.2c-1.9-3.6-3-5.9-7.1-8.1v-.3z"></path>
          <path d="m441.2 56.6c.5-13.9-12-24.4-30.3-24.4-20 0-33.6 10.9-33.6 25.8 0 15 15.7 26.5 38.6 26.5 6.3 0 12.8-.8 18.6-2.7l6.7-10.1h-.4c-6.2 3.9-14 5.7-22.1 5.7-15.2 0-26.6-7.6-26.9-20.8zm-48.8-6.2c1.6-6.8 8.3-11.1 17.4-11.1 9.7 0 15.9 3.6 17.4 11.1z"></path>
          <path d="m456.4 1.7c3.1 0 6.6.1 8.6-2h.4v69.7c0 5.7-.9 10.3 5 13.4v.4h-22.2v-.4c5.8-3.1 5-7.7 5-13.4v-54c0-5.7.8-10.3-5-13.4v-.3z"></path>
          <path d="m486 1.7c3.1 0 6.6.1 8.6-2h.4v69.7c0 5.7-.9 10.3 5 13.4v.4h-22.2v-.4c5.8-3.1 5-7.7 5-13.4v-54c0-5.7.8-10.3-5-13.4v-.3z"></path>
          <path d="m148.4 113.1h6.7v11.3h12.9v-11.3h6.7v30.2h-6.7v-13.1h-12.9v13.1h-6.7z"></path>
          <path d="m187.7 128.2c0-2.4.4-4.6 1.2-6.6s1.9-3.6 3.4-5 3.2-2.4 5.2-3.2c2-.7 4.2-1.1 6.5-1.1 2.4 0 4.5.4 6.5 1.1s3.7 1.8 5.2 3.2 2.6 3.1 3.4 5c.8 2 1.2 4.2 1.2 6.6s-.4 4.6-1.2 6.6-1.9 3.6-3.4 5-3.2 2.4-5.2 3.2c-2 .7-4.2 1.1-6.5 1.1-2.4 0-4.5-.4-6.5-1.1s-3.7-1.8-5.2-3.2-2.6-3.1-3.4-5-1.2-4.1-1.2-6.6zm7 0c0 1.4.2 2.7.7 3.9.4 1.2 1.1 2.2 1.9 3.1s1.8 1.5 3 2 2.4.7 3.9.7c1.4 0 2.7-.2 3.9-.7s2.1-1.2 3-2c.8-.9 1.5-1.9 1.9-3.1s.7-2.5.7-3.9-.2-2.7-.7-3.9c-.4-1.2-1.1-2.2-1.9-3.1s-1.8-1.5-3-2-2.4-.7-3.9-.7c-1.4 0-2.7.2-3.9.7s-2.1 1.2-3 2c-.8.9-1.5 1.9-1.9 3.1-.5 1.2-.7 2.5-.7 3.9z"></path>
          <path d="m239.3 119h-8.6v-5.9h23.9v5.9h-8.6v24.3h-6.7z"></path>
          <path d="m266.8 113.1h20.5v6.2h-13.9v5.6h13.1v6.2h-13.1v6.2h14.7v6.2h-21.3z"></path>
          <path d="m302.2 113.1h6.7v24.1h12.3v6.2h-19z"></path>
          <path d="m348.4 120.5c-.5-.7-1.3-1.2-2.2-1.5s-1.8-.5-2.6-.5c-.5 0-1 .1-1.5.2s-1 .3-1.5.5-.8.6-1.1 1-.4.9-.4 1.5c0 .9.3 1.6 1 2.1s1.5.9 2.6 1.2c1 .3 2.2.7 3.4 1s2.3.8 3.4 1.5c1 .6 1.9 1.5 2.6 2.5.7 1.1 1 2.5 1 4.2s-.3 3.1-.9 4.4-1.5 2.3-2.5 3.1c-1.1.8-2.3 1.4-3.7 1.8s-2.9.6-4.5.6c-2 0-3.8-.3-5.5-.9s-3.2-1.6-4.7-2.9l4.7-5.2c.7.9 1.5 1.6 2.6 2.1 1 .5 2.1.7 3.2.7.5 0 1.1-.1 1.6-.2.6-.1 1.1-.3 1.5-.6s.8-.6 1.1-1 .4-.9.4-1.4c0-.9-.3-1.6-1-2.2-.7-.5-1.6-1-2.6-1.3-1.1-.4-2.2-.7-3.4-1.1s-2.4-.9-3.4-1.5c-1.1-.6-1.9-1.5-2.6-2.5s-1-2.4-1-4.1c0-1.6.3-3 1-4.3.6-1.2 1.5-2.2 2.6-3.1 1.1-.8 2.3-1.4 3.7-1.9 1.4-.4 2.8-.6 4.3-.6 1.7 0 3.4.2 5 .7s3 1.3 4.3 2.4z"></path>
        </g>
      </svg>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={`absolute flex flex-col bg-slate-50 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
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
            validationCondition={() =>
              validators.loginEmail.validationFunction()
            }
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

          <InputError message={errorText} showError={unauthorizedError} />
        </div>
        <button
          type="submit"
          className={`text-heading-xsmall-desktop self-center mb-2 py-4 w-1/2 text-center bg-sea-80 text-slate-50 hover:brightness-150 rounded-full font-semibold font-sans tracking-wide`}
        >
          Sign in
        </button>
      </form>
    </>
  );
}
