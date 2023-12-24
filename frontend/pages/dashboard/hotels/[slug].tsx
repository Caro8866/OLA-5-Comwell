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
import { Region } from "@/utils/Region.types";
import { HotelPackage } from "@/utils/HotelPackage.types";
import { Offer } from "@/utils/offer.types";

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [ishotelDataLoading, setIsHotelDataLoading] = useState(false);
  const [hotelData, setHotelData] = useState<Hotel>();
  const [experiencePackages, setExperiencePackages] =
    useState<HotelPackage[]>();
  const [offers, setOffers] = useState<Offer[]>();
  const [rooms, setRooms] = useState<HotelRoom[]>();
  const [formData, setFormData] = useState<Hotel>({
    _id: "",
    name: "",
    description: "",
    roomsDescription: "",
    image: "",
    region: "",
    location: "",
    addons: [],
    packages: [],
    offers: [],
    isHotel: true,
    isBanquet: false,
    isConferenceCenter: false,
    rooms: [],
  });
  const [areLocationsVisible, setAreLocationsVisible] = useState(false);
  const [areRegionsVisible, setAreRegionsVisible] = useState(false);
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

  const regions = ["Zealand", "Funen", "Jutland", "Sweden"];

  useEffect(() => {
    setIsHotelDataLoading(true);
    const fetchData = async () => {
      fetch(`http://localhost:5000/hotels/${slug}`)
        .then((response) => response.json())
        .then((data: Hotel) => {
          setHotelData(data);
          setFormData(data);
          setIsHotelDataLoading(false);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(`http://localhost:5000/packages`)
        .then((response) => response.json())
        .then((data: HotelPackage[]) => {
          setExperiencePackages(data);
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(`http://localhost:5000/hotel-offers`)
        .then((response) => response.json())
        .then((data: Offer[]) => {
          setOffers(data);
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(`http://localhost:5000/hotel-rooms`)
        .then((response) => response.json())
        .then((data: HotelRoom[]) => {
          setRooms(data);
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

  const handleUpdate = (
    prop: string,
    value: string | boolean | Offer | HotelPackage | HotelRoom
  ) => {
    if (formData) {
      if (prop === "name" && typeof value == "string") {
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

      if (prop === "hotel") {
        const isChecked = value as unknown as boolean;
        setFormData((prevState) => ({
          ...prevState,
          isHotel: isChecked,
        }));
      }

      if (prop === "banquet") {
        const isChecked = value as unknown as boolean;
        setFormData((prevState) => ({
          ...prevState,
          isBanquet: isChecked,
        }));
      }

      if (prop === "conference") {
        const isChecked = value as unknown as boolean;
        setFormData((prevState) => ({
          ...prevState,
          isConferenceCenter: isChecked,
        }));
      }

      if (prop === "region") {
        const region = value as Region;
        setFormData((prevState) => ({
          ...prevState,
          region: region,
        }));
      }

      if (prop === "description" && typeof value == "string") {
        setFormData((prevState) => ({
          ...prevState,
          description: value,
        }));
      }

      if (prop === "image" && typeof value == "string") {
        setFormData((prevState) => ({
          ...prevState,
          image: value,
        }));
      }
    }

    if (prop === "offers") {
      const offer = value as unknown as Offer;
      if (formData?.offers.includes(offer)) {
        setFormData((prevState) => ({
          ...prevState,
          offers: [
            ...formData.offers.filter((offerData) => offerData !== offer),
          ],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          offers: [...formData.offers, offer],
        }));
      }
    }

    if (prop === "packages") {
      const pkg = value as unknown as HotelPackage;
      if (
        formData?.packages.some((packageData) => packageData._id === pkg._id)
      ) {
        setFormData((prevState) => ({
          ...prevState,
          packages: [
            ...formData.packages.filter(
              (packageData) => packageData._id !== pkg._id
            ),
          ],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          packages: [...formData.packages, pkg],
        }));
      }
    }

    if (prop === "rooms") {
      const room = value as unknown as HotelRoom;
      if (formData?.rooms.some((roomData) => roomData._id === room._id)) {
        setFormData((prevState) => ({
          ...prevState,
          rooms: [
            ...formData.rooms.filter((roomData) => roomData._id !== room._id),
          ],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          rooms: [...formData.rooms, room],
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
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 md:gap-4`}
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
              <div className={`relative`}>
                <InputSelect
                  value={formData.location}
                  label="Hotel location"
                  onClick={() => {
                    setAreLocationsVisible(!areLocationsVisible);
                    setAreRegionsVisible(false);
                  }}
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
                          key={location}
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
              <div className={`relative`}>
                <InputSelect
                  value={formData.region}
                  label="Hotel region"
                  onClick={() => {
                    setAreRegionsVisible(!areRegionsVisible);
                    setAreLocationsVisible(false);
                  }}
                  isExpanded={areRegionsVisible}
                />
                <section
                  className={`absolute top-16 bg-white z-40 w-full rounded-lg border overflow-y-scroll max-h-48 transition duration-500 ${
                    areRegionsVisible ? "flex" : "hidden"
                  }`}
                >
                  <ul className={`flex flex-col gap-2 w-full`}>
                    {regions.sort().map((region) => {
                      return (
                        <li
                          key={region}
                          onClick={() => {
                            handleUpdate("region", region);
                            setAreLocationsVisible(false);
                          }}
                          className={`pl-2 py-2 cursor-pointer hover:bg-sea-20 transition duration-300 w-full`}
                        >
                          {region}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </div>
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
              <div className={`flex flex-col`}>
                <Heading size={5} styles="mb-6">
                  Status
                </Heading>
                <ul className={`flex flex-col gap-4`}>
                  <li
                    className={`flex flex-row gap-2 items-center cursor-pointer w-fit`}
                    onClick={() => {
                      handleUpdate("hotel", !formData.isHotel);
                    }}
                  >
                    <div
                      className={`w-6 h-6 border border-charcoal-40 rounded-md transition duration-300 flex items-center justify-center ${
                        formData.isHotel ? "bg-sea-80 border-sea-80" : ""
                      }`}
                    >
                      {formData.isHotel && (
                        <span className={`w-3 h-3 rounded bg-white`}></span>
                      )}
                    </div>
                    <p className={`font-medium`}>Hotel</p>
                  </li>
                  <li
                    className={`flex flex-row gap-2 items-center cursor-pointer w-fit`}
                    onClick={() => {
                      handleUpdate("conference", !formData.isConferenceCenter);
                    }}
                  >
                    <div
                      className={`w-6 h-6 border border-charcoal-40 rounded-md transition duration-300 flex items-center justify-center ${
                        formData.isConferenceCenter
                          ? "bg-sea-80 border-sea-80"
                          : ""
                      }`}
                    >
                      {formData.isConferenceCenter && (
                        <span className={`w-3 h-3 rounded bg-white`}></span>
                      )}
                    </div>
                    <p className={`font-medium`}>Conference center</p>
                  </li>
                  <li
                    className={`flex flex-row gap-2 items-center cursor-pointer w-fit`}
                    onClick={() => {
                      handleUpdate("banquet", !formData.isBanquet);
                    }}
                  >
                    <div
                      className={`w-6 h-6 border border-charcoal-40 rounded-md transition duration-300 flex items-center justify-center ${
                        formData.isBanquet ? "bg-sea-80 border-sea-80" : ""
                      }`}
                    >
                      {formData.isBanquet && (
                        <span className={`w-3 h-3 rounded bg-white`}></span>
                      )}
                    </div>
                    <p className={`font-medium`}>Banquet center</p>
                  </li>
                </ul>
              </div>
            </section>
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-full`}
            >
              <Heading size={5} styles="mb-2">
                Hotel Offers
              </Heading>
              <div className={`w-full`}>
                <ul
                  className={`flex flex-row gap-4 overflow-x-scroll w-auto pb-4`}
                >
                  {offers &&
                    offers?.map((offer) => {
                      return (
                        <li
                          className={`w-64 pb-4 rounded-md border overflow-hidden relative min-w-[230px] cursor-pointer relative transition hover:border-charcoal-60 ${
                            formData?.offers.some(
                              (offerData) => offerData._id === offer._id
                            )
                              ? "border-charcoal-80"
                              : ""
                          }`}
                          key={offer._id}
                          onClick={() => {
                            handleUpdate("offers", offer);
                          }}
                        >
                          <span
                            className={`z-10 rounded-full top-2 left-2 w-4 h-4 rounded flex items-center border justify-center absolute ${
                              formData?.offers.some(
                                (offerData) => offerData._id === offer._id
                              )
                                ? "border-white bg-sea-80"
                                : "bg-white"
                            }`}
                          >
                            {formData?.offers.some(
                              (offerData) => offerData._id === offer._id
                            ) && (
                              <span
                                className={`w-1.5 h-1.5 flex bg-white rounded-full`}
                              ></span>
                            )}
                          </span>
                          <Image
                            src={offer.image}
                            alt={offer.name}
                            width={300}
                            height={300}
                            className={`object-cover w-full min-h-32 h-32 max-w-full`}
                          />
                          <Heading size={6} styles="px-2 my-2">
                            {offer.name}
                          </Heading>
                          <p
                            className={`text-trumpet-mobile px-2 max-w-[24ch] truncate`}
                          >
                            {offer.description}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <Heading size={5} styles="mb-2">
                Experience packages
              </Heading>
              <div className={`w-full`}>
                <ul
                  className={`flex flex-row gap-4 overflow-x-scroll w-auto pb-4`}
                >
                  {experiencePackages &&
                    experiencePackages?.map((pkg) => {
                      return (
                        <li
                          className={`w-64 pb-4 rounded-md border overflow-hidden relative min-w-[230px] cursor-pointer relative transition hover:border-charcoal-60 ${
                            formData?.packages.some(
                              (pkgData) => pkgData._id === pkg._id
                            )
                              ? "border-charcoal-80"
                              : ""
                          }`}
                          key={pkg._id}
                          onClick={() => {
                            handleUpdate("packages", pkg);
                          }}
                        >
                          <span
                            className={`z-10 rounded-full top-2 left-2 w-4 h-4 rounded flex items-center border justify-center absolute ${
                              formData?.packages.some(
                                (pkgData) => pkgData._id === pkg._id
                              )
                                ? "border-white bg-sea-80"
                                : "bg-white"
                            }`}
                          >
                            {formData?.packages.some(
                              (pkgData) => pkgData._id === pkg._id
                            ) && (
                              <span
                                className={`w-1.5 h-1.5 flex bg-white rounded-full`}
                              ></span>
                            )}
                          </span>
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            width={300}
                            height={300}
                            className={`object-cover w-full min-h-32 h-32 max-w-full`}
                          />
                          <Heading size={6} styles="px-2 my-2">
                            {pkg.name}
                          </Heading>
                          <p
                            className={`text-trumpet-mobile px-2 max-w-[24ch] truncate`}
                          >
                            {pkg.description}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <Heading size={5} styles="mb-2">
                Hotel rooms
              </Heading>
              <div className={`w-full`}>
                <ul
                  className={`flex flex-row gap-4 overflow-x-scroll w-auto pb-4`}
                >
                  {rooms &&
                    rooms?.map((room) => {
                      return (
                        <li
                          className={`w-64 pb-4 rounded-md border overflow-hidden relative min-w-[230px] cursor-pointer relative transition hover:border-charcoal-60 ${
                            formData?.rooms.some(
                              (roomData) => roomData._id === room._id
                            )
                              ? "border-charcoal-80"
                              : ""
                          }`}
                          key={room._id}
                          onClick={() => {
                            handleUpdate("rooms", room);
                          }}
                        >
                          <span
                            className={`z-10 rounded-full top-2 left-2 w-4 h-4 rounded flex items-center border justify-center absolute ${
                              formData?.rooms.some(
                                (roomData) => roomData._id === room._id
                              )
                                ? "border-white bg-sea-80"
                                : "bg-white"
                            }`}
                          >
                            {formData?.rooms.some(
                              (roomData) => roomData._id === room._id
                            ) && (
                              <span
                                className={`w-1.5 h-1.5 flex bg-white rounded-full`}
                              ></span>
                            )}
                          </span>
                          <Image
                            src={room.image}
                            alt={room.name}
                            width={300}
                            height={300}
                            className={`object-cover w-full min-h-32 h-32 max-w-full`}
                          />
                          <Heading size={6} styles="px-2 my-2">
                            {room.name}
                          </Heading>
                          <p
                            className={`text-trumpet-mobile px-2 max-w-[24ch] truncate`}
                          >
                            {room.description}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
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
