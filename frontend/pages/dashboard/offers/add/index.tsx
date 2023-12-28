import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Offer, OfferForm } from "@/utils/offer.types";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Heading from "@/components/text/heading/Heading";
import InputField from "@/components/formField/InputField";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/button/Button";
import Link from "next/link";

import { ValidatorType } from "@/utils/formTypes";
import InputError from "@/components/formField/InputError";
import { RoomValidators } from "@/utils/formTypes";

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [isOfferDataLoading, setIsOfferDataLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [tagName, setTagName] = useState("");
  const [formData, setFormData] = useState<OfferForm>({
    name: "",
    description: "",
    image: "",
    tag: "",
    href: "",
  });

  type OfferValidators = {
    offerName: ValidatorType;
    offerDescription: ValidatorType;
    offerImage: ValidatorType;
    offerTag: ValidatorType;
    offerHref: ValidatorType;
  };

  function addOffer() {
    const options = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        image: formData.image,
        tag: formData.tag,
        href: formData.href,
      }),
    };
    fetch(`http://localhost:5000/hotel-offers/`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode !== 400 && data.statusCode !== 500) {
          setModalContent("created");
          setIsModalVisible(true);
        } else {
          setModalContent("error");
          setIsModalVisible(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const validators: OfferValidators = {
    offerName: {
      fieldName: "offerName",
      validationFunction: () =>
        formData.name.match(/^[a-zA-Z\s]*$/) && formData.name.length > 0
          ? true
          : false,
    },
    offerDescription: {
      fieldName: "offerDescription",
      validationFunction: () =>
        formData.description.length > 0 ? true : false,
    },
    offerImage: {
      fieldName: "offerImage",
      validationFunction: () =>
        formData.image.match(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        )
          ? true
          : false,
    },
    offerTag: {
      fieldName: "offerTag",
      validationFunction: () =>
        formData.tag.match(/^[a-zA-Z\s]*$/) && formData.tag.length > 0
          ? true
          : false,
    },
    offerHref: {
      fieldName: "offerHref",
      validationFunction: () =>
        formData.href.match(/([A-Za-z0-9_-]+)/) && formData.href.length > 0
          ? true
          : false,
    },
  };

  const update = {
    name: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        name: value,
      })),
    description: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        description: value,
      })),
    tag: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        tag: value,
      })),
    image: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        image: value,
      })),
    href: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        href: value,
      })),
  };

  function handleSubmit(e: FormEvent) {
    Object.entries(validators).forEach(([key, value]: any) => {
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
      validators.offerName.validationFunction() &&
      validators.offerTag.validationFunction() &&
      validators.offerHref.validationFunction() &&
      validators.offerDescription.validationFunction() &&
      validators.offerImage.validationFunction()
    ) {
      addOffer();
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
            {modalContent == "error" && "Problem submitting your data"}
            {modalContent == "created" && "Entry added"}
          </Heading>
          {modalContent === "error" && (
            <div className={`flex flex-col gap-6 justify-center`}>
              <p>Something went wrong, please try again.</p>
              <div
                className={`flex flex-row gap-4 items-center justify-center`}
              >
                <Button
                  color="sea"
                  isActive
                  isSmall
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          {modalContent === "created" && (
            <div className={`flex flex-col gap-6 justify-center`}>
              <p>Offer added successfully.</p>
              <div
                className={`flex flex-row gap-4 items-center justify-between`}
              >
                <Button
                  color="outline"
                  isActive
                  isSmall
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </Button>
                <Link
                  href={"/dashboard/offers"}
                  className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
                >
                  Back to offers
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
      <DashboardWrapper active="offers">
        <div>
          <div className={`flex flex-row justify-between py-4 items-center`}>
            <Heading size={3} styles="col-span-full mb-8">{`${
              formData?.name ? formData.name : "New"
            } offer`}</Heading>
          </div>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className={`grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 md:gap-4`}
          >
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-1`}
            >
              <Heading size={5} styles="mb-4">
                Offer details
              </Heading>

              <InputField
                label="Offer name"
                name="offerName"
                id="offerName"
                value={formData.name}
                errorMessage="Please type a valid name (a-z)"
                validationCondition={() =>
                  validators.offerName.validationFunction()
                }
                validationOnSend={!validationErrors.includes("offerName")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  update.name(e.target.value);
                }}
              />
              <InputField
                label="Offer tag"
                name="offerTag"
                id="offerTag"
                value={formData.tag}
                errorMessage="Please type a valid tag (a-z)"
                validationCondition={() =>
                  validators.offerTag.validationFunction()
                }
                validationOnSend={!validationErrors.includes("offerTag")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  update.tag(e.target.value);
                }}
              />
              <InputField
                label="Offer slug"
                name="offerSlug"
                id="offerSlug"
                value={formData.href}
                errorMessage="Please type a valid slug (a-z, -, _)"
                validationCondition={() =>
                  validators.offerHref.validationFunction()
                }
                validationOnSend={!validationErrors.includes("offerHref")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  update.href(e.target.value);
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
                        validationErrors.indexOf("offerDescription"),
                        1
                      );
                    } else {
                      !validationErrors.includes("offerDescription") &&
                        setValidationErrors([
                          ...validationErrors,
                          "offerDescription",
                        ]);
                    }
                    setFormData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }));
                  }}
                ></textarea>
                {validationErrors.includes("offerDescription") && (
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
              {isOfferDataLoading && <Spinner></Spinner>}
              {formData.image.match(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
              ) ? (
                <Image
                  alt={"Invalid offer image"}
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
                label="Offer Image"
                name="offerImage"
                id="offerImage"
                value={formData.image}
                errorMessage="Please provide a valid link"
                validationCondition={() =>
                  validators.offerName.validationFunction()
                }
                validationOnSend={!validationErrors.includes("offerImage")}
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
                  href="/dashboard/offers"
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full font-semibold"
                >
                  Cancel
                </Link>
                <Button color="sea" isActive isSmall onClick={handleSubmit}>
                  Add offer
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
