import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Heading from "@/components/text/heading/Heading";
import InputField from "@/components/formField/InputField";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/button/Button";
import Link from "next/link";
import { HotelBooking } from "@/utils/Booking.types";
import { HotelPackage } from "@/utils/HotelPackage.types";
import { Hotel } from "@/utils/Hotel.types";
import { HotelRoom } from "@/utils/HotelRoom.types";
import InputSelect from "@/components/formField/InputSelect";

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [isBookingDataLoading, setIsBookingDataLoading] = useState(false);
  const [bookingData, setBookingData] = useState<HotelBooking>();
  const [formData, setFormData] = useState<HotelBooking>({
    _id: "string",
    addons: [],
    booker: {
      _id: "string",
      email: "string",
      fullName: "string",
      phone: 0,
    },
    bookingType: "",
    checkInDate: "",
    checkOutDate: "",
    comment: "",
    discount: 0,
    guest: {
      _id: "",
      email: "",
      fullName: "",
      phone: 0,
      address: "",
    },
    hotelId: "",
    hotelPackageId: "",
    peopleCount: {
      adults: 0,
      children: 0,
      infants: 0,
    },
    price: 0,
    rooms: [],
    termsAccepted: true,
  });
  const [hotels, setHotels] = useState<Hotel[]>();
  const [packages, setPackages] = useState<HotelPackage[]>();
  const [hotelData, setHotelData] = useState<Hotel>();
  const [packageData, setPackageData] = useState<HotelPackage>();
  const [isHotelDataLoading, setIsHotelDataLoading] = useState(false);
  const [isPackageDataLoading, setIsPackageDataLoading] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    setIsBookingDataLoading(true);
    const fetchData = async () => {
      fetch(`http://localhost:5000/bookings/${slug}`)
        .then((response) => response.json())
        .then((data: HotelBooking) => {
          console.log(data);
          setBookingData(data);
          setFormData(data);
          setIsBookingDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      setIsHotelDataLoading(true);
      fetch(`http://localhost:5000/hotels/`)
        .then((response) => response.json())
        .then((data: Hotel[]) => {
          setHotels(data);
          setIsHotelDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      setIsPackageDataLoading(true);
      fetch(`http://localhost:5000/packages/`)
        .then((response) => response.json())
        .then((data: HotelPackage[]) => {
          setPackages(data);
          setIsPackageDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  function updateBooking() {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:5000/bookings/${slug}`, options)
      .then((response) => response.json())
      .then((data) => {
        setModalContent("update");
        setIsModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteBooking() {
    const options = {
      method: "DELETE",
    };
    fetch(`http://localhost:5000/bookings/${slug}`, options)
      .then((response) => response.json())
      .then((res) => {
        setModalContent("delete");
        setIsModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const update = {
    name: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        name: value,
      })),
    price: (value: string) => {
      let convertedValue: number;
      if (value === "") {
        convertedValue = 0;
      } else {
        convertedValue = parseFloat(value);
      }
      setFormData((prevState) => ({
        ...prevState,
        price: convertedValue,
      }));
    },
    discount: (value: string) => {
      let convertedValue: number;
      if (value === "") {
        convertedValue = 0;
      } else {
        convertedValue = parseInt(value);
      }
      setFormData((prevState) => ({
        ...prevState,
        discount: convertedValue,
      }));
    },
    comment: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        comment: value,
      })),
    hotelId: (value: string) => {
      setFormData((prevState) => ({ ...prevState, hotelPackageId: "" }));
      setFormData((prevState) => ({ ...prevState, rooms: [] }));
      setFormData((prevState) => ({ ...prevState, hotelId: value }));
      setPackageData(undefined);
    },
    room: (value: HotelRoom) =>
      setFormData((prevState) => ({ ...prevState, rooms: [value] })),
    package: (value: string) =>
      setFormData((prevState) => ({ ...prevState, hotelPackageId: value })),
    checkInDate: (value: string) => {
      let date = new Date(value);
      if (formData && date < new Date(formData.checkOutDate)) {
        setFormData((prevState) => ({
          ...prevState,
          checkInDate: date.toISOString(),
        }));
      }
    },
    checkOutDate: (value: string) => {
      let date = new Date(value);
      if (formData && date > new Date(formData.checkInDate)) {
        setFormData((prevState) => ({
          ...prevState,
          checkOutDate: date.toISOString(),
        }));
      }
    },
    bookerName: (value: string) => {
      const bookerData = {
        _id: formData.booker._id,
        fullName: value,
        email: formData.booker.email,
        phone: formData.booker.phone,
      };
      setFormData((prevState) => ({
        ...prevState,
        booker: bookerData,
      }));
    },
    bookerEmail: (value: string) => {
      const bookerData = {
        _id: formData.booker._id,
        fullName: formData.booker.fullName,
        email: value,
        phone: formData.booker.phone,
      };
      setFormData((prevState) => ({
        ...prevState,
        booker: bookerData,
      }));
    },
    bookerPhone: (value: string) => {
      if (value !== "") {
        const bookerData = {
          _id: formData.booker._id,
          fullName: formData.booker.fullName,
          email: formData.booker.email,
          phone: parseInt(value),
        };
        setFormData((prevState) => ({
          ...prevState,
          booker: bookerData,
        }));
      } else {
        const bookerData = {
          _id: formData.booker._id,
          fullName: formData.booker.fullName,
          email: formData.booker.email,
          phone: 0,
        };
        setFormData((prevState) => ({
          ...prevState,
          booker: bookerData,
        }));
      }
    },
    guestName: (value: string) => {
      const guestData = {
        _id: formData.guest._id,
        fullName: value,
        email: formData.guest.email,
        phone: formData.guest.phone,
        address: formData.guest.address,
      };
      setFormData((prevState) => ({
        ...prevState,
        guest: guestData,
      }));
    },
    guestAddress: (value: string) => {
      const guestData = {
        _id: formData.guest._id,
        fullName: formData.guest.fullName,
        email: formData.guest.email,
        phone: formData.guest.phone,
        address: value,
      };
      setFormData((prevState) => ({
        ...prevState,
        guest: guestData,
      }));
    },
    guestEmail: (value: string) => {
      const guestData = {
        _id: formData.guest._id,
        fullName: formData.guest.fullName,
        email: value,
        phone: formData.guest.phone,
        address: formData.guest.address,
      };
      setFormData((prevState) => ({
        ...prevState,
        guest: guestData,
      }));
    },
    guestPhone: (value: string) => {
      if (value !== "") {
        const guestData = {
          _id: formData.guest._id,
          fullName: formData.guest.fullName,
          email: formData.guest.email,
          phone: parseInt(value),
          address: formData.guest.address,
        };
        setFormData((prevState) => ({
          ...prevState,
          guest: guestData,
        }));
      } else {
        const guestData = {
          _id: formData.guest._id,
          fullName: formData.guest.fullName,
          email: formData.guest.email,
          phone: 0,
          address: formData.guest.address,
        };
        setFormData((prevState) => ({
          ...prevState,
          guest: guestData,
        }));
      }
    },
  };

  useEffect(() => {
    hotels?.find((hotel) => {
      if (hotel._id === formData.hotelId) {
        setHotelData(hotel);
      }
    });
    packages?.find((pkg) => {
      if (pkg._id === formData.hotelPackageId) {
        setPackageData(pkg);
      }
    });
  }, [hotels]);

  return (
    <div>
      <div
        className={`fixed w-full h-screen z-50 items-center justify-center bg-sea-80 bg-opacity-50 ${
          isModalVisible ? "flex" : "hidden"
        }`}
      >
        <section className={`p-4 bg-white rounded-lg border`}>
          <Heading size={5} styles="mb-6 justify-center flex w-full">
            {modalContent === "update" && "Entry Updated"}
            {modalContent === "delete" && "Entry Removed"}
            {modalContent === "hotels" && "Hotel list"}
            {modalContent === "rooms" && `${hotelData?.name} room list`}
            {modalContent === "packages" && `${hotelData?.name} package list`}
            {modalContent === "bookingType" && `Booking type`}
          </Heading>
          {modalContent === "update" && (
            <div className={`flex flex-row gap-4 items-center justify-between`}>
              <Button
                color="outline"
                isActive
                isSmall
                onClick={() => setIsModalVisible(false)}
              >
                Close
              </Button>
              <Link
                href={"/dashboard/bookings"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to bookings
              </Link>
            </div>
          )}
          {modalContent === "delete" && (
            <div className={`flex flex-row gap-4 items-center justify-center`}>
              <Link
                href={"/dashboard/bookings"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to bookings
              </Link>
            </div>
          )}
          {/* hotel handler */}
          {modalContent === "hotels" && isHotelDataLoading && <Spinner />}
          {modalContent === "hotels" && !isHotelDataLoading && (
            <div className={`min-w-[300px] lg:min-w-[400px]`}>
              <ul className={`flex flex-col gap-4`}>
                {hotels?.map((hotel) => (
                  <li
                    className={`px-2 py-2 border ${
                      hotel._id === formData.hotelId ? "border-sea-60" : ""
                    } rounded cursor-pointer hover:bg-sea-10 transition flex flex-row justify-between items-center group`}
                    onClick={() => {
                      update.hotelId(hotel._id);
                      setHotelData(hotel);
                    }}
                    key={hotel._id}
                  >
                    <div className={`flex flex-col`}>
                      <Heading size={6}>{hotel.name}</Heading>
                      <p>{hotel.region}</p>
                    </div>
                    <span
                      className={`rounded-full flex justify-center items-center w-8 h-8 transition ${
                        hotel._id === formData.hotelId
                          ? `bg-sea-80 group-hover:bg-sea-100`
                          : "bg-sea-40 group-hover:bg-sea-60"
                      }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`fill-sea-10`}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.99961 15.9L4.69961 10.6L3.59961 11.6L8.89961 16.9L9.99961 18L20.5996 7.40005L19.4996 6.30005L9.99961 15.9Z"
                        />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className={`flex flex-row gap-4 items-center justify-center mt-4`}
              >
                <Button
                  color="outline"
                  isActive
                  isSmall
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          {/* room handler */}
          {modalContent === "rooms" && isHotelDataLoading && <Spinner />}
          {modalContent === "rooms" && !isHotelDataLoading && (
            <div className={`min-w-[300px] lg:min-w-[400px]`}>
              <ul className={`flex flex-col gap-4`}>
                {hotelData?.rooms?.map((room) => (
                  <li
                    className={`px-2 py-2 border ${
                      room._id === formData?.rooms[0]?._id
                        ? "border-sea-60"
                        : ""
                    } rounded cursor-pointer hover:bg-sea-10 transition flex flex-row justify-between items-center group`}
                    onClick={() => {
                      update.room(room);
                    }}
                    key={room._id}
                  >
                    <div className={`flex flex-col`}>
                      <Heading size={6}>{room.name}</Heading>
                      <p>{room.size} m2</p>
                    </div>
                    <span
                      className={`rounded-full flex justify-center items-center w-8 h-8 transition ${
                        room._id === formData?.rooms[0]?._id
                          ? `bg-sea-80 group-hover:bg-sea-100`
                          : "bg-sea-40 group-hover:bg-sea-60"
                      }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`fill-sea-10`}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.99961 15.9L4.69961 10.6L3.59961 11.6L8.89961 16.9L9.99961 18L20.5996 7.40005L19.4996 6.30005L9.99961 15.9Z"
                        />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className={`flex flex-row gap-4 items-center justify-center mt-4`}
              >
                <Button
                  color="outline"
                  isActive
                  isSmall
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          {/* package handler */}
          {modalContent === "packages" && isPackageDataLoading && <Spinner />}
          {modalContent === "packages" && !isPackageDataLoading && (
            <div className={`min-w-[300px] lg:min-w-[400px]`}>
              <ul className={`flex flex-col gap-4`}>
                {hotelData?.packages?.map((pkg) => (
                  <li
                    className={`px-2 py-2 border ${
                      pkg._id === formData?.hotelPackageId
                        ? "border-sea-60"
                        : ""
                    } rounded cursor-pointer hover:bg-sea-10 transition flex flex-row justify-between items-center group`}
                    onClick={() => {
                      setPackageData(pkg);
                      update.package(pkg._id);
                    }}
                    key={pkg._id}
                  >
                    <div className={`flex flex-col`}>
                      <Heading size={6}>{pkg.name}</Heading>
                      <p>{pkg.type}</p>
                    </div>
                    <span
                      className={`rounded-full flex justify-center items-center w-8 h-8 transition ${
                        pkg._id === formData?.hotelPackageId
                          ? `bg-sea-80 group-hover:bg-sea-100`
                          : "bg-sea-40 group-hover:bg-sea-60"
                      }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`fill-sea-10`}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.99961 15.9L4.69961 10.6L3.59961 11.6L8.89961 16.9L9.99961 18L20.5996 7.40005L19.4996 6.30005L9.99961 15.9Z"
                        />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className={`flex flex-row gap-4 items-center justify-center mt-4`}
              >
                <Button
                  color="outline"
                  isActive
                  isSmall
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          {/* booking type handler */}
          {modalContent === "bookingType" && (
            <>
              <p className={`max-w-[42ch] text-center`}>
                Other booking types are not currently supported. Apologies for
                the inconvenience.
              </p>
              <div
                className={`flex flex-row gap-4 items-center justify-center mt-4`}
              >
                <Button
                  color="outline"
                  isActive
                  isSmall
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </section>
      </div>
      <DashboardWrapper active="bookings">
        <div>
          <div
            className={`flex flex-col md:flex-row justify-between py-4 items-center mb-4 gap-4`}
          >
            <Heading
              size={3}
              styles="col-span-full"
            >{`Booking # ${bookingData?._id} `}</Heading>
            <Button
              styles={
                "hover:text-errorRed border border-transparent hover:border-errorRed group duration-300"
              }
              color="blank"
              isActive
              isSmall
              onClick={() => {
                deleteBooking();
              }}
            >
              <span className={`flex flex-row gap-2 items-center`}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`fill-charcoal-80 group-hover:fill-errorRed transition duration-300`}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 1.5H9V3H15V1.5ZM3 4.5V6H4.5V21C4.5 21.8284 5.17157 22.5 6 22.5H18C18.8284 22.5 19.5 21.8284 19.5 21V6H21V4.5H3ZM6 21V6H18V21H6ZM9 9H10.5V18H9V9ZM15 9H13.5V18H15V9Z"
                  />
                </svg>
                Delete booking
              </span>
            </Button>
          </div>
          <form
            className={`grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 md:gap-4`}
            onSubmit={(e) => e.preventDefault()}
          >
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-1`}
            >
              <Heading size={5} styles="mb-4">
                Booking details
              </Heading>
              <div className={`w-full relative`}>
                <InputSelect
                  label="Booking type"
                  value={formData.bookingType}
                  onClick={() => {
                    setModalContent("bookingType");
                    setIsModalVisible(true);
                  }}
                />
              </div>
              {isHotelDataLoading && <Spinner />}
              {!isHotelDataLoading && (
                <div
                  className={`w-full flex flex-row justify-between items-center border-2 border-gray-300 hover:border-gray-400 transition cursor-pointer rounded group pr-4`}
                  onClick={() => {
                    setModalContent("hotels");
                    setIsModalVisible(true);
                  }}
                >
                  <div className={`flex flex-col px-3 py-0.5 pb-2`}>
                    <span
                      className={`font-medium text-charcoal-60 font-sans font-semibold text-gray-600`}
                    >
                      Hotel
                    </span>
                    <p className={`font-semibold text-lg text-charcoal-80`}>
                      {hotelData ? hotelData.name : "No hotel data found"}
                    </p>
                  </div>
                  <span
                    className={`bg-transparent border group-hover:border-charcoal-20 group-hover:bg-charcoal-20 transition rounded-full flex w-10 h-10 items-center justify-center`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`fill-charcoal-40 group-hover:fill-charcoal-80 transition`}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5 4.5H21V6H7.5V4.5ZM7.5 18H21V19.5H7.5V18ZM7.5 11.25H21V12.75H7.5V11.25ZM3 11.25H4.5V12.75H3V11.25ZM3 4.5H4.5V6H3V4.5ZM3 18H4.5V19.5H3V18Z"
                      />
                    </svg>
                  </span>
                </div>
              )}
              {isBookingDataLoading && <Spinner />}
              {!isBookingDataLoading && (
                <div
                  className={`w-full flex flex-row justify-between items-center border-2 border-gray-300 hover:border-gray-400 transition cursor-pointer rounded group pr-4`}
                  onClick={() => {
                    setModalContent("rooms");
                    setIsModalVisible(true);
                  }}
                >
                  <div className={`flex flex-col px-3 py-0.5 pb-2`}>
                    <span
                      className={`font-medium text-charcoal-60 font-sans font-semibold text-gray-600`}
                    >
                      Room
                    </span>
                    <p className={`font-semibold text-lg text-charcoal-80`}>
                      {formData?.rooms[0]
                        ? formData?.rooms[0].name
                        : "No room selected"}
                    </p>
                  </div>
                  <span
                    className={`bg-transparent border group-hover:border-charcoal-20 group-hover:bg-charcoal-20 transition rounded-full flex w-10 h-10 items-center justify-center`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`fill-charcoal-40 group-hover:fill-charcoal-80 transition`}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5 4.5H21V6H7.5V4.5ZM7.5 18H21V19.5H7.5V18ZM7.5 11.25H21V12.75H7.5V11.25ZM3 11.25H4.5V12.75H3V11.25ZM3 4.5H4.5V6H3V4.5ZM3 18H4.5V19.5H3V18Z"
                      />
                    </svg>
                  </span>
                </div>
              )}
              {isHotelDataLoading && <Spinner />}
              {!isHotelDataLoading && (
                <div
                  className={`w-full flex flex-row justify-between items-center border-2 border-gray-300 hover:border-gray-400 transition cursor-pointer rounded group pr-4`}
                  onClick={() => {
                    setModalContent("packages");
                    setIsModalVisible(true);
                  }}
                >
                  <div className={`flex flex-col px-3 py-0.5 pb-2`}>
                    <span
                      className={`font-medium text-charcoal-60 font-sans font-semibold text-gray-600`}
                    >
                      Experience package
                    </span>
                    <p className={`font-semibold text-lg text-charcoal-80`}>
                      {packageData ? packageData?.name : "No package selected"}
                    </p>
                  </div>
                  <span
                    className={`bg-transparent border group-hover:border-charcoal-20 group-hover:bg-charcoal-20 transition rounded-full flex w-10 h-10 items-center justify-center`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`fill-charcoal-40 group-hover:fill-charcoal-80 transition`}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5 4.5H21V6H7.5V4.5ZM7.5 18H21V19.5H7.5V18ZM7.5 11.25H21V12.75H7.5V11.25ZM3 11.25H4.5V12.75H3V11.25ZM3 4.5H4.5V6H3V4.5ZM3 18H4.5V19.5H3V18Z"
                      />
                    </svg>
                  </span>
                </div>
              )}
              {isBookingDataLoading && <Spinner />}
              {!isBookingDataLoading && bookingData && (
                <div
                  className={`grid grid-cols-2 gap-4 items-center content-center group`}
                >
                  <div
                    className={`w-full border-2 rounded border-gray-300 hover:border-gray-400 transition flex flex-col gap-2 justify-center px-3 py-1 pb-2 group`}
                  >
                    <label className={`font-semibold text-gray-600`}>
                      Check-in date
                    </label>
                    <input
                      id="checkInDate"
                      name="checkInDate"
                      type="date"
                      value={formData.checkInDate.split("T")[0]}
                      onChange={(e) => {
                        update.checkInDate(e.target.value);
                      }}
                      className={`bg-sea-10 border border-sea-40 px-2 py-1 rounded cursor-pointer transition group-hover:border-gray-600`}
                    ></input>
                  </div>
                  <div
                    className={`w-full border-2 rounded border-gray-300 hover:border-gray-400 transition flex flex-col gap-2 justify-center px-4 py-2 group`}
                  >
                    <label className={`font-semibold text-gray-600`}>
                      Check-out date
                    </label>
                    <input
                      id="checkInDate"
                      name="checkInDate"
                      type="date"
                      value={formData.checkOutDate.split("T")[0]}
                      onChange={(e) => {
                        update.checkOutDate(e.target.value);
                      }}
                      className={`bg-sea-10 border border-sea-40 px-2 py-1 rounded cursor-pointer transition group-hover:border-gray-600`}
                    ></input>
                  </div>
                </div>
              )}

              <InputField
                type="text"
                label="Booking price"
                name="booking_price"
                id="booking_price"
                value={formData.price}
                onChange={(e) => {
                  update.price(e.target.value);
                }}
              />
              <InputField
                label="Booking discount"
                name="booking_discount"
                id="booking_discount"
                value={formData.discount}
                onChange={(e) => {
                  update.discount(e.target.value);
                }}
              />
            </section>
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-1`}
            >
              {isBookingDataLoading && <Spinner></Spinner>}
              {!isBookingDataLoading && (
                <>
                  <Heading size={5} styles="mb-4">
                    Booker Details
                  </Heading>
                  <InputField
                    type="text"
                    label="Booker name"
                    name="bookerName"
                    id="bookerName"
                    value={formData.booker.fullName}
                    onChange={(e) => {
                      update.bookerName(e.target.value);
                    }}
                  />
                  <InputField
                    type="text"
                    label="Booker email"
                    name="bookerEmail"
                    id="bookerEmail"
                    value={formData.booker.email}
                    onChange={(e) => {
                      update.bookerEmail(e.target.value);
                    }}
                  />
                  <InputField
                    type="text"
                    label="Booker phone"
                    name="bookerPhone"
                    id="bookerPhone"
                    value={formData.booker.phone}
                    onChange={(e) => {
                      update.bookerPhone(e.target.value);
                    }}
                  />
                  <div className={`relative group`}>
                    <p
                      className={`absolute top-[2px] left-[4px] h-6 px-[calc(0.75rem-2px)] z-20 font-sans font-semibold text-gray-600 w-[calc(100%-20px)] bg-white bg-opacity-50`}
                    >
                      Booking comment
                    </p>
                    <div
                      className={`absolute top-[2px] left-[4px] h-6 z-10 w-[calc(100%-20px)] bg-gradient-to-br from-white to-transparent`}
                    ></div>
                    <textarea
                      className={`flex min-h-48 w-full resize-none bg-transparent flex-col border-2 rounded border-gray-300 px-3 py-4 pt-6 font-sans relative transition hover:border-gray-400 active:outline-none focus:outline-none focus:border-charcoal-100`}
                      rows={6}
                      defaultValue={formData.comment}
                      onChange={(e) => {
                        update.comment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <Heading size={5} styles="mb-4">
                    Guest Details
                  </Heading>
                  <InputField
                    type="text"
                    label="Guest name"
                    name="guestName"
                    id="guestName"
                    value={formData.guest.fullName}
                    onChange={(e) => {
                      update.guestName(e.target.value);
                    }}
                  />
                  <InputField
                    type="text"
                    label="Guest email"
                    name="guestEmail"
                    id="guestEmail"
                    value={formData.guest.email}
                    onChange={(e) => {
                      update.guestEmail(e.target.value);
                    }}
                  />
                  <InputField
                    type="text"
                    label="Guest phone"
                    name="guestPhone"
                    id="guestPhone"
                    value={formData.guest.phone}
                    onChange={(e) => {
                      update.guestPhone(e.target.value);
                    }}
                  />
                  <InputField
                    type="text"
                    label="Guest address"
                    name="guestAddress"
                    id="guestAddress"
                    value={formData.guest.address}
                    onChange={(e) => {
                      update.guestAddress(e.target.value);
                    }}
                  />
                </>
              )}
            </section>
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col-reverse sm:flex-row justify-between gap-4 col-span-full`}
            >
              <p className={`text-sea-60 self-end h-fit`}>
                2023 &copy; Group 8
              </p>
              <div
                className={`flex flex-row gap-8 items-center justify-center sm:justify-end`}
              >
                <Link
                  href="/dashboard/bookings"
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full"
                >
                  Cancel
                </Link>
                <Button
                  color="sea"
                  isActive
                  isSmall
                  onClick={() => {
                    updateBooking();
                  }}
                >
                  Update
                </Button>
              </div>
            </section>
          </form>
        </div>
      </DashboardWrapper>
    </div>
  );
}

export default Page;
