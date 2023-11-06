import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/img/comwell-logo.svg";
import chevronIcon from "../../public/img/chevron.svg";
import profileIcon from "../../public/img/profile-icon.svg";
import menuIcon from "../../public/img/menu-icon.svg";

type Props = {
  children?: React.ReactNode;
};

function Header(props: Props) {
  let windowPosition = 0;

  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position
    windowPosition = scrollPosition;
    console.log(windowPosition);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-8 fixed top-0 w-full justify-center items-center flex z-50 h-[84px] justify-self-center right-2/4 translate-x-2/4 lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl `}
    >
      <div className={`grid grid-cols-2 lg:grid-cols-3 w-full`}>
        <section className={`flex items-center`}>
          <Link href="/">
            <Image
              src={logo}
              alt="comwell hotels logo"
              width={120}
              height={35}
              className={`max-w-fit w-full h-10`}
            />
          </Link>
        </section>
        <section className={`hidden lg:flex`}>
          {/* booking widget */}
          {props.children}
        </section>
        <nav className={`flex justify-end`}>
          <ul
            className={`flex flex-row items-center justify-end gap-8 font-sans font-semibold`}
          >
            <li className={`cursor-pointer`}>
              <div
                className={`flex flex-row gap-1.5 justify-center items-center`}
              >
                Locations
                <Image src={chevronIcon} alt="icon" width={16} height={16} />
              </div>
            </li>
            <li className={`cursor-pointer`}>
              <div
                className={`flex flex-row gap-1.5 justify-center items-center`}
              >
                Profile
                <Image src={profileIcon} alt="icon" width={16} height={16} />
              </div>
            </li>
            <li className={`cursor-pointer`}>
              <div
                className={`flex flex-row gap-1.5 justify-center items-center`}
              >
                Menu
                <Image src={menuIcon} alt="icon" width={16} height={16} />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
