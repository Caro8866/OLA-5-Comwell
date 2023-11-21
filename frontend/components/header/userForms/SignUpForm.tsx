import Drawer from "react-modern-drawer";
import Heading from "@/components/text/heading/Heading";
import BodyText from "@/components/text/bodyText/BodyText";
import InputField from "@/components/formField/InputField";
import Button from "@/components/button/Button";

type Props = {
  isRegisterDrawerOpen: boolean;
  toggleRegisterDrawer: () => void;
};

export default function SignUpForm({
  isRegisterDrawerOpen,
  toggleRegisterDrawer,
}: Props) {
  return (
    <Drawer
      open={isRegisterDrawerOpen}
      onClose={toggleRegisterDrawer}
      direction="right"
      customIdSuffix="registerForm"
      size="420px"
      className={`rounded-l-xl`}
    >
      <section className={`px-4 pt-8 flex flex-col flex-grow h-full`}>
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
              console.log(e.target.value);
            }}
            value=""
            id="name"
            name="name"
            label="Full name"
            styles={`w-96`}
          />
          <InputField
            onChange={(e) => {
              console.log(e.target.value);
            }}
            value=""
            id="email"
            name="email"
            label="Email"
            styles={`w-96`}
          />
          <InputField
            onChange={(e) => {
              console.log(e.target.value);
            }}
            value=""
            id="password"
            name="password"
            label="Password"
            type="password"
            styles={`w-96`}
          />
          <InputField
            onChange={(e) => {
              console.log(e.target.value);
            }}
            value=""
            id="password-confirmation"
            name="password-confirmation"
            label="Confirm password"
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
