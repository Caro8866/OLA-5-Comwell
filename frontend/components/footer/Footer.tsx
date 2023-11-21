import "@/app/globals.css";
import Link from "next/link";
import BodyText from "../text/bodyText/BodyText";
import Heading from "../text/heading/Heading";
import { useState } from "react";

type Props = {};

function Footer(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className={`w-full bg-sea-80 text-slate-50 pt-20`}>
      <section
        className={`mx-auto max-w-[1600px] flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-36 px-8 pb-8 lg:pb-96`}
      >
        <div className={`mb-8`}>
          <div
            className={`w-full flex justify-between py-6 border-t-[1px] border-slate-600 cursor-pointer md:hidden`}
            onClick={() => {
              // toggler
              setIsOpen((previousState) => !previousState);
            }}
          >
            <p>MENU</p> <p>V</p>
          </div>
          <ul
            className={`font-semibold text-heading-small-desktop md:text-heading-large-desktop flex flex-col gap-4 hover:text-slate-400 transition-all overflow-hidden h-fit ${
              isOpen ? "md:max-h-fit" : "max-h-0  md:max-h-fit"
            }`}
          >
            <Link href="#" className={`hover:text-slate-50 transition`}>
              Hotels
            </Link>
            <Link href="#" className={`hover:text-slate-50 transition`}>
              Packages
            </Link>
            <Link href="#" className={`hover:text-slate-50 transition`}>
              Meeting & Conference
            </Link>
            <Link href="#" className={`hover:text-slate-50 transition`}>
              Restaurant & Events
            </Link>
            <Link href="#" className={`hover:text-slate-50 transition`}>
              Spa
            </Link>
            <Link href="#" className={`hover:text-slate-50 transition`}>
              Contact
            </Link>
          </ul>
        </div>
        <div className={`flex flex-col gap-2 order-first md:order-last`}>
          <BodyText size={2} color="white" isBold styles="mb-1">
            CONTACT
          </BodyText>
          <BodyText size={1} color="white" isBold styles="mb-1">
            Central reservation
          </BodyText>
          <article className={`flex flex-col gap-1`}>
            <Heading size={6} color="white" styles="mb-1">
              BOOK ACCOMODATION
            </Heading>
            <BodyText size={1} color="white">
              Phone:{" "}
              <Link
                href="tel:+4570274274"
                className={"underline font-semibold tracking-wide"}
              >{`(+45) 70 274 274`}</Link>
              <span className={"font-semibold ml-1"}>press 2</span>
            </BodyText>
            <BodyText size={1} color="white">
              Email:{" "}
              <Link
                href="mailto:booking@comwell.com"
                className={"underline font-semibold tracking-wide"}
              >{`booking@comwell.com`}</Link>
            </BodyText>
          </article>
          <article className={`flex flex-col`}>
            <Heading size={6} color="white" styles="mb-1">
              BOOK CONFERENCE
            </Heading>
            <BodyText size={1} color="white">
              Phone:{" "}
              <Link
                href="tel:+4570274274"
                className={"underline font-semibold tracking-wide"}
              >{`(+45) 70 274 274`}</Link>
              <span className={"font-semibold ml-1"}>press 1</span>
            </BodyText>
            <BodyText size={1} color="white">
              Email:{" "}
              <Link
                href="mailto:konference@comwell.com"
                className={"underline font-semibold tracking-wide"}
              >{`konference@comwell.com`}</Link>
            </BodyText>
          </article>
          <article className={`flex flex-col gap-0.5`}>
            <Heading size={6} color="white" styles="mb-1">
              GENERAL{" "}
            </Heading>
            <BodyText size={1} color="white">
              <Link
                href="/contact"
                className={"underline font-semibold tracking-wide"}
              >
                Contact Comwells Departments
              </Link>
              <span className={"font-semibold ml-1"}>press 2</span>
            </BodyText>
            <BodyText size={1} color="white">
              <Link
                href="/contact"
                className={"underline font-semibold tracking-wide"}
              >{`Contact Hotels`}</Link>
            </BodyText>
          </article>
        </div>
      </section>
      <section className={`w-full bg-sea-100`}>
        <div
          className={`mx-auto max-w-[1600px] py-6 px-8 flex flex-row w-full justify-between items-center`}
        >
          <div>
            <Link href="/">
              <svg
                enableBackground="new 0 0 500 144"
                viewBox="0 0 500 144"
                xmlns="http://www.w3.org/2000/svg"
                className={`max-w-fit w-full h-10 fill-slate-50`}
              >
                <g fill={``}>
                  <path d="m71.7 25.6c-7.4-3.8-16-6.1-24.9-6.1-18.6 0-31.5 10.9-31.5 26.5 0 15.8 13.5 29.9 34.2 29.9 10.1 0 20.2-2.9 28.7-6.8h.4l-6.9 12.5c-6.3 2.4-13.3 3.2-20.3 3.2-31.8 0-51.4-14.2-51.4-37.2 0-22.3 19.6-37 47.2-37 8.2 0 16.5 1.2 24.5 2.7z"></path>
                  <path d="m117.2 84.5c19 0 35.1-11.2 35.1-26.7 0-7.3-4.2-14.4-11-19.3-6.5-4.5-13.9-6.4-22.5-6.4-19.4 0-35.6 10.4-35.6 26.6-.1 15.3 15.5 25.8 34 25.8zm.6-7.1c-13.7 0-21.1-10.7-21.1-20.6 0-9.7 8.1-17.5 20.6-17.5 14.4 0 21.4 10.3 21.4 20.8 0 9.6-8.5 17.3-20.9 17.3z"></path>
                  <path d="m167.2 33.6c3 0 6.2-.1 8.3-1.4h.4v8.5c4.7-5.8 10-8.5 19-8.5 9.5 0 16 3 21 9.4 5.3-5.8 11.6-9.4 21.5-9.4 19.1 0 24.1 8.7 24.1 22.4v16.6c0 4.6-.8 9.9 5.9 11.6v.3h-23.3v-.3c5.9-2.7 5.1-6.7 5.1-11.6v-13.9c0-11-4.3-18-15.1-18-12.1 0-15.5 6.1-15.5 16.3v15.6c0 5-.8 8.9 5.1 11.6v.3h-22.5v-.3c5.9-2.7 5.1-6.7 5.1-11.6v-14.9c0-11.3-7-17-15.3-17-10.2 0-15.2 5.1-15.2 15.4v16.5c0 5-.8 8.8 5 11.6v.3h-22.3v-.3c5.9-2.7 5.1-6.7 5.1-11.6v-25.8c0-5 .8-8.8-5.1-11.5v-.3z"></path>
                  <path d="m270.9 33.6c4.3 0 9.1.5 12.4-1.4h.4c.1 1.6.8 3.8 1.7 5.6l15.7 32.7 12.2-25.3c1.9-3.9 5.3-9-1.2-11.3v-.3h17.6v1.6c0 1.1 1.3 3.8 1.9 4.9l13.9 30.3 12.5-25.3c1.7-3.7 5.4-8.6-1.9-11.3v-.3h18l-26.6 51.5c-9.1-3.9-10.2-5.7-13.6-12.8l-11.6-24.7-18.4 37.5c-9.6-4-10.9-5.3-14.5-12.8l-14.8-30.2c-1.9-3.6-3-5.9-7.1-8.1v-.3z"></path>
                  <path d="m441.2 56.6c.5-13.9-12-24.4-30.3-24.4-20 0-33.6 10.9-33.6 25.8 0 15 15.7 26.5 38.6 26.5 6.3 0 12.8-.8 18.6-2.7l6.7-10.1h-.4c-6.2 3.9-14 5.7-22.1 5.7-15.2 0-26.6-7.6-26.9-20.8zm-48.8-6.2c1.6-6.8 8.3-11.1 17.4-11.1 9.7 0 15.9 3.6 17.4 11.1z"></path>
                  <path d="m456.4 1.7c3.1 0 6.6.1 8.6-2h.4v69.7c0 5.7-.9 10.3 5 13.4v.4h-22.2v-.4c5.8-3.1 5-7.7 5-13.4v-54c0-5.7.8-10.3-5-13.4v-.3z"></path>
                  <path d="m486 1.7c3.1 0 6.6.1 8.6-2h.4v69.7c0 5.7-.9 10.3 5 13.4v.4h-22.2v-.4c5.8-3.1 5-7.7 5-13.4v-54c0-5.7.8-10.3-5-13.4v-.3z"></path>
                  <path d="m148.4 113.1h6.7v11.3h12.9v-11.3h6.7v30.2h-6.7v-13.1h-12.9v13.1h-6.7z"></path>
                  <path d="m187.7 128.2c0-2.4.4-4.6 1.2-6.6s1.9-3.6 3.4-5 3.2-2.4 5.2-3.2c2-.7 4.2-1.1 6.5-1.1 2.4 0 4.5.4 6.5 1.1s3.7 1.8 5.2 3.2 2.6 3.1 3.4 5c.8 2 1.2 4.2 1.2 6.6s-.4 4.6-1.2 6.6-1.9 3.6-3.4 5-3.2 2.4-5.2 3.2c-2 .7-4.2 1.1-6.5 1.1-2.4 0-4.5-.4-6.5-1.1s-3.7-1.8-5.2-3.2-2.6-3.1-3.4-5-1.2-4.1-1.2-6.6zm7 0c0 1.4.2 2.7.7 3.9.4 1.2 1.1 2.2 1.9 3.1s1.8 1.5 3 2 2.4.7 3.9.7c1.4 0 2.7-.2 3.9-.7s2.1-1.2 3-2c.8-.9 1.5-1.9 1.9-3.1s.7-2.5.7-3.9-.2-2.7-.7-3.9c-.4-1.2-1.1-2.2-1.9-3.1s-1.8-1.5-3-2-2.4-.7-3.9-.7c-1.4 0-2.7.2-3.9.7s-2.1 1.2-3 2c-.8.9-1.5 1.9-1.9 3.1-.5 1.2-.7 2.5-.7 3.9z"></path>
                  <path d="m239.3 119h-8.6v-5.9h23.9v5.9h-8.6v24.3h-6.7z"></path>
                  <path d="m266.8 113.1h20.5v6.2h-13.9v5.6h13.1v6.2h-13.1v6.2h14.7v6.2h-21.3z"></path>
                  <path d="m302.2 113.1h6.7v24.1h12.3v6.2h-19z"></path>
                  <path d="m348.4 120.5c-.5-.7-1.3-1.2-2.2-1.5s-1.8-.5-2.6-.5c-.5 0-1 .1-1.5.2s-1 .3-1.5.5-.8.6-1.1 1-.4.9-.4 1.5c0 .9.3 1.6 1 2.1s1.5.9 2.6 1.2c1 .3 2.2.7 3.4 1s2.3.8 3.4 1.5c1 .6 1.9 1.5 2.6 2.5.7 1.1 1 2.5 1 4.2s-.3 3.1-.9 4.4-1.5 2.3-2.5 3.1c-1.1.8-2.3 1.4-3.7 1.8s-2.9.6-4.5.6c-2 0-3.8-.3-5.5-.9s-3.2-1.6-4.7-2.9l4.7-5.2c.7.9 1.5 1.6 2.6 2.1 1 .5 2.1.7 3.2.7.5 0 1.1-.1 1.6-.2.6-.1 1.1-.3 1.5-.6s.8-.6 1.1-1 .4-.9.4-1.4c0-.9-.3-1.6-1-2.2-.7-.5-1.6-1-2.6-1.3-1.1-.4-2.2-.7-3.4-1.1s-2.4-.9-3.4-1.5c-1.1-.6-1.9-1.5-2.6-2.5s-1-2.4-1-4.1c0-1.6.3-3 1-4.3.6-1.2 1.5-2.2 2.6-3.1 1.1-.8 2.3-1.4 3.7-1.9 1.4-.4 2.8-.6 4.3-.6 1.7 0 3.4.2 5 .7s3 1.3 4.3 2.4z"></path>
                </g>
              </svg>
            </Link>
          </div>
          <div className={`flex flex-row gap-6 items-center`}>
            <Link href="#" className={"hover: underline h-min"}>
              Facebook
            </Link>
            <Link href="#" className={"hover: underline h-min"}>
              Linkedin
            </Link>
            <Link href="#" className={"hover: underline h-min"}>
              Instagram
            </Link>
          </div>
          <div></div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
