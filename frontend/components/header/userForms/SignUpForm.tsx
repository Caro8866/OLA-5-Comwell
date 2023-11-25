import Drawer from "react-modern-drawer";
import Heading from "@/components/text/heading/Heading";
import BodyText from "@/components/text/bodyText/BodyText";
import InputField from "@/components/formField/InputField";
import { useState, useRef, FormEvent, useEffect } from "react";
import InputError from "@/components/formField/InputError";

type Props = {
  isRegisterDrawerOpen: boolean;
  toggleRegisterDrawer: () => void;
};

type ValidatorType = {
  fieldName: string;
  validationFunction: () => boolean;
};

type ValidatorsType = {
  fullName: ValidatorType;
  loginEmail: ValidatorType;
  zipCode: ValidatorType;
  phone: ValidatorType;
  loginPassword: ValidatorType;
  confirmPassword: ValidatorType;
  dateOfBirth: ValidatorType;
};

export default function SignUpForm({
  isRegisterDrawerOpen,
  toggleRegisterDrawer,
}: Props) {
  const [fullName, setFullName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("mm / dd / yyyy");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("Prefer not to say");

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [userExists, setUsersExists] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const ref = useRef<any>(null);
  const isFormSubmitted = useRef(false);

  const validators: ValidatorsType = {
    fullName: {
      fieldName: "name",
      validationFunction: () => fullName.split(/\s+/).length >= 2,
    },

    loginEmail: {
      fieldName: "email",
      validationFunction: () =>
        loginEmail.includes("@") && loginEmail.includes("."),
    },

    zipCode: {
      fieldName: "zipCode",
      validationFunction: () =>
        zipCode ? Number.isInteger(Number(zipCode)) : false,
    },

    phone: {
      fieldName: "phone",
      validationFunction: () =>
        phone ? Number.isInteger(Number(phone)) : false,
    },

    loginPassword: {
      fieldName: "password",
      validationFunction: () => {
        const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // At least one uppercase letter, one number, and 6 characters long
        return regex.test(loginPassword);
      },
    },

    confirmPassword: {
      fieldName: "password-confirmation",
      validationFunction: () => loginPassword === confirmPassword,
    },

    dateOfBirth: {
      fieldName: "dateOfBirth",
      validationFunction: () => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();

        return age >= 18;
      },
    },
  };

  const handleClick = () => {
    setIsFocused(true);
    ref.current && ref.current.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    isFormSubmitted.current = true;

    // Go over each validation rule and if it's not met
    // add an error to the validationErrors array
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
  };

  useEffect(() => {
    // check if the submit button was clicked, if there are any validation errors
    // if the terms and conditions are accepted and if the user doesn't exist already
    if (
      isFormSubmitted.current &&
      validationErrors.length === 0 &&
      isTermsAccepted &&
      !userExists
    ) {
      // Validation passed, proceed with the post request
      fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          zipCode: Number(zipCode),
          email: loginEmail,
          phone: Number(phone),
          gender: selectedGender,
          password: loginPassword,
          dateOfBirth,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              // Display an error message if the user already exists
              if (errorData.statusCode === 409) {
                setUsersExists(true);
              }
              throw new Error(`Server error! Message: ${errorData.message}`);
            });
          }
          // Parse the response data as needed
          return response.json();
        })
        .then((data) => {
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else {
      isFormSubmitted.current = false;
    }
  }, [validationErrors]);

  return (
    <Drawer
      open={isRegisterDrawerOpen}
      onClose={toggleRegisterDrawer}
      direction="right"
      customIdSuffix="registerForm"
      size="420px"
      className={`rounded-l-xl`}
    >
      <section
        className={`px-4 pt-8 flex flex-col flex-grow h-full overflow-y-auto no-scrollbar`}
      >
        <Heading size={2} styles={"mb-4"}>
          Sign up for Comwell club
        </Heading>
        <BodyText size={1} styles={`mb-8 leading-snug font-medium`}>
          Become a member of Comwell Club for free and earn points everytime you
          stay with us. You'll also receive 25 points when you sign up
        </BodyText>
        <form
          // disable form default validation to not interfere with our custom validation
          noValidate
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 mt-8 flex-grow h-full`}
        >
          <InputField
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullName}
            id="name"
            name="name"
            label="Full name"
            styles={`w-96`}
            errorMessage="You need to fill in your full name"
            validationCondition={() => validators.fullName.validationFunction()}
            validationOnSend={!validationErrors.includes("name")}
            setValidationErrors={setValidationErrors}
          />

          <InputField
            onChange={(e) => {
              setLoginEmail(e.target.value);
              setUsersExists(false);
              isFormSubmitted.current = false;
            }}
            value={loginEmail}
            id="email"
            name="email"
            label="Email"
            styles={`w-96`}
            type="email"
            errorMessage="Invalid email. Please verify your details"
            validationCondition={() =>
              validators.loginEmail.validationFunction()
            }
            validationOnSend={!validationErrors.includes("email")}
            setValidationErrors={setValidationErrors}
          />

          {/* display error message if the user exists */}
          <InputError message={"User already exits"} showError={userExists} />

          <InputField
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            value={zipCode}
            id="zipCode"
            name="zipCode"
            label="Zip code"
            styles={`w-96`}
            errorMessage="Invalid postal code"
            validationCondition={() => validators.zipCode.validationFunction()}
            validationOnSend={!validationErrors.includes("zipCode")}
            setValidationErrors={setValidationErrors}
          />
          <InputField
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            id="phone"
            name="phone"
            label="Phone"
            styles={`w-96`}
            errorMessage="Invalid phone number. Please verify your details"
            validationCondition={() => validators.phone.validationFunction()}
            validationOnSend={!validationErrors.includes("phone")}
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
            errorMessage="Your password needs to be at least 6 characters long, contain at least an uppercase letter and a number"
            validationCondition={() =>
              validators.loginPassword.validationFunction()
            }
            validationOnSend={!validationErrors.includes("password")}
            setValidationErrors={setValidationErrors}
          />
          <InputField
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            id="password-confirmation"
            name="password-confirmation"
            label="Confirm password"
            type="password"
            styles={`w-96`}
            errorMessage="Your passwords don't match."
            validationCondition={() =>
              validators.confirmPassword.validationFunction()
            }
            validationOnSend={
              !validationErrors.includes("password-confirmation")
            }
            setValidationErrors={setValidationErrors}
          />

          <div
            className={`w-96 flex max-content flex-col border-2 rounded border-gray-300 px-3 py-4 relative transition hover:border-gray-400 ${
              isFocused && "border-gray-800 hover:border-gray-800"
            }  `}
          >
            <select
              onClick={handleClick}
              onBlur={() => setIsFocused(false)}
              name="gender"
              className="bg-white text-medium font-semibold pt-2.5"
              value={selectedGender}
              onChange={(e) => {
                setSelectedGender(e.target.value);
              }}
            >
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label
              htmlFor={"gender"}
              className="font-sans absolute bottom-2/4 transition translate-y-[-15%] text-gray-600 font-medium"
            >
              Gender
            </label>
          </div>

          <InputField
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
            value={dateOfBirth}
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of birth"
            type="date"
            styles={`w-96`}
            errorMessage="You need to be at least 18 years old to create an account"
            validationCondition={() =>
              validators.dateOfBirth.validationFunction() ||
              dateOfBirth === "mm / dd / yyyy"
                ? true
                : false
            }
            validationOnSend={!validationErrors.includes("dateOfBirth")}
            setValidationErrors={setValidationErrors}
          />

          <div className={`flex flex-row gap-4 justify-items-center mt-4`}>
            <input
              type="checkbox"
              id="termsAndConditions"
              name="terms"
              value="terms"
              className={`min-w-[1.5rem] min-h-[1.5rem] rounded-lg flex`}
              checked={isTermsAccepted}
              onChange={() => setIsTermsAccepted((prev) => !prev)}
            />
            <label htmlFor="termsAndConditions" className={`flex items-center`}>
              <BodyText
                size={1}
                styles={`leading-snug font-medium w-full ${
                  isFormSubmitted.current && !isTermsAccepted && "text-errorRed"
                }`}
              >
                Accept Terms an Conditions
              </BodyText>
            </label>
          </div>
          <div className={`flex flex-row gap-4 justify-items-center mt-4`}>
            <input
              type="checkbox"
              id="marketing"
              name="marketing"
              value="marketing"
              className={`min-w-[1.5rem] min-h-[1.5rem] rounded-lg flex`}
            />
            <label htmlFor="marketing" className={`flex items-center`}>
              <BodyText size={1} styles={`leading-snug font-medium`}>
                I would like to be updated on current member offers, Comwell
                Club surprises and other recommendations personalized to me. I
                can unsubscribe again at any time.
              </BodyText>
            </label>
          </div>
          <div className={`flex-grow`}></div>
          <button
            type="submit"
            className={`py-4 px-10 box-border block w-full text-center self-end my-8 justify-self-end bg-charcoal-80 text-slate-50 hover:brightness-150 rounded-full font-semibold font-sans tracking-wide cursor-pointer`}
          >
            Sign up
          </button>
        </form>
      </section>
    </Drawer>
  );
}
