import Header from "@/components/header/Header";
import InfoCard from "@/components/infoCard/InfoCard";
import Heading from "@/components/text/heading/Heading";
import Image from "next/image";
import React from "react";

function index() {
  return (
    <>
      <Header
        locationsOnClick={() => {
          console.log("locations");
        }}
      />
      <main>
        <section
          id="hero"
          className={`w-full h-[calc(100vh-118px)] relative pt-[86px]`}
        >
          <div className={`w-full h-full z-50 relative`}>
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
          className={`max-w-screen-2xl grid grid-cols-3 gap-8 py-12 px-8 mx-auto`}
        >
          <InfoCard
            src="/img/placeholder.webp"
            title="test title whatever"
            href="/test"
            label="test label text"
            description="Lorem ipsum dolor sit amet"
          />
        </section>
      </main>
    </>
  );
}

export default index;
