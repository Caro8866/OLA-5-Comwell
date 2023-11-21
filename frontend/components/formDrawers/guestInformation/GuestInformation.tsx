import Button from "@/components/button/Button";
import InputText from "@/components/formField/InputText";
import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

type GuestInformationProps = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

function GuestInformation({ fullName, email, phone, address }: GuestInformationProps) {
  return (
    <Drawer open={true} onClose={() => {}} direction="right" size={600}>
      {/* header */}
      <div className="grid grid-cols-2 ">
        <div className="guestInformation">
          <Heading size={3} color="black">
            Guest Information
          </Heading>
          <Heading size={7} color={"black"}>
            ROOM 1
          </Heading>
          <InputText label="Full Name" value={fullName} onChange={() => {}} name={fullName} id={fullName} />
          <InputText label="Email" value={email} onChange={() => {}} name={email} id={email} />
          <InputText label="Phone" value={phone} onChange={() => {}} name={phone} id={phone} />
          <InputText label="Address" value={address} onChange={() => {}} name={address} id={address} />
        </div>
        <div className="bookingOverview bg-charcoal-10">
          <Heading size={3} color="black">
            Overview
          </Heading>
        </div>
        <div className="flex justify-end col-span-2">
          <Button
            onClick={() => {
              setDrawer;
            }}
            color="charcoal"
            isActive={true}
            isSmall={true}
          >
            Continue
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default GuestInformation;
