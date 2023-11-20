import React from "react";
import "@/app/globals.css";
import Image from "next/image";
import Label from "../label/Label";
import Heading from "../text/heading/Heading";
import BodyText from "../text/bodyText/BodyText";
import Link from "next/link";

type Props = {
  src: string;
  title: string;
  description: string;
  label: string;
  href: string;
};

function InfoCard(props: Props) {
  return (
    <article className={`flex rounded-xl column overflow-hidden min-h-[300px]`}>
      <Link
        href={props.href}
        className={`w-full h-full flex flex-col p-8 relative`}
      >
        <div className={`z-20 flex flex-col h-full w-full`}>
          <Label color="white" styles={`w-fit uppercase `}>
            {props.label}
          </Label>
          <div className={`flex-grow`}></div>
          <Heading size={5} color="white" styles={`flex justify-self-end mb-2`}>
            {props.title}
          </Heading>
          <BodyText size={1} color="white">
            {props.description}
          </BodyText>
        </div>
        <div
          className={`bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-transparent to-[rgba(0,0,0,0.75)] h-full w-full absolute z-10 bottom-0 left-0`}
        ></div>
        <Image
          src={props.src}
          alt={props.title}
          height={500}
          width={500}
          className={`absolute top-0 left-0 z-0 brightness-90 contrast-[1.1] w-full h-full object-cover`}
        />
      </Link>
    </article>
  );
}

export default InfoCard;
