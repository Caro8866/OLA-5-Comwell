import { Hotel } from "@/utils/Hotel.types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Spinner from "../spinner/Spinner";

type Props = {
  hotels?: Hotel[];
};

function HotelList(props: Props) {
  const [visible, setVisible] = useState("");

  return (
    <section>
      <nav
        className={`z-20 relative flex px-8 py-12 text-heading-medium-mobile xl:text-heading-medium-desktop font-semibold hover:text-charcoal-40 ease duration-300`}
      >
        <ul className={`flex flex-col w-full`}>
          {props.hotels && props.hotels.length ? (
            props.hotels.map((hotel) => (
              <Link
                href={`/${hotel.name.replace(/\s+/g, "-").toLowerCase()}`}
                key={hotel._id}
                onMouseEnter={() => setVisible(hotel._id)}
                onMouseLeave={() => setVisible("")}
                className={`hover:text-slate-50 w-full xl:w-[66%] flex flex-row justify-between items-center py-2`}
              >
                <span>{hotel.name}</span>
                <span>{hotel.region}</span>
              </Link>
            ))
          ) : (
            <Spinner />
          )}
        </ul>
      </nav>
      {props.hotels && props.hotels.length ? (
        props.hotels.map((hotel) => {
          return (
            <Image
              width={1920}
              height={1080}
              className={`w-full h-full absolute pointer-events-none z-0 object-cover top-0 left-0 transition ease brightness-[0.8] duration-300 ${
                visible === hotel._id
                  ? `opacity-100 z-10`
                  : `opacity-0 delay-150`
              }`}
              src={hotel.image}
              alt={hotel.name}
            />
          );
        })
      ) : (
        <></>
      )}
    </section>
  );
}

export default HotelList;
