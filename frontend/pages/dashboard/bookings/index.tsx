import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Spinner from "@/components/spinner/Spinner";
import Heading from "@/components/text/heading/Heading";
import { HotelBooking } from "@/utils/Booking.types";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/button/Button";
import BookingList from "@/components/cms/bookingList/BookingList";
import { Hotel } from "@/utils/Hotel.types";

function Page() {
  const [bookings, setBookings] = useState<HotelBooking[]>();
  const [areBookingsLoading, setAreBookingsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalState, setModalState] = useState("confirmation");
  const [modalBooking, setModalBooking] = useState<HotelBooking>();
  const [hotels, setHotels] = useState<Hotel[]>();

  useEffect(() => {
    setAreBookingsLoading(true);
    fetch("http://localhost:5000/bookings")
      .then((response) => response.json())
      .then((data: HotelBooking[]) => {
        console.log(data);
        setBookings(data);
        setAreBookingsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:5000/hotels")
      .then((response) => response.json())
      .then((data: Hotel[]) => {
        console.log(data);
        setHotels(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteBookingRequest(id: string) {
    const options = {
      method: "DELETE",
    };
    fetch(`http://localhost:5000/bookings/${id}`, options)
      .then((response) => response.json())
      .then((res) => {
        setModalState("finished");
        // remove booking from fetched bookings to decrease amount of requests (refetch)
        setBookings(bookings?.filter((booking) => booking._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteBooking(booking: HotelBooking) {
    setIsModalVisible(true);
    setModalState("delete");
    setModalBooking(booking);
  }

  return (
    <>
      <div
        className={`fixed w-full h-screen z-50 items-center justify-center bg-sea-80 bg-opacity-50 p-4 ${
          isModalVisible && modalBooking ? "flex" : "hidden"
        }`}
      >
        <div className={`flex flex-col gap-4 bg-white p-8 rounded-lg `}>
          {modalState == "delete" && modalBooking && (
            <>
              <Heading size={4}>Delete booking</Heading>
              <p>{`Are you sure you want to delete booking #${modalBooking?._id} ?`}</p>
              <div
                className={`flex flex-row gap-2 justify-between items-center mt-4`}
              >
                <Button
                  color="outline"
                  isActive
                  isSmall
                  onClick={() => {
                    setModalBooking(undefined);
                    setIsModalVisible(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="sea"
                  isActive
                  isSmall
                  onClick={() => {
                    deleteBookingRequest(modalBooking._id);
                  }}
                >
                  Delete booking
                </Button>
              </div>
            </>
          )}
          {modalState == "finished" && (
            <>
              <Heading size={4}>Delete booking</Heading>
              <p>{`Booking was deleted successfully.`}</p>
              <div
                className={`flex flex-row gap-2 justify-center items-center mt-4`}
              >
                <Button
                  color="outline"
                  isActive
                  isSmall
                  onClick={() => {
                    setModalBooking(undefined);
                    setIsModalVisible(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <DashboardWrapper active="bookings">
        <div className={`flex flex-row justify-between items-center mt-8`}>
          <Heading size={3} styles={`my-8`}>
            Bookings
          </Heading>
          <Link
            href={"/dashboard/bookings/add"}
            className={`flex flex-row py-2 px-6 rounded-full bg-sea-80 text-slate-50 hover:bg-sea-100 transition font-medium`}
          >
            Add new booking
          </Link>
        </div>
        <section
          className={`w-full bg-slate-50 rounded-lg px-2 lg:px-8 py-4 flex flex-col col-span-2`}
        >
          <section className={`flex flex-col gap-2 md:gap-4 `}>
            {!areBookingsLoading && bookings && bookings.length === 0 ? (
              <p
                className={`p-4 flex justify-center items-center font-semibold text-charcoal-60`}
              >
                No bookings found
              </p>
            ) : (
              <>
                {areBookingsLoading && <Spinner />}
                {bookings && (
                  <BookingList
                    bookings={bookings}
                    deleteBooking={deleteBooking}
                    hotels={hotels}
                  />
                )}
              </>
            )}
          </section>
        </section>
      </DashboardWrapper>
    </>
  );
}

export default Page;
