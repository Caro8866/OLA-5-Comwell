import "@/app/globals.css";
import ExperienceCard from "@/components/experienceCard/ExperienceCard";
import InputSelect from "@/components/formField/InputSelect";
import Header from "@/components/header/Header";
import { log } from "console";
import { useState } from "react";

function test() {
  const [myValue, setMyValue] = useState("Test");

  return (
    <>
      <Header
        menuOnClick={() => {
          console.log("menu");
        }}
        profileOnClick={() => {
          console.log("profile");
        }}
        locationsOnClick={() => {
          console.log("locations");
        }}
      />
      <div className={`py-4 grid grid-cols-4 gap-4`}>
        <ExperienceCard
          linkTo="/test"
          image="/img/placeholder.webp"
          title="Overnight stay with breakfast"
          description="lorem ipsum dolor sit amet"
          tag="Overnight stay"
          price={1234}
        />
        <ExperienceCard
          linkTo="/test"
          image="/img/placeholder.webp"
          title="Overnight stay with breakfast"
          description="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
          tag="Overnight stay"
          price={1000}
          discount={0.5}
        />
        <ExperienceCard
          linkTo="/test"
          image="/img/placeholder.webp"
          title="Overnight stay with breakfast"
          description="lorem ipsum dolor sit amet"
          tag="Overnight stay"
        />
      </div>
    </>
  );
}

export default test;
