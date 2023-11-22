import Drawer from "react-modern-drawer";
import Heading from "@/components/text/heading/Heading";
import BodyText from "@/components/text/bodyText/BodyText";
import InputField from "@/components/formField/InputField";
import Button from "@/components/button/Button";
import { useState, useRef } from "react";

type Props = {
  isRegisterDrawerOpen: boolean;
  toggleRegisterDrawer: () => void;
};

export default function SignUpForm({
  isRegisterDrawerOpen,
  toggleRegisterDrawer,
}: Props) {
  const [fullName, setFullName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [zipCode, setZipCode] = useState(0);
  const [phone, setPhone] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState("mm / dd / yyyy");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const ref = useRef<any>(null);

  const handleClick = () => {
    setIsFocused(true);
    ref.current && ref.current.focus();
  };

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
        <form className={`flex flex-col gap-4 mt-8 flex-grow h-full`}>
          <InputField
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullName}
            id="name"
            name="name"
            label="Full name"
            styles={`w-96`}
          />
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
          />
          <InputField
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            value={zipCode === 0 ? "" : zipCode}
            id="zipCode"
            name="zipCode"
            label="Zip code"
            styles={`w-96`}
            type="number"
          />
          <InputField
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone === 0 ? "" : phone}
            id="phone"
            name="phone"
            label="Phone"
            styles={`w-96`}
            type="number"
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
          />

          <div className={`flex flex-row gap-4 justify-items-center mt-4`}>
            <input
              type="checkbox"
              id="termsAndConditions"
              name="terms"
              value="terms"
              className={`min-w-[1.5rem] min-h-[1.5rem] rounded-lg flex`}
            />
            <label htmlFor="termsAndConditions" className={`flex items-center`}>
              <BodyText size={1} styles={`leading-snug font-medium w-full`}>
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
          <Button
            color="charcoal"
            isFullWidth
            styles={`self-end my-8 justify-self-end`}
          >
            Sign up
          </Button>
        </form>
      </section>
    </Drawer>
  );
}
