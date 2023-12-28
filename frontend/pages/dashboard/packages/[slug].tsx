import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Heading from "@/components/text/heading/Heading";
import InputField from "@/components/formField/InputField";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/button/Button";
import Link from "next/link";
import { HotelPackage } from "@/utils/HotelPackage.types";

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [isPackageDataLoading, setIsPackageDataLoading] = useState(false);
  const [packageData, setPackageData] = useState<HotelPackage>();
  const [formData, setFormData] = useState<HotelPackage>({
    _id: "",
    name: "",
    description: "",
    image: "",
    price: 0,
    type: "",
    tags: [],
    discount: 0,
  });
  const [tagName, setTagName] = useState("");

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    setIsPackageDataLoading(true);
    const fetchData = async () => {
      fetch(`http://localhost:5000/packages/${slug}`)
        .then((response) => response.json())
        .then((data: HotelPackage) => {
          setPackageData(data);
          setFormData(data);
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

  function updatePackage() {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:5000/packages/${slug}`, options)
      .then((response) => response.json())
      .then((data) => {
        setModalContent("update");
        setIsModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deletePackage() {
    const options = {
      method: "DELETE",
    };
    fetch(`http://localhost:5000/packages/${slug}`, options)
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

  return (
    <div>
      <div
        className={`fixed w-full h-screen z-50 items-center justify-center bg-sea-80 bg-opacity-50 ${
          isModalVisible ? "flex" : "hidden"
        }`}
      >
        <section className={`p-4 bg-white rounded-lg border`}>
          <Heading size={5} styles="mb-6 justify-center flex w-full">
            {modalContent == "update" && "Entry Updated"}
            {modalContent == "remove" && "Entry Removed"}
            {modalContent == "tag" && "Add new tag"}
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
                href={"/dashboard/packages"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to packages
              </Link>
            </div>
          )}
          {modalContent === "delete" && (
            <div className={`flex flex-row gap-4 items-center justify-center`}>
              <Link
                href={"/dashboard/packages"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to packages
              </Link>
            </div>
          )}
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
        </section>
      </div>
      <DashboardWrapper active="packages">
        <div>
          <div className={`flex flex-row justify-between py-4 items-center`}>
            <Heading
              size={3}
              styles="col-span-full mb-8"
            >{`${packageData?.name} package`}</Heading>
            <Button
              styles={
                "hover:text-errorRed border border-transparent hover:border-errorRed group duration-300"
              }
              color="blank"
              isActive
              isSmall
              onClick={() => {
                deletePackage();
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
                Delete package
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
                Package details
              </Heading>

              <InputField
                label="Package name"
                name="package_name"
                id="package_name"
                value={formData.name}
                onChange={(e) => {
                  update.name(e.target.value);
                }}
              />
              <InputField
                label="Package type"
                name="package_type"
                id="package_type"
                value={formData.type}
                onChange={(e) => {
                  update.type(e.target.value);
                }}
              />
              <InputField
                type="text"
                label="Package price multiplier"
                name="package_price"
                id="package_price"
                value={formData.price}
                onChange={(e) => {
                  update.price(e.target.value);
                }}
              />
              <InputField
                label="Package discount"
                name="package_discount"
                id="package_discount"
                value={formData.discount}
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
                  className={`flex min-h-48 w-full resize-none flex-col border-2 rounded border-gray-300 px-3 py-4 pt-6 font-sans relative transition hover:border-gray-400 active:outline-none focus:outline-none focus:border-charcoal-100`}
                  rows={6}
                  defaultValue={formData.description}
                  onChange={(e) => {
                    update.description(e.target.value);
                  }}
                ></textarea>
              </div>
            </section>
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4 col-span-1`}
            >
              {isPackageDataLoading && <Spinner></Spinner>}
              {packageData && (
                <Image
                  alt={packageData.name}
                  src={packageData?.image}
                  width={512}
                  height={400}
                  className={`w-full h-80 object-cover rounded-lg`}
                />
              )}
              <InputField
                label="Package Image"
                name="package_image"
                id="package_image"
                value={formData.image}
                onChange={(e) => {
                  update.image(e.target.value);
                }}
              />
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
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full"
                >
                  Cancel
                </Link>
                <Button
                  color="sea"
                  isActive
                  isSmall
                  onClick={() => {
                    updatePackage();
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
