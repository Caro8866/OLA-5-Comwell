import Header from "@/components/header/Header";
import InfoCard from "@/components/infoCard/InfoCard";
import Heading from "@/components/text/heading/Heading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ExperienceCard from "@/components/experienceCard/ExperienceCard";
import Label from "@/components/label/Label";
import Button from "@/components/button/Button";
import Footer from "@/components/footer/Footer";

function index() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 15 },
      },
    },
    slides: { perView: 1 },
  });

  return (
    <>
      <Header
        locationsOnClick={() => {
          console.log("locations");
        }}
      />
      <main className={`max-w-screen overflow-hidden`}>
        <section
          id="hero"
          className={`w-full h-[calc(100vh-118px)] relative pt-[86px]`}
        >
          <div
            className={`w-full h-full z-20 relative max-w-2xl 2xl:max-w-[1600px] mx-auto`}
          >
            <Heading size={1} color="white">
              TEST
            </Heading>
            {/* booking form here */}
          </div>
          <Image
            src="/img/hero.jpg"
            alt="placeholder"
            height={1000}
            width={1920}
            className={
              "w-full brightness-90 contrast-[1.1] h-[calc(100vh-118px)] object-cover absolute top-0 left-0"
            }
          />
        </section>
        <section
          id=""
          className={`max-w-screen-2xl 2xl:max-w-[1600px] grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 py-20 px-8 mx-auto`}
        >
          <InfoCard
            src="/img/placeholder.webp"
            title="test title whatever"
            href="/test"
            label="test label text"
            description="Lorem ipsum dolor sit amet"
            styles={`col-span-2 md:col-span-1`}
          />
          <InfoCard
            src="/img/placeholder.webp"
            title="test title whatever"
            href="/test"
            label="test label text"
            description="Lorem ipsum dolor sit amet"
          />
          <InfoCard
            src="/img/placeholder.webp"
            title="test title whatever"
            href="/test"
            label="test label text"
            description="Lorem ipsum dolor sit amet"
          />
        </section>
        <section className={`py-20  relative`}>
          <div
            className={`px-8 mx-auto 2xl:max-w-[1600px] mb-8 w-full flex flex-row justify-between`}
          >
            <Heading size={3}>Offers & Experiences</Heading>
            <Button
              color="outline"
              isActive
              onClick={() => {
                console.log("whatever");
              }}
              isSmall
            >
              See our offers and experiences
            </Button>
          </div>

          <div className={`w-screen overflow-visible`}>
            <div
              ref={ref}
              className={`keen-slider !overflow-visible max-w-[1600px] mx-auto px-8`}
            >
              <ExperienceCard
                linkTo="/test"
                image="/img/placeholder.webp"
                title="Overnight stay with breakfast"
                description="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                tag="Overnight stay"
                price={1000}
                discount={0.5}
                styles={"keen-slider__slide"}
              />
              <ExperienceCard
                linkTo="/test"
                image="/img/placeholder.webp"
                title="Overnight stay with breakfast"
                description="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                tag="Overnight stay"
                price={1000}
                discount={0.5}
                styles={"keen-slider__slide"}
              />
              <ExperienceCard
                linkTo="/test"
                image="/img/placeholder.webp"
                title="Overnight stay with breakfast"
                description="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                tag="Overnight stay"
                price={1000}
                discount={0.5}
                styles={"keen-slider__slide"}
              />
              <ExperienceCard
                linkTo="/test"
                image="/img/placeholder.webp"
                title="Overnight stay with breakfast"
                description="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                tag="Overnight stay"
                price={1000}
                discount={0.5}
                styles={"keen-slider__slide"}
              />
              <ExperienceCard
                linkTo="/test"
                image="/img/placeholder.webp"
                title="Overnight stay with breakfast"
                description="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                tag="Overnight stay"
                price={1000}
                discount={0.5}
                styles={"keen-slider__slide"}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default index;
