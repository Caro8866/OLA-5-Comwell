import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HotelPackage, HotelPackageForm } from "@/utils/HotelPackage.types";
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
  const [isPackageDataLoading, setIsPackageDataLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [tagName, setTagName] = useState("");
  const [formData, setFormData] = useState<HotelPackageForm>({
    name: "",
    description: "",
    image: "",
    price: 0,
    type: "",
    tags: [],
    discount: 0,
  });

  type PackageValidators = {
    packageName: ValidatorType;
    packageDescription: ValidatorType;
    packageImage: ValidatorType;
    packagePrice: ValidatorType;
    packageDiscount: ValidatorType;
    packageType: ValidatorType;
  };

  function addPackage() {
    const options = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        discount: formData.discount,
        description: formData.description,
        image: formData.image,
        price: formData.price,
        tags: formData.tags,
        type: formData.type,
      }),
    };
    fetch(`http://localhost:5000/packages/`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode !== 400 && data.statusCode !== 500) {
          setModalContent("update");
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

  const validators: PackageValidators = {
    packageName: {
      fieldName: "packageName",
      validationFunction: () =>
        formData.name.match(/^[a-zA-Z\s]*$/) && formData.name.length > 0
          ? true
          : false,
    },
    packagePrice: {
      fieldName: "packagePrice",
      validationFunction: () => formData.price > 0,
    },
    packageDiscount: {
      fieldName: "packageDiscount",
      validationFunction: () => formData.discount >= 0,
    },
    packageDescription: {
      fieldName: "packageDescription",
      validationFunction: () =>
        formData.description.length > 0 ? true : false,
    },
    packageImage: {
      fieldName: "packageImage",
      validationFunction: () =>
        formData.image.match(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        )
          ? true
          : false,
    },
    packageType: {
      fieldName: "packageType",
      validationFunction: () =>
        formData.name.match(/^[a-zA-Z\s]*$/) && formData.name.length > 0
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
    price: (value: string) => {
      let convertedValue: number;
      if (!value.match(/^[+-]?(\d*\.)?\d+$/)) {
        convertedValue = formData.price;
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
      if (!value.match(/^[+-]?(\d*\.)?\d+$/)) {
        convertedValue = formData.discount;
      } else {
        convertedValue = parseFloat(value);
      }
      setFormData((prevState) => ({
        ...prevState,
        discount: convertedValue,
      }));
    },
    description: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        description: value,
      })),
    type: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        type: value,
      })),
    image: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        image: value,
      })),
    tag: (value: string) => (
      setFormData((prevState) => ({
        ...prevState,
        tags: [...formData.tags, tagName],
      })),
      setTagName("")
    ),
    removeTag: (value: string) => {
      const filteredTags = formData.tags.filter((tag) => tag !== value);
      setFormData((prevState) => ({
        ...prevState,
        tags: [...filteredTags],
      }));
    },
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
      validators.packageName.validationFunction() &&
      validators.packageDiscount.validationFunction() &&
      validators.packagePrice.validationFunction() &&
      validators.packageDescription.validationFunction() &&
      validators.packageImage.validationFunction() &&
      validators.packageType.validationFunction()
    ) {
      addPackage();
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
            {modalContent == "tag" && "Add new tag"}
            {modalContent == "error" && "Problem submitting your data"}
          </Heading>
          {modalContent === "tag" && (
            <div className={`flex flex-col gap-6`}>
              <InputField
                label="Tag name"
                name="tag"
                id="tag"
                value={tagName}
                onChange={(e) => {
                  setTagName(e.target.value);
                }}
              />
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
                <Button
                  color="outline"
                  isActive
                  isSmall
                  onClick={() => {
                    update.tag(tagName);
                    setIsModalVisible(false);
                  }}
                >
                  Add tag
                </Button>
              </div>
            </div>
          )}
          {modalContent === "error" && (
            <div className={`flex flex-col gap-6`}>
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
        </section>
      </div>
      <DashboardWrapper active="packages">
        <div>
          <div className={`flex flex-row justify-between py-4 items-center`}>
            <Heading size={3} styles="col-span-full mb-8">{`${
              formData?.name ? formData.name : "New"
            } package`}</Heading>
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
                Package details
              </Heading>

              <InputField
                label="Package name"
                name="packageName"
                id="packageName"
                value={formData.name}
                errorMessage="Please type a valid name (a-z)"
                validationCondition={() =>
                  validators.packageName.validationFunction()
                }
                validationOnSend={!validationErrors.includes("packageName")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  update.name(e.target.value);
                }}
              />

              <InputField
                label="Package price multiplier"
                name="package_price"
                id="package_price"
                value={formData.price}
                errorMessage="Please enter valid price"
                validationCondition={() =>
                  validators.packagePrice.validationFunction()
                }
                validationOnSend={!validationErrors.includes("packagePrice")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  update.price(e.target.value);
                }}
              />
              <InputField
                label="Package discount"
                name="packageDiscount"
                id="packageDiscount"
                value={formData.discount}
                errorMessage="Please enter a valid size"
                validationCondition={() =>
                  validators.packageDiscount.validationFunction()
                }
                validationOnSend={!validationErrors.includes("packageSize")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  update.discount(e.target.value);
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
                        validationErrors.indexOf("packageDescription"),
                        1
                      );
                    } else {
                      !validationErrors.includes("packageDescription") &&
                        setValidationErrors([
                          ...validationErrors,
                          "packageDescription",
                        ]);
                    }
                    setFormData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }));
                  }}
                ></textarea>
                {validationErrors.includes("packageDescription") && (
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
              {isPackageDataLoading && <Spinner></Spinner>}
              {formData.image.match(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
              ) ? (
                <Image
                  alt={"Invalid package image"}
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
                label="Package Image"
                name="package_image"
                id="package_image"
                value={formData.image}
                errorMessage="Please provide a link"
                validationCondition={() =>
                  validators.packageName.validationFunction()
                }
                validationOnSend={!validationErrors.includes("packageImage")}
                setValidationErrors={setValidationErrors}
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    image: e.target.value,
                  }));
                }}
              />{" "}
              <div className={`flex flex-row justify-between py-1`}>
                <Heading size={5}>Tags</Heading>
                <Button
                  color="outline"
                  isSmall
                  isActive
                  onClick={() => {
                    setModalContent("tag");
                    setIsModalVisible(true);
                  }}
                >
                  Add tag
                </Button>
              </div>
              <ul className={`flex flex-col gap-4 font-medium`}>
                {formData.tags.map((tag) => (
                  <li
                    className={`w-full flex flex-row justify-between group rounded-full hover:bg-sea-20 px-2 pr-1 py-1 transition items-center`}
                    key={tag}
                  >
                    {tag}
                    <span
                      className={`w-8 h-8 rounded-full group-hover:bg-errorRed flex items-center justify-center cursor-pointer `}
                      onClick={() => update.removeTag(tag)}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`fill-charcoal-60 group-hover:fill-white transition duration-300`}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15 1.5H9V3H15V1.5ZM3 4.5V6H4.5V21C4.5 21.8284 5.17157 22.5 6 22.5H18C18.8284 22.5 19.5 21.8284 19.5 21V6H21V4.5H3ZM6 21V6H18V21H6ZM9 9H10.5V18H9V9ZM15 9H13.5V18H15V9Z"
                        />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
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
                  href="/dashboard/packages"
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full font-semibold"
                >
                  Cancel
                </Link>
                <Button color="sea" isActive isSmall onClick={handleSubmit}>
                  Add package
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
