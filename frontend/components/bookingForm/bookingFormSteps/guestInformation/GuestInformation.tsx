import React from "react";
import Button from "@/components/button/Button";
import InputText from "@/components/formField/InputText";
import BodyText from "@/components/text/bodyText/BodyText";
import Heading from "@/components/text/heading/Heading";

type GuestInformationProps = {
  onNext: () => void;
  bookingData: any;
};

function GuestInformation({ onNext, bookingData }: GuestInformationProps) {
  return (
    /* two columns */
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* guest information form */}
      <div className={"p-4"}>
        <Heading size={3} color="black">
          Guest Information
        </Heading>

        <form className="flex flex-col gap-4">
          <InputText label="Full Name" value={""} onChange={() => {}} name={"fullName"} id={"fullName"} />
          <InputText label="Email" value={""} onChange={() => {}} name={""} id={""} />
          <InputText label="Phone" value={""} onChange={() => {}} name={""} id={""} />
          <InputText label="Add optional address to save time at check in" value={""} onChange={() => {}} name={""} id={""} />
        </form>
      </div>
      <div>
        <div className="bg-charcoal-10 p-4  h-full">
          <Heading size={3} color="black">
            Overview
          </Heading>
          {/* loop over rooms and display ifno on that room */}
          <div className="flex justify-between">
            <BodyText size={2} color={"black"}>
              Room 1
            </BodyText>
            <BodyText size={1} color={"black"}>
              2 Adults, 1 Child
            </BodyText>
          </div>
        </div>
      </div>
      <Button onClick={onNext} color="charcoal" isActive={true} isSmall={false}>
        Continue
      </Button>
    </div>
  );
}

export default GuestInformation;
