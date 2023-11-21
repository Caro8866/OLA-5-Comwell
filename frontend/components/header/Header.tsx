import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/img/comwell-logo.svg";
import chevronIcon from "../../public/img/chevron.svg";
import profileIcon from "../../public/img/profile-icon.svg";
import menuIcon from "../../public/img/menu-icon.svg";
import InputText from "../formField/InputText";
import BodyText from "../text/bodyText/BodyText";
import Button from "../button/Button";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Heading from "../text/heading/Heading";

type Props = {
  children?: React.ReactNode;
  locationsOnClick: () => void;
};

function Header(props: Props) {
  const headerTypes = {
    transparent: "bg-transparent duration-200",
    white: "bg-slate-50 duration-600",
  };

  const iconTypes = {
    transparent: "#fff",
    white: "#1d1d1b",
  };

  const textTypes = {
    transparent: "text-slate-50",
    white: "text-charcoal-80",
  };

  const [windowPosition, setWindowPosition] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [headerStyle, setHeaderStyle] = useState<"transparent" | "white">(
    "transparent"
  );
  const [isRegisterDrawerOpen, setIsRegisterDrawerOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const toggleRegisterDrawer = () => {
    setIsRegisterDrawerOpen((prevState) => !prevState);
  };

  const toggleMenuDrawer = () => {
    setIsMenuDrawerOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position
    setWindowPosition(scrollPosition);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (windowPosition > 150) {
      setHeaderStyle("white");
    } else {
      setHeaderStyle("transparent");
    }
  }, [windowPosition]);

  return (
    <>
      <header
        className={` px-4 fixed top-0 w-full justify-center items-center flex z-50 h-[84px] justify-self-center right-2/4 translate-x-2/4 border-box ${headerTypes[headerStyle]} transition z-50`}
      >
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl`}
        >
          <section className={`flex items-center`}>
            <Link href="/">
              <svg
                enableBackground="new 0 0 500 144"
                viewBox="0 0 500 144"
                xmlns="http://www.w3.org/2000/svg"
                className={`max-w-fit w-full h-10`}
              >
                <g fill={`${iconTypes[headerStyle]}`}>
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
          </section>
          <section className={`hidden lg:flex`}>
            {/* booking widget */}
            {props.children}
          </section>
          <nav className={`flex justify-end ${textTypes[headerStyle]}`}>
            <ul
              className={`flex flex-row items-center justify-end gap-8 font-sans font-semibold z-50`}
            >
              <li className={`cursor-pointer`} onClick={props.locationsOnClick}>
                <div
                  className={`flex flex-row gap-1.5 justify-center items-center`}
                >
                  Locations
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                    data-v-636226b5=""
                  >
                    <path
                      fill={iconTypes[headerStyle]}
                      fillRule="evenodd"
                      d="m3 3.94 3 3 3-3L10.06 5 6 9.06 1.94 5 3 3.94Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </li>
              <li className={`relative`}>
                <div
                  className={`flex flex-row gap-1.5 justify-center items-center cursor-pointer`}
                  onClick={() => {
                    if (isLoginVisible) {
                      setIsLoginVisible(false);
                      windowPosition < 150 && setHeaderStyle("transparent");
                    } else {
                      setIsLoginVisible(true);
                      setHeaderStyle("white");
                    }
                  }}
                >
                  Profile
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    className="w-5 lg:w-4"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fill={iconTypes[headerStyle]}
                      fillRule="evenodd"
                      d="M8.334.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM6.743 2.909a2.25 2.25 0 1 1 3.181 3.182 2.25 2.25 0 0 1-3.181-3.182Zm.09 5.841a3.75 3.75 0 0 0-3.75 3.75v2.75h10.501V12.5a3.75 3.75 0 0 0-3.75-3.75h-3Zm5.25 5V12.5a2.249 2.249 0 0 0-2.25-2.25h-3a2.25 2.25 0 0 0-2.25 2.25v1.25h7.5Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div
                  className={`absolute flex flex-col bg-slate-50 rounded-lg right-2/4 translate-x-2/4 top-16 ${
                    isLoginVisible ? "" : "hidden"
                  }`}
                >
                  <div className={`px-4 pt-6 pb-3 flex flex-col`}>
                    <InputText
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                      }}
                      value={loginEmail}
                      name="email"
                      id="email"
                      label="Email"
                    ></InputText>
                    <InputText
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                      }}
                      value={loginPassword}
                      name="password"
                      id="password"
                      label="Password"
                      isPassword
                      styles="mt-2"
                    ></InputText>
                    <BodyText
                      size={1}
                      styles="text-charcoal-60 mt-2 font-regular"
                    >
                      Forgot your password?
                    </BodyText>
                    <span
                      className={`text-sea-80 underline font-regular w-max cursor-pointer`}
                    >
                      Reset password
                    </span>
                    <BodyText
                      size={1}
                      styles="text-charcoal-60 mt-2 font-regular"
                    >
                      Don't have an account?
                    </BodyText>
                    <span
                      onClick={toggleRegisterDrawer}
                      className={`text-sea-80 underline font-regular w-max cursor-pointer`}
                    >
                      Sign up for Comwell club
                    </span>
                  </div>
                  <span
                    className={`pt-6 mt-2 border-t border-gray-300 px-6 pb-4`}
                  >
                    <Button
                      color={"sea"}
                      isActive={
                        loginPassword.length && loginEmail.length ? true : false
                      }
                      onClick={() => {
                        console.log("login handler");
                      }}
                      isFullWidth
                      styles={`text-heading-xsmall-desktop mb-2`}
                    >
                      Log in
                    </Button>
                  </span>
                </div>
              </li>
              <li
                className={`cursor-pointer`}
                onClick={() => {
                  toggleMenuDrawer();
                }}
              >
                <div
                  className={`flex flex-row gap-1.5 justify-center items-center`}
                >
                  Menu
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    className="w-5 lg:w-4"
                  >
                    <path
                      fill={iconTypes[headerStyle]}
                      fillRule="evenodd"
                      d="M14.667 3.416H1.333v-1.5h13.334v1.5Zm0 5.334H1.333v-1.5h13.334v1.5ZM1.333 14.084h13.334v-1.5H1.333v1.5Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Drawer
        open={isRegisterDrawerOpen}
        onClose={toggleRegisterDrawer}
        direction="right"
        customIdSuffix="registerForm"
        size="420px"
        className={`rounded-l-xl`}
      >
        <section className={`px-4 pt-8 flex flex-col flex-grow h-full`}>
          <Heading size={2} styles={"mb-4"}>
            Sign up for Comwell club
          </Heading>
          <BodyText size={1} styles={`mb-8 leading-snug font-medium`}>
            Become a member of Comwell Club for free and earn points everytime
            you stay with us. You'll also receive 25 points when you sign up
          </BodyText>
          <form className={`flex flex-col gap-4 mt-8 flex-grow h-full`}>
            <InputText
              onChange={(e) => {
                console.log(e.target.value);
              }}
              value=""
              id="name"
              name="name"
              label="Full name"
              styles={`w-96`}
            />
            <InputText
              onChange={(e) => {
                console.log(e.target.value);
              }}
              value=""
              id="email"
              name="email"
              label="Email"
              styles={`w-96`}
            />
            <InputText
              onChange={(e) => {
                console.log(e.target.value);
              }}
              value=""
              id="password"
              name="password"
              label="Password"
              styles={`w-96`}
            />
            <InputText
              onChange={(e) => {
                console.log(e.target.value);
              }}
              value=""
              id="password-confirmation"
              name="password-confirmation"
              label="Confirm password"
              styles={`w-96`}
            />
            <div className={`flex flex-row gap-4 justify-items-center mt-4`}>
              <input
                type="checkbox"
                id="termsAndConditions"
                name="terms"
                value="terms"
                className={`min-w-[1.5rem] min-h-[1.5rem] rounded-lg flex`}
              />
              <label
                htmlFor="termsAndConditions"
                className={`flex items-center`}
              >
                <BodyText size={1} styles={`leading-snug font-medium w-full`}>
                  Accept Terms an Conditions
                </BodyText>
              </label>
            </div>
            <div className={`flex flex-row gap-4 justify-items-center mt-4`}>
              <input
                type="checkbox"
                id="marketing"
                name="marketing"
                value="marketing"
                className={`min-w-[1.5rem] min-h-[1.5rem] rounded-lg flex`}
              />
              <label htmlFor="marketing" className={`flex items-center`}>
                <BodyText size={1} styles={`leading-snug font-medium`}>
                  I would like to be updated on current member offers, Comwell
                  Club surprises and other recommendations personalized to me. I
                  can unsubscribe again at any time.
                </BodyText>
              </label>
            </div>
            <div className={`flex-grow`}></div>
            <Button
              color="charcoal"
              isFullWidth
              styles={`self-end my-8 justify-self-end`}
            >
              Sign up
            </Button>
          </form>
        </section>
      </Drawer>
      <Drawer
        open={isMenuDrawerOpen}
        onClose={toggleMenuDrawer}
        direction="right"
        customIdSuffix="menuDrawer"
        size="80vw"
        className={`rounded-l-xl`}
      >
        <nav className={`flex flex-col pt-8 pb-4 pl-12 h-full`}>
          <section>{/*Section for searchbar */}</section>
          <section
            className={`flex flex-col gap-4 py-8 mb-4 text-heading-huge-desktop font-semibold hover:text-charcoal-40`}
          >
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Hotels
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Packages
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Meeting & Conference
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Restaurant & Events
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Spa
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Contact
            </Link>
          </section>
          <section
            className={`flex flex-col gap-4 pb-8 pt-12  text-heading-small-desktop font-semibold hover:text-charcoal-40 border-t`}
          >
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              To Comwell.com
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              News
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Comwell club
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Gift Cards
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Corporate Agreement
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              About Comwell
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Job & Career
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Global frontpage
            </Link>
          </section>
          <div className={`flex-grow`}></div>
          <section
            className={`flex flex-row gap-4 pt-4 text-body-large font-semibold hover:text-charcoal-40 border-t justify-self-end`}
          >
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Facebook{" "}
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              LinkedIn
            </Link>
            <Link href="#" className={`transition hover:text-charcoal-100`}>
              Instagram
            </Link>
          </section>
        </nav>
      </Drawer>
      <div
        className={`w-full h-screen fixed bg-sea-80 bg-opacity-60 z-40 transition ${
          isLoginVisible ? "" : "hidden"
        }`}
        onClick={() => {
          setIsLoginVisible(false);
          windowPosition < 150 && setHeaderStyle("transparent");
        }}
      ></div>
    </>
  );
}

export default Header;
