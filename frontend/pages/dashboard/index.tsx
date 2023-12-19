import "@/app/globals.css";
import Button from "@/components/button/Button";
import BookingList from "@/components/cms/bookingList/BookingList";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Spinner from "@/components/spinner/Spinner";
import Heading from "@/components/text/heading/Heading";
import Link from "next/link";

import React from "react";
import { useEffect, useState } from "react";

function Index() {
  const [areBookingsLoading, setAreBookingsLoading] = useState(false);
  const [bookings, setBookings] = useState<any[]>();

  useEffect(() => {
    setAreBookingsLoading(true);
    fetch("http://localhost:5000/bookings")
      .then((response) => response.json())
      .then((data: any[]) => {
        setBookings(data);
        setAreBookingsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardWrapper active="overview">
      <div className={`grid grid-cols-2 gap-4`}>
        <section className={`w-full h-36 col-span-2`}>Hello whatever</section>
        <section
          className={`w-full bg-slate-50 rounded-lg  px-2 lg:px-8 py-4 flex flex-col lg:col-span-2`}
        >
          <header className={`flex flex-row justify-between items-center`}>
            <Heading size={4} styles="text-charcoal-80">
              Recent bookings
            </Heading>
            <Link
              href="/dashboard/bookings"
              className="h-8 w-8 sm:h-auto sm:w-auto text-slate-50 bg-sea-80 px-2 lg:px-4 py-1 rounded-full transition group hover:bg-sea-100 flex gap-2 items-center justify-center"
            >
              <p className={`hidden sm:flex`}>See all</p>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.78353 7.3707L0.0263517 13.1279L0.898475 14L7.47497 7.4235L0.924827 8.08509e-08L1.15258e-06 0.816023L5.78353 7.3707Z"
                  fill="#F6F4F3"
                />
              </svg>
            </Link>
          </header>
          {areBookingsLoading && <Spinner />}
          {!areBookingsLoading && bookings && bookings.length === 0 ? (
            <p
              className={`flex w-full justify-center p-4 font-semibold text-sea-60`}
            >
              No bookings found
            </p>
          ) : (
            <BookingList bookings={bookings} />
          )}
        </section>
        <section
          className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 xl:px-8 py-4 flex flex-col col-span-2 xl:col-span-1`}
        >
          <header className={`flex flex-row justify-between items-center`}>
            <Heading size={4} styles="text-charcoal-80">
              Hotels
            </Heading>
            <Link
              href="/dashboard/bookings"
              className="h-8 w-8 sm:h-auto sm:w-auto text-slate-50 bg-sea-80 px-2 lg:px-4 py-1 rounded-full transition group hover:bg-sea-100 flex gap-2 items-center justify-center"
            >
              <p className={`hidden sm:flex`}>See all</p>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.78353 7.3707L0.0263517 13.1279L0.898475 14L7.47497 7.4235L0.924827 8.08509e-08L1.15258e-06 0.816023L5.78353 7.3707Z"
                  fill="#F6F4F3"
                />
              </svg>
            </Link>
          </header>
        </section>
        <section
          className={`w-full bg-slate-50 rounded-lg px-2 lg:px-8 py-4 flex flex-col col-span-2 xl:col-span-1 row-span-2`}
        >
          <header className={`flex flex-row justify-between items-center`}>
            <Heading size={4} styles="text-charcoal-80">
              Rooms
            </Heading>
            <Link
              href="/dashboard/bookings"
              className="h-8 w-8 sm:h-auto sm:w-auto text-slate-50 bg-sea-80 px-2 lg:px-4 py-1 rounded-full transition group hover:bg-sea-100 flex gap-2 items-center justify-center"
            >
              <p className={`hidden sm:flex`}>See all</p>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.78353 7.3707L0.0263517 13.1279L0.898475 14L7.47497 7.4235L0.924827 8.08509e-08L1.15258e-06 0.816023L5.78353 7.3707Z"
                  fill="#F6F4F3"
                />
              </svg>
            </Link>
          </header>
        </section>
        <section
          className={`w-full bg-slate-50 rounded-lg  px-2 lg:px-8 py-4 flex flex-col col-span-1 col-span-2 xl:col-span-1`}
        >
          <header className={`flex flex-row justify-between items-center`}>
            <Heading size={4} styles="text-charcoal-80">
              Experiences
            </Heading>
            <Link
              href="/dashboard/bookings"
              className="h-8 w-8 sm:h-auto sm:w-auto text-slate-50 bg-sea-80 px-2 lg:px-4 py-1 rounded-full transition group hover:bg-sea-100 flex gap-2 items-center justify-center"
            >
              <p className={`hidden sm:flex`}>See all</p>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.78353 7.3707L0.0263517 13.1279L0.898475 14L7.47497 7.4235L0.924827 8.08509e-08L1.15258e-06 0.816023L5.78353 7.3707Z"
                  fill="#F6F4F3"
                />
              </svg>
            </Link>
          </header>
        </section>
      </div>
    </DashboardWrapper>
  );
}

export default Index;
