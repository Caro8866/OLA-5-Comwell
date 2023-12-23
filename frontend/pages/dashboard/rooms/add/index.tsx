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

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [isRoomDataLoading, setIsRoomDataLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<HotelRoom>({
    _id: "",
    name: "",
    size: 0,
    description: "",
    image: "",
    price: 0,
  });

  function addRoom() {
    const options = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        size: formData.size,
        description: formData.description,
        image: formData.image,
        price: formData.price,
      }),
    };
    fetch(`http://localhost:5000/hotel-rooms/`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode !== 400) {
          setModalContent("update");
          setIsModalVisible(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const validateForm = () => {
    if (
      formData.name.length > 2 &&
      formData.size > 0 &&
      formData.price > 0 &&
      formData.description.length > 2 &&
      formData.image.length > 2
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleUpdate = (prop: string, value: string) => {
    validateForm();
    if (formData) {
      if (prop === "name") {
        setFormData((prevState) => ({
          ...prevState,
          name: value,
        }));
      }
      if (prop === "size") {
        let convertedValue: number;
        if (!/^\d+$/ || value == "") {
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
        if (!/^\d+$/ || value == "") {
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
                href={"/dashboard/rooms"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to rooms
              </Link>
            </div>
          )}
          {modalContent === "delete" && (
            <div className={`flex flex-row gap-4 items-center justify-center`}>
              <Link
                href={"/dashboard/rooms"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to rooms
              </Link>
            </div>
          )}
        </section>
      </div>
      <DashboardWrapper active="rooms">
        <div>
          <div className={`flex flex-row justify-between py-4 items-center`}>
            <Heading size={3} styles="col-span-full mb-8">{`${
              formData?.name ? formData.name : "New"
            } room`}</Heading>
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
                label="Room name"
                name="room_name"
                id="room_name"
                value={formData.name}
                onChange={(e) => {
                  handleUpdate("name", e.target.value);
                }}
              />
              <InputField
                label="Room size"
                name="room_size"
                id="room_size"
                value={formData.size}
                validationCondition={() => formData.size > 0}
                onChange={(e) => {
                  handleUpdate("size", e.target.value);
                }}
              />
              <InputField
                label="Room price (DKK)"
                name="room_price"
                id="room_price"
                value={formData.price}
                onChange={(e) => {
                  handleUpdate("price", e.target.value);
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
            </section>
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-1`}
            >
              {isRoomDataLoading && <Spinner></Spinner>}
              {formData && (
                <Image
                  alt={"placeholder"}
                  src={""}
                  width={512}
                  height={400}
                  className={`w-full h-80 object-cover rounded-lg`}
                />
              )}
              <InputField
                label="Room Image"
                name="room_image"
                id="room_image"
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
                  href="/dashboard/rooms"
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full"
                >
                  Cancel
                </Link>
                <Button
                  color="sea"
                  isActive
                  isSmall
                  onClick={() => {
                    console.log(formData);
                    addRoom();
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
