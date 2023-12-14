import "@/app/globals.css";
import { useState } from "react";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  active?:
    | "overview"
    | "bookings"
    | "hotels"
    | "rooms"
    | "experiences"
    | "offers"
    | "users";
};

function DashboardWrapper(props: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);

  return (
    <section className={`md:flex transition`}>
      <span
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        className={`flex absolute z-50 top-4 right-4 md:hidden p-2 cursor-pointer bg-sea-20 rounded-full`}
      >
        {isMenuVisible ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`fill-charcoal-80`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.0607 12.0001L20.0154 5.04528L18.9548 3.98462L12 10.9394L5.04521 3.98462L3.98455 5.04528L10.9393 12.0001L3.39844 19.541L4.4591 20.6016L12 13.0607L19.5409 20.6016L20.6016 19.541L13.0607 12.0001Z"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`fill-charcoal-80`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 4.75H2V3.25H22V4.75ZM22 12.75H2V11.25H22V12.75ZM2 20.75H22V19.25H2V20.75Z"
            />
          </svg>
        )}
      </span>

      <nav
        className={`flex flex-col gap-8 w-full  h-screen fixed md:relative transition-all duration-300 ${
          isMenuExpanded ? "md:w-[340px]" : "md:w-[64px] md:pr-2"
        } md:pl-0 z-30 bg-slate-50 text-charcoal-80 fill-charcoal-80 pt-24 px-4 text-heading-medium-mobile font-medium ${
          isMenuVisible ? "translate-x-0" : "translate-x-full md:translate-x-0 "
        } md:border-r`}
      >
        <span
          className={`hidden md:flex absolute top-8 cursor-pointer transition-all duration-500 rounded-full p-2 hover:bg-sea-20 ${
            !isMenuExpanded ? "right-3" : "right-8"
          }`}
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition duration-300 fill-charcoal-80 ${
              isMenuExpanded ? "" : "rotate-180"
            }`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.02855 11.5322L16.0303 4.53039L14.9697 3.46973L6.97145 11.4679L14.9376 20.4963L16.0624 19.5038L9.02855 11.5322Z"
            />
          </svg>
        </span>
        <Link
          href="#"
          className={`flex flex-row gap-2 align-center md:p-2 md:pl-4 md:rounded-r-full transition-all duration-300 hover:bg-sea-20 group ${
            !isMenuExpanded ? "justify-center md:pl-6" : "justify-start"
          } ${
            props.active === "overview"
              ? "md:bg-sea-80 md:text-slate-50 hover:text-charcoal-80 duration-300"
              : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`min-w-[30px] min-h-[30px] flex transition duration-300 ${
              props.active === "overview" ? "md:fill-slate-50" : ""
            } fill-charcoal-80 group-hover:fill-charcoal-80`}
          >
            <path d="M12.4592 1.66043C12.3261 1.55655 12.1621 1.50012 11.9932 1.50012C11.8243 1.50012 11.6603 1.55655 11.5272 1.66043L0.75 10.0646L1.68203 11.2434L3 10.2158V19.5001C3.00081 19.8977 3.15911 20.2787 3.44024 20.5598C3.72137 20.841 4.10242 20.9993 4.5 21.0001H19.5C19.8976 20.9993 20.2787 20.8411 20.5599 20.5599C20.841 20.2788 20.9993 19.8977 21 19.5001V10.2226L22.318 11.2501L23.25 10.0712L12.4592 1.66043ZM13.5 19.5001H10.5V13.5001H13.5V19.5001ZM15 19.5001V13.5001C14.9995 13.1024 14.8414 12.7211 14.5602 12.4399C14.279 12.1587 13.8977 12.0005 13.5 12.0001H10.5C10.1023 12.0005 9.721 12.1586 9.43978 12.4399C9.15856 12.7211 9.0004 13.1024 9 13.5001V19.5001H4.5V9.04621L12 3.20371L19.5 9.05408V19.5001H15Z" />
          </svg>
          <p
            className={`flex items-center transition-all duration-500 ${
              isMenuExpanded ? "w-full" : "w-0 overflow-hidden"
            }`}
          >
            Overview
          </p>
        </Link>
        <Link
          href="#"
          className={`flex flex-row gap-2 align-center md:p-2 md:pl-4 md:rounded-r-full transition-all duration-300 hover:bg-sea-20 group ${
            !isMenuExpanded ? "justify-center md:pl-6" : "justify-start"
          } ${
            props.active === "bookings"
              ? "md:bg-sea-80 md:text-slate-50 hover:text-charcoal-80 duration-300"
              : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`min-w-[30px] min-h-[30px] flex transition duration-300 ${
              props.active === "bookings" ? "md:fill-slate-50" : ""
            } fill-charcoal-80 group-hover:fill-charcoal-80`}
          >
            <path d="M19.5 3H16.5V1.5H15V3H9V1.5H7.5V3H4.5C3.675 3 3 3.675 3 4.5V19.5C3 20.325 3.675 21 4.5 21H19.5C20.325 21 21 20.325 21 19.5V4.5C21 3.675 20.325 3 19.5 3ZM19.5 19.5H4.5V9H19.5V19.5ZM19.5 7.5H4.5V4.5H7.5V6H9V4.5H15V6H16.5V4.5H19.5V7.5Z" />
          </svg>
          <p
            className={`flex items-center transition-all duration-500 ${
              isMenuExpanded ? "w-full" : "w-0 overflow-hidden"
            }`}
          >
            Bookings
          </p>
        </Link>
        <Link
          href="#"
          className={`flex flex-row gap-2 align-center md:p-2 md:pl-4 md:rounded-r-full transition-all duration-300 hover:bg-sea-20 group ${
            !isMenuExpanded ? "justify-center md:pl-6" : "justify-start"
          } ${
            props.active === "hotels"
              ? "md:bg-sea-80 md:text-slate-50 hover:text-charcoal-80 duration-300"
              : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`min-w-[30px] min-h-[30px] flex transition duration-300 ${
              props.active === "hotels" ? "md:fill-slate-50" : ""
            } fill-charcoal-80 group-hover:fill-charcoal-80`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.4655 2.3877C12.1697 2.25325 11.8303 2.25325 11.5345 2.3877L3.65947 5.96725C3.25785 6.1498 3 6.55025 3 6.99141V19.8749C3 20.4963 3.50368 20.9999 4.125 20.9999H19.875C20.4963 20.9999 21 20.4963 21 19.8749V6.99141C21 6.55025 20.7421 6.1498 20.3405 5.96725L12.4655 2.3877ZM4.5 7.23288L12 3.82379L19.5 7.23288V8.24991H15.5342L12.4569 6.88224C12.166 6.75296 11.834 6.75296 11.5431 6.88224L8.46584 8.24991H4.5V7.23288ZM4.5 9.74991V19.4999H9V14.2499H15V19.4999H19.5V9.74991H15.4546C15.2972 9.74991 15.1415 9.71688 14.9977 9.65295L12 8.32065L9.00233 9.65295C8.85848 9.71688 8.70283 9.74991 8.54542 9.74991H4.5ZM10.5 15.7499V19.4999H13.5V15.7499H10.5ZM7.5 11.2499H6V12.7499H7.5V11.2499ZM6 15.7499H7.5V17.2499H6V15.7499ZM12.75 12.7499V11.2499H11.25V12.7499H12.75ZM16.5 11.2499H18V12.7499H16.5V11.2499ZM18 15.7499H16.5V17.2499H18V15.7499Z"
            />
          </svg>
          <p
            className={`flex items-center transition-all duration-500 ${
              isMenuExpanded ? "w-full" : "w-0 overflow-hidden"
            }`}
          >
            Hotels
          </p>
        </Link>
        <Link
          href="#"
          className={`flex flex-row gap-2 align-center md:p-2 md:pl-4 md:rounded-r-full transition-all duration-300 hover:bg-sea-20 group ${
            !isMenuExpanded ? "justify-center md:pl-6" : "justify-start"
          } ${
            props.active === "rooms"
              ? "md:bg-sea-80 md:text-slate-50 hover:text-charcoal-80 duration-300"
              : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`min-w-[30px] min-h-[30px] flex transition duration-300 ${
              props.active === "rooms" ? "md:fill-slate-50" : ""
            } fill-charcoal-80 group-hover:fill-charcoal-80`}
          >
            <path d="M18.75 7.5H12.75C12.3523 7.50046 11.9711 7.65864 11.6898 7.93984C11.4086 8.22105 11.2505 8.60232 11.25 9V13.5H3V4H1.5V21H3V15H21V21H22.5V11.25C22.4988 10.2558 22.1034 9.30265 21.4004 8.59964C20.6973 7.89664 19.7442 7.50117 18.75 7.5ZM21 13.5H12.75V9H18.75C19.3465 9.00066 19.9185 9.23792 20.3403 9.65973C20.7621 10.0815 20.9993 10.6535 21 11.25V13.5Z" />
            <path d="M7.125 8.25C7.3475 8.25 7.56501 8.31598 7.75002 8.4396C7.93502 8.56321 8.07922 8.73891 8.16436 8.94448C8.24951 9.15005 8.27179 9.37625 8.22838 9.59448C8.18498 9.81271 8.07783 10.0132 7.9205 10.1705C7.76316 10.3278 7.56271 10.435 7.34448 10.4784C7.12625 10.5218 6.90005 10.4995 6.69448 10.4144C6.48891 10.3292 6.31321 10.185 6.1896 10C6.06598 9.81501 6 9.5975 6 9.375C6.00034 9.07674 6.11897 8.79078 6.32988 8.57988C6.54078 8.36897 6.82674 8.25034 7.125 8.25ZM7.125 6.75C6.60582 6.75 6.09831 6.90395 5.66663 7.19239C5.23495 7.48083 4.8985 7.8908 4.69982 8.37046C4.50114 8.85011 4.44915 9.37791 4.55044 9.88711C4.65173 10.3963 4.90173 10.864 5.26884 11.2312C5.63596 11.5983 6.10369 11.8483 6.61289 11.9496C7.12209 12.0508 7.64989 11.9989 8.12954 11.8002C8.6092 11.6015 9.01917 11.2651 9.30761 10.8334C9.59605 10.4017 9.75 9.89418 9.75 9.375C9.75 8.67881 9.47344 8.01113 8.98116 7.51884C8.48887 7.02656 7.82119 6.75 7.125 6.75Z" />
          </svg>
          <p
            className={`flex items-center transition-all duration-500 ${
              isMenuExpanded ? "w-full" : "w-0 overflow-hidden"
            }`}
          >
            Rooms
          </p>
        </Link>
        <Link
          href="#"
          className={`flex flex-row gap-2 align-center md:p-2 md:pl-4 md:rounded-r-full transition-all duration-300 hover:bg-sea-20 group ${
            !isMenuExpanded ? "justify-center md:pl-6" : "justify-start"
          } ${
            props.active === "experiences"
              ? "md:bg-sea-80 md:text-slate-50 hover:text-charcoal-80 duration-300"
              : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`min-w-[30px] min-h-[30px] flex transition duration-300 ${
              props.active === "experiences" ? "md:fill-slate-50" : ""
            } fill-charcoal-80 group-hover:fill-charcoal-80`}
          >
            <path d="M19.5 7.25073H17.4287C17.9169 6.52921 18.1062 5.6465 17.9569 4.78825C17.8076 3.93 17.3313 3.1631 16.6281 2.64886C15.9249 2.13461 15.0497 1.91311 14.1866 2.03093C13.3234 2.14875 12.5396 2.59672 12 3.2806C11.4592 2.6001 10.6761 2.15523 9.8146 2.03917C8.95315 1.92311 8.08021 2.14486 7.37858 2.65797C6.67696 3.17108 6.20107 3.93576 6.05059 4.79187C5.9001 5.64797 6.08669 6.5291 6.57127 7.25073H4.5C4.10233 7.25122 3.72109 7.40942 3.43989 7.69061C3.15869 7.97181 3.0005 8.35305 3 8.75073V11.7507C3.0005 12.1484 3.15869 12.5296 3.43989 12.8108C3.72109 13.092 4.10233 13.2502 4.5 13.2507V20.7507C4.5005 21.1484 4.65869 21.5296 4.93989 21.8108C5.22109 22.092 5.60233 22.2502 6 22.2507H18C18.3977 22.2502 18.7789 22.092 19.0601 21.8108C19.3413 21.5296 19.4995 21.1484 19.5 20.7507V13.2507C19.8977 13.2502 20.2789 13.092 20.5601 12.8108C20.8413 12.5296 20.9995 12.1484 21 11.7507V8.75073C20.9995 8.35305 20.8413 7.97181 20.5601 7.69061C20.2789 7.40942 19.8977 7.25122 19.5 7.25073ZM12.75 5.37573C12.75 5.00489 12.86 4.64237 13.066 4.33403C13.272 4.02569 13.5649 3.78537 13.9075 3.64345C14.2501 3.50154 14.6271 3.46441 14.9908 3.53675C15.3545 3.6091 15.6886 3.78768 15.9508 4.0499C16.213 4.31212 16.3916 4.64622 16.464 5.00993C16.5363 5.37365 16.4992 5.75065 16.3573 6.09326C16.2154 6.43587 15.975 6.7287 15.6667 6.93473C15.3584 7.14076 14.9958 7.25073 14.625 7.25073H12.75V5.37573ZM9.375 3.50073C9.8721 3.50132 10.3487 3.69906 10.7002 4.05056C11.0517 4.40206 11.2494 4.87863 11.25 5.37573V7.25073H9.375C8.87772 7.25073 8.40081 7.05318 8.04917 6.70155C7.69754 6.34992 7.5 5.87301 7.5 5.37573C7.5 4.87845 7.69754 4.40153 8.04917 4.0499C8.40081 3.69827 8.87772 3.50073 9.375 3.50073ZM4.5 8.75073H11.25V11.7507H4.5V8.75073ZM6 13.2507H11.25V20.7507H6V13.2507ZM18.0009 20.7507H12.75V13.2507H18L18.0009 20.7507ZM12.75 11.7507V8.75073H19.5L19.5009 11.7507H12.75Z" />
          </svg>
          <p
            className={`flex items-center transition-all duration-500 ${
              isMenuExpanded ? "w-full" : "w-0 overflow-hidden"
            }`}
          >
            Experiences
          </p>
        </Link>
        <Link
          href="#"
          className={`flex flex-row gap-2 align-center md:p-2 md:pl-4 md:rounded-r-full transition-all duration-300 hover:bg-sea-20 group ${
            !isMenuExpanded ? "justify-center md:pl-6" : "justify-start"
          } ${
            props.active === "offers"
              ? "md:bg-sea-80 md:text-slate-50 hover:text-charcoal-80 duration-300"
              : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`min-w-[30px] min-h-[30px] flex transition duration-300 ${
              props.active === "offers" ? "md:fill-slate-50" : ""
            } fill-charcoal-80 group-hover:fill-charcoal-80`}
          >
            <path d="M21.75 10.5C21.9489 10.5 22.1397 10.421 22.2803 10.2803C22.421 10.1397 22.5 9.94891 22.5 9.75V6C22.5 5.60218 22.342 5.22064 22.0607 4.93934C21.7794 4.65804 21.3978 4.5 21 4.5H3C2.60218 4.5 2.22064 4.65804 1.93934 4.93934C1.65804 5.22064 1.5 5.60218 1.5 6V9.75C1.5 9.94891 1.57902 10.1397 1.71967 10.2803C1.86032 10.421 2.05109 10.5 2.25 10.5C2.64782 10.5 3.02936 10.658 3.31066 10.9393C3.59196 11.2206 3.75 11.6022 3.75 12C3.75 12.3978 3.59196 12.7794 3.31066 13.0607C3.02936 13.342 2.64782 13.5 2.25 13.5C2.05109 13.5 1.86032 13.579 1.71967 13.7197C1.57902 13.8603 1.5 14.0511 1.5 14.25V18C1.5 18.3978 1.65804 18.7794 1.93934 19.0607C2.22064 19.342 2.60218 19.5 3 19.5H21C21.3978 19.5 21.7794 19.342 22.0607 19.0607C22.342 18.7794 22.5 18.3978 22.5 18V14.25C22.5 14.0511 22.421 13.8603 22.2803 13.7197C22.1397 13.579 21.9489 13.5 21.75 13.5C21.3522 13.5 20.9706 13.342 20.6893 13.0607C20.408 12.7794 20.25 12.3978 20.25 12C20.25 11.6022 20.408 11.2206 20.6893 10.9393C20.9706 10.658 21.3522 10.5 21.75 10.5ZM21 14.9025V18H15.75V15.75H14.25V18H3V14.9025C3.642 14.7347 4.21025 14.3588 4.61582 13.8336C5.02139 13.3084 5.24139 12.6636 5.24139 12C5.24139 11.3364 5.02139 10.6916 4.61582 10.1664C4.21025 9.64121 3.642 9.2653 3 9.0975V6H14.25V8.25H15.75V6H21V9.0975C20.358 9.2653 19.7898 9.64121 19.3842 10.1664C18.9786 10.6916 18.7586 11.3364 18.7586 12C18.7586 12.6636 18.9786 13.3084 19.3842 13.8336C19.7898 14.3588 20.358 14.7347 21 14.9025Z" />
            <path d="M15.75 9.75H14.25V14.25H15.75V9.75Z" />
          </svg>

          <p
            className={`flex items-center transition-all duration-500 ${
              isMenuExpanded ? "w-full" : "w-0 overflow-hidden"
            }`}
          >
            Offers
          </p>
        </Link>
        <Link
          href="#"
          className={`flex flex-row gap-2 align-center md:p-2 md:pl-4 md:rounded-r-full transition-all duration-300 hover:bg-sea-20 group ${
            !isMenuExpanded ? "justify-center md:pl-6" : "justify-start"
          } ${
            props.active === "users"
              ? "md:bg-sea-80 md:text-slate-50 hover:text-charcoal-80 duration-300"
              : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`min-w-[30px] min-h-[30px] flex transition duration-300 ${
              props.active === "users" ? "md:fill-slate-50" : ""
            } fill-charcoal-80 group-hover:fill-charcoal-80`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5834 3.63199C13.9667 3.21993 13.2417 3 12.5 3C11.5054 3 10.5516 3.39509 9.84835 4.09835C9.14509 4.80161 8.75 5.75544 8.75 6.75C8.75 7.49168 8.96993 8.2167 9.38199 8.83339C9.79404 9.45007 10.3797 9.93072 11.0649 10.2145C11.7502 10.4984 12.5042 10.5726 13.2316 10.4279C13.959 10.2833 14.6272 9.9261 15.1517 9.40165C15.6761 8.8772 16.0333 8.20902 16.1779 7.48159C16.3226 6.75416 16.2484 6.00016 15.9645 5.31494C15.6807 4.62971 15.2001 4.04404 14.5834 3.63199ZM9.58326 2.38478C10.4466 1.80791 11.4616 1.5 12.5 1.5C13.8924 1.5 15.2277 2.05312 16.2123 3.03769C17.1969 4.02226 17.75 5.35761 17.75 6.75C17.75 7.78835 17.4421 8.80339 16.8652 9.66674C16.2883 10.5301 15.4684 11.203 14.5091 11.6004C13.5498 11.9977 12.4942 12.1017 11.4758 11.8991C10.4574 11.6966 9.52192 11.1965 8.78769 10.4623C8.05346 9.72808 7.55345 8.79262 7.35088 7.77422C7.14831 6.75582 7.25227 5.70022 7.64963 4.74091C8.04699 3.7816 8.7199 2.96166 9.58326 2.38478ZM19 22.5H20V18.75C20 17.3576 19.4469 16.0223 18.4623 15.0377C17.4777 14.0531 16.1424 13.5 14.75 13.5H10.25C8.85761 13.5 7.52226 14.0531 6.53769 15.0377C5.55312 16.0223 5 17.3576 5 18.75V22.5H6H6.5H18.5H19ZM18.5 21V18.75C18.5 18.2575 18.403 17.7699 18.2145 17.3149C18.0261 16.86 17.7499 16.4466 17.4017 16.0983C17.0534 15.7501 16.64 15.4739 16.1851 15.2855C15.7301 15.097 15.2425 15 14.75 15H10.25C9.25544 15 8.30161 15.3951 7.59835 16.0983C6.89509 16.8016 6.5 17.7554 6.5 18.75V21H18.5Z"
            />
          </svg>
          <p
            className={`flex items-center transition-all duration-500 ${
              isMenuExpanded ? "w-full" : "w-0 overflow-hidden"
            }`}
          >
            Users
          </p>
        </Link>
      </nav>
      <main className={`p-4 lg:p-8`}>{props.children}</main>
    </section>
  );
}

export default DashboardWrapper;
