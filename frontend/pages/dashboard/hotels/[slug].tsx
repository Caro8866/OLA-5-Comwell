import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HotelRoom } from "@/utils/HotelRoom.types";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Heading from "@/components/text/heading/Heading";
import InputField from "@/components/formField/InputField";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/button/Button";
import Link from "next/link";
import { Hotel } from "@/utils/Hotel.types";
import InputSelect from "@/components/formField/InputSelect";
import { Area } from "@/utils/Area.types";

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [ishotelDataLoading, setIsHotelDataLoading] = useState(false);
  const [hotelData, setHotelData] = useState<Hotel>();
  const [formData, setFormData] = useState<Hotel>({
    _id: "",
    name: "",
    description: "",
    image: "",
  });

  const [areLocationsVisible, setAreLocationsVisible] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const locations = [
    "Aarhus",
    "Snekkersten",
    "Horsens",
    "Nordhavn",
    "Odense",
    "Holte",
    "Aalborg",
    "Børkop",
    "Korsør",
    "Kolding",
    "Middelfart",
    "Køge",
    "Skørping",
    "Roskilde",
    "Varberg",
    "Copenhagen",
  ];

  useEffect(() => {
    setIsHotelDataLoading(true);
    const fetchData = async () => {
      fetch(`http://localhost:5000/hotels/${slug}`)
        .then((response) => response.json())
        .then((data: Hotel) => {
          setHotelData(data);
          setFormData(data);
          setIsHotelDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  function updateRoom() {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:5000/hotels/${slug}`, options)
      .then((response) => response.json())
      .then((data) => {
        setModalContent("update");
        setIsModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteRoom() {
    const options = {
      method: "DELETE",
    };
    fetch(`http://localhost:5000/hotels/${slug}`, options)
      .then((response) => response.json())
      .then((res) => {
        setModalContent("delete");
        setIsModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdate = (prop: string, value: string) => {
    if (formData) {
      if (prop === "name") {
        setFormData((prevState) => ({
          ...prevState,
          name: value,
        }));
      }
      if (prop === "location") {
        const location = value as Area;
        setFormData((prevState) => ({
          ...prevState,
          location: location,
        }));
      }
      if (prop === "size") {
        let convertedValue: number;
        if (value === "") {
          convertedValue = 0;
        } else {
          convertedValue = parseInt(value);
        }
        setFormData((prevState) => ({
          ...prevState,
          size: convertedValue,
        }));
      }
      if (prop === "price") {
        let convertedValue: number;
        if (value === "") {
          convertedValue = 0;
        } else {
          convertedValue = parseInt(value);
        }
        setFormData((prevState) => ({
          ...prevState,
          price: convertedValue,
        }));
      }
      if (prop === "description") {
        setFormData((prevState) => ({
          ...prevState,
          description: value,
        }));
      }
      if (prop === "image") {
        setFormData((prevState) => ({
          ...prevState,
          image: value,
        }));
      }
    }
  };

  return (
    <div>
      <div
        className={`fixed w-full h-screen z-50 items-center justify-center bg-sea-80 bg-opacity-50 ${
          isModalVisible ? "flex" : "hidden"
        }`}
      >
        <section className={`p-4 bg-white rounded-lg border`}>
          <Heading size={5} styles="mb-6 justify-center flex w-full">
            {`Entry ${
              modalContent == "update" ? "updated" : "removed"
            } successfully`}
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
                href={"/dashboard/hotels"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to hotels
              </Link>
            </div>
          )}
          {modalContent === "delete" && (
            <div className={`flex flex-row gap-4 items-center justify-center`}>
              <Link
                href={"/dashboard/hotels"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to hotels
              </Link>
            </div>
          )}
        </section>
      </div>
      <DashboardWrapper active="hotels">
        <div>
          <div className={`flex flex-row justify-between py-4 items-center`}>
            <Heading
              size={3}
              styles="col-span-full mb-8"
            >{`${hotelData?.name} hotel`}</Heading>
            <Button
              styles={
                "hover:text-errorRed border border-transparent hover:border-errorRed group duration-300"
              }
              color="blank"
              isActive
              isSmall
              onClick={() => {
                deleteRoom();
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
                Delete hotel
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
                Room details
              </Heading>

              <InputField
                label="Hotel name"
                name="hotel_name"
                id="hotel_name"
                value={formData.name}
                onChange={(e) => {
                  handleUpdate("name", e.target.value);
                }}
              />
              <InputField
                label="Hotel region"
                name="hotel_region"
                id="hotel_region"
                value={formData.region}
                onChange={(e) => {
                  handleUpdate("region", e.target.value);
                }}
              />
              <div className={`relative`}>
                <InputSelect
                  value={formData.location}
                  label="Hotel location"
                  onClick={() => setAreLocationsVisible(!areLocationsVisible)}
                  isExpanded={areLocationsVisible}
                />
                <section
                  className={`absolute top-16 bg-white z-40 w-full rounded-lg border overflow-y-scroll max-h-48 transition duration-500 ${
                    areLocationsVisible ? "flex" : "hidden"
                  }`}
                >
                  <ul className={`flex flex-col gap-2 w-full`}>
                    {locations.sort().map((location) => {
                      return (
                        <li
                          onClick={() => {
                            handleUpdate("location", location);
                            setAreLocationsVisible(false);
                          }}
                          className={`pl-2 py-2 cursor-pointer hover:bg-sea-20 transition duration-300 w-full`}
                        >
                          {location}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </div>
              <InputField
                label="Room region"
                name="Hotel_region"
                id="Hotel_region"
                value={formData.region}
                onChange={(e) => {
                  handleUpdate("size", e.target.value);
                }}
              />
              <div className={`relative group`}>
                <p
                  className={`absolute top-[2px] left-[4px] h-6 px-[calc(0.75rem-2px)] z-20 font-sans font-semibold text-gray-600 w-[calc(100%-20px)] bg-white bg-opacity-50`}
                >
                  Description
                </p>
                <div
                  className={`absolute top-[2px] left-[4px] h-6 z-10 w-[calc(100%-20px)] bg-gradient-to-br from-white to-transparent`}
                ></div>
                <textarea
                  className={`flex min-h-48 w-full resize-none flex-col border-2 rounded border-gray-300 px-3 py-4 pt-6 font-sans relative transition hover:border-gray-400 active:outline-none focus:outline-none focus:border-charcoal-100`}
                  rows={6}
                  defaultValue={formData.description}
                  onChange={(e) => {
                    handleUpdate("description", e.target.value);
                  }}
                ></textarea>
              </div>
              <div className={`relative group`}>
                <p
                  className={`absolute top-[2px] left-[4px] h-6 px-[calc(0.75rem-2px)] z-20 font-sans font-semibold text-gray-600 w-[calc(100%-20px)] bg-white bg-opacity-50`}
                >
                  Room Section Description
                </p>
                <div
                  className={`absolute top-[2px] left-[4px] h-6 z-10 w-[calc(100%-20px)] bg-gradient-to-br from-white to-transparent`}
                ></div>
                <textarea
                  className={`flex min-h-48 w-full resize-none flex-col border-2 rounded border-gray-300 px-3 py-4 pt-6 font-sans relative transition hover:border-gray-400 active:outline-none focus:outline-none focus:border-charcoal-100`}
                  rows={3}
                  defaultValue={formData.roomsDescription}
                  onChange={(e) => {
                    handleUpdate("roomDescription", e.target.value);
                  }}
                ></textarea>
              </div>
            </section>
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-1`}
            >
              {ishotelDataLoading && <Spinner></Spinner>}
              {hotelData && (
                <Image
                  alt={hotelData.name}
                  src={hotelData?.image}
                  width={512}
                  height={400}
                  className={`w-full h-80 object-cover rounded-lg`}
                />
              )}
              <InputField
                label="Hotel Image"
                name="hotel_image"
                id="hotel_image"
                value={formData.image}
                onChange={(e) => {
                  handleUpdate("image", e.target.value);
                }}
              />
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
                  href="/dashboard/hotels"
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full"
                >
                  Cancel
                </Link>
                <Button
                  color="sea"
                  isActive
                  isSmall
                  onClick={() => {
                    updateRoom();
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
