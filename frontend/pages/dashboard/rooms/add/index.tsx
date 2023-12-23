import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HotelRoom } from "@/utils/HotelRoom.types";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Heading from "@/components/text/heading/Heading";
import InputField from "@/components/formField/InputField";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/button/Button";
import Link from "next/link";

import { RoomValidators } from "@/utils/formTypes";
import InputError from "@/components/formField/InputError";

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [isRoomDataLoading, setIsRoomDataLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
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

  const validators: RoomValidators = {
    roomName: {
      fieldName: "roomName",
      validationFunction: () =>
        formData.name.match(/^[a-zA-Z\s]*$/) && formData.name.length > 0
          ? true
          : false,
    },
    roomPrice: {
      fieldName: "roomPrice",
      validationFunction: () => formData.price > 0,
    },
    roomSize: {
      fieldName: "roomSize",
      validationFunction: () => formData.size > 0,
    },
    roomDescription: {
      fieldName: "roomDescription",
      validationFunction: () =>
        formData.description.match(/^[a-zA-Z\s]*$/) &&
        formData.description.length > 0
          ? true
          : false,
    },
    roomImage: {
      fieldName: "roomImage",
      validationFunction: () =>
        formData.image.match(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        )
          ? true
          : false,
    },
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    Object.entries(validators).forEach(([key, value]) => {
      if (!value.validationFunction()) {
        setValidationErrors((prev) =>
          Array.from(new Set([...prev, value.fieldName]))
        );
      } else {
        setValidationErrors((prev) =>
          prev.filter((e) => e !== value.fieldName)
        );
      }
    });
    if (
      validators.roomName.validationFunction() &&
      validators.roomSize.validationFunction() &&
      validators.roomPrice.validationFunction() &&
      validators.roomDescription.validationFunction() &&
      validators.roomImage.validationFunction()
    ) {
      addRoom();
    }
  }

  return (
    <div>
      <div
        className={`fixed w-full h-screen z-50 items-center justify-center bg-sea-80 bg-opacity-50 ${
          isModalVisible ? "flex" : "hidden"
        }`}
      >
        <section className={`p-4 bg-white rounded-lg border`}>
          <Heading size={5} styles="mb-6 justify-center flex w-full">
            {`Room added successfully`}
          </Heading>

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
            noValidate
            onSubmit={handleSubmit}
            className={`grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 md:gap-4`}
          >
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-1`}
            >
              <Heading size={5} styles="mb-4">
                Room details
              </Heading>

              <InputField
                label="Room name"
                name="roomName"
                id="roomName"
                value={formData.name}
                errorMessage="Please type a valid name (a-z)"
                validationCondition={() =>
                  validators.roomName.validationFunction()
                }
                validationOnSend={!validationErrors.includes("roomName")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
              <InputField
                label="Room size (m2)"
                name="roomSize"
                id="roomSize"
                value={formData.size}
                errorMessage="Please enter a valid size"
                validationCondition={() =>
                  validators.roomName.validationFunction()
                }
                validationOnSend={!validationErrors.includes("roomSize")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  //handle if provided a string
                  if (e.target.value.match(/^\d+$/)) {
                    setFormData((prevState) => ({
                      ...prevState,
                      size: parseInt(e.target.value),
                    }));
                  } else {
                    setFormData((prevState) => ({
                      ...prevState,
                      size: 0,
                    }));
                  }
                }}
              />

              <InputField
                label="Room price (DKK)"
                name="room_price"
                id="room_price"
                value={formData.price}
                errorMessage="Please enter valid price"
                validationCondition={() =>
                  validators.roomName.validationFunction()
                }
                validationOnSend={!validationErrors.includes("roomPrice")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  //handle if provided a string
                  if (e.target.value.match(/^\d+$/)) {
                    setFormData((prevState) => ({
                      ...prevState,
                      price: parseInt(e.target.value),
                    }));
                  } else {
                    setFormData((prevState) => ({
                      ...prevState,
                      price: 0,
                    }));
                  }
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
                  className={`flex min-h-48 mb-4 w-full resize-none flex-col border-2 rounded border-gray-300 px-3 py-4 pt-6 font-sans relative transition hover:border-gray-400 active:outline-none focus:outline-none focus:border-charcoal-100`}
                  rows={6}
                  defaultValue={formData.description}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      validationErrors.splice(
                        validationErrors.indexOf("roomDescription"),
                        1
                      );
                    } else {
                      !validationErrors.includes("roomDescription") &&
                        setValidationErrors([
                          ...validationErrors,
                          "roomDescription",
                        ]);
                    }
                    setFormData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }));
                  }}
                ></textarea>
                {validationErrors.includes("roomDescription") && (
                  <InputError
                    message="Description must be provided"
                    showError
                  />
                )}
              </div>
            </section>
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-1`}
            >
              {isRoomDataLoading && <Spinner></Spinner>}
              {formData.image.match(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
              ) ? (
                <Image
                  alt={"Invalid room image"}
                  src={
                    formData.image.match(
                      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
                    )
                      ? formData.image
                      : ""
                  }
                  width={512}
                  height={400}
                  className={`w-full h-80 object-cover rounded-lg flex justify-center items-center`}
                />
              ) : (
                <></>
              )}
              <InputField
                label="Room Image"
                name="room_image"
                id="room_image"
                value={formData.image}
                errorMessage="Please provide a link"
                validationCondition={() =>
                  validators.roomName.validationFunction()
                }
                validationOnSend={!validationErrors.includes("roomImage")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    image: e.target.value,
                  }));
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
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full font-semibold"
                >
                  Cancel
                </Link>
                <Button color="sea" isActive isSmall onClick={() => {}}>
                  Add room
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
