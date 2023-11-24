import "@/app/globals.css";
import ExperienceCard from "@/components/experienceCard/ExperienceCard";
import GuestInformation from "@/components/formDrawers/guestInformation/GuestInformation";
import InputSelect from "@/components/formField/InputSelect";
import Header from "@/components/header/Header";
import SearchWidget from "@/components/searchWidget/SearchWidget";
import { BookingFormProvider } from "@/context/BookingFormContext";
import { log } from "console";
import React from "react";
import { useState } from "react";

function Test() {
  const [myValue, setMyValue] = useState("Test");

  return (
    <div className={`h-full w-full bg-slate-400`}>
      {/*  <Header
        /* menuOnClick={() => {}}
        locationsOnClick={() => {
          console.log("locations");
        }}
      />
      <div className={`py-4 grid grid-cols-4 gap-4`}>
        <ExperienceCard linkTo="/test" image="/img/placeholder.webp" title="Overnight stay with breakfast" description="lorem ipsum dolor sit amet" tag="Overnight stay" price={1234} />
        <ExperienceCard
          linkTo="/test"
          image="/img/placeholder.webp"
          title="Overnight stay with breakfast"
          description="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
          tag="Overnight stay"
          price={1000}
          discount={0.5}
        />
        <ExperienceCard linkTo="/test" image="/img/placeholder.webp" title="Overnight stay with breakfast" description="lorem ipsum dolor sit amet" tag="Overnight stay" />
      </div> */}
      <BookingFormProvider value={myValue}>
        <SearchWidget />
      </BookingFormProvider>
      {/*       <GuestInformation />
       */}
    </div>
  );
}

export default Test;
