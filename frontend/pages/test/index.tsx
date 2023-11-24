import "@/app/globals.css";
// import BookingForm from "@/components/bookingForm/BookingForm";
import ExperienceCard from "@/components/experienceCard/ExperienceCard";
import InputSelect from "@/components/formField/InputSelect";
import Header from "@/components/header/Header";
import SearchWidget from "@/components/searchWidget/SearchWidget";
import { BookingContextProvider } from "@/context/BookingContext";
import { log } from "console";
import React from "react";
import { useState } from "react";

function Test() {
  const [myValue, setMyValue] = useState("Test");

  return (
    <div className={`h-full w-full bg-slate-400`}>
      <BookingContextProvider>
        <SearchWidget />
      </BookingContextProvider>
    </div>
  );
}

export default Test;
