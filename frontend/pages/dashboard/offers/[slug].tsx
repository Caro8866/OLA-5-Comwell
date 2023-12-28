import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Heading from "@/components/text/heading/Heading";
import InputField from "@/components/formField/InputField";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/button/Button";
import Link from "next/link";
import { Offer } from "@/utils/offer.types";

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [isOfferDataLoading, setIsOfferDataLoading] = useState(false);
  const [offerData, setOfferData] = useState<Offer>();
  const [formData, setFormData] = useState<Offer>({
    _id: "",
    name: "",
    description: "",
    image: "",
    tag: "",
    href: "",
  });

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    setIsOfferDataLoading(true);
    const fetchData = async () => {
      fetch(`http://localhost:5000/hotel-offers/${slug}`)
        .then((response) => response.json())
        .then((data: Offer) => {
          setOfferData(data);
          setFormData(data);
          setIsOfferDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  function updateOffer() {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:5000/hotel-offers/${slug}`, options)
      .then((response) => response.json())
      .then((data) => {
        setModalContent("update");
        setIsModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteOffer() {
    const options = {
      method: "DELETE",
    };
    fetch(`http://localhost:5000/hotel-offers/${slug}`, options)
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
    href: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        href: value,
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
            {modalContent == "delete" && "Entry Removed"}
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
                href={"/dashboard/offers"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to offers
              </Link>
            </div>
          )}
          {modalContent === "delete" && (
            <div className={`flex flex-row gap-4 items-center justify-center`}>
              <Link
                href={"/dashboard/offers"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to offers
              </Link>
            </div>
          )}
        </section>
      </div>
      <DashboardWrapper active="offers">
        <div>
          <div className={`flex flex-row justify-between py-4 items-center`}>
            <Heading
              size={3}
              styles="col-span-full mb-8"
            >{`${offerData?.name} offer`}</Heading>
            <Button
              styles={
                "hover:text-errorRed border border-transparent hover:border-errorRed group duration-300"
              }
              color="blank"
              isActive
              isSmall
              onClick={() => {
                deleteOffer();
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
                Delete offer
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
                Offer details
              </Heading>

              <InputField
                label="Offer name"
                name="offer_name"
                id="offer_name"
                value={formData.name}
                onChange={(e) => {
                  update.name(e.target.value);
                }}
              />
              <InputField
                label="Offer tag"
                name="offer_tag"
                id="offer_tag"
                value={formData.tag}
                onChange={(e) => {
                  update.tag(e.target.value);
                }}
              />
              <InputField
                label="Offer slug"
                name="offer_slug"
                id="offer_slug"
                value={formData.href}
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
              {isOfferDataLoading && <Spinner></Spinner>}
              {offerData && (
                <Image
                  alt={offerData.name}
                  src={offerData?.image}
                  width={512}
                  height={400}
                  className={`w-full h-80 object-cover rounded-lg`}
                />
              )}
              <InputField
                label="Offer Image"
                name="offer_image"
                id="offer_image"
                value={formData.image}
                onChange={(e) => {
                  update.image(e.target.value);
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
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full"
                >
                  Cancel
                </Link>
                <Button
                  color="sea"
                  isActive
                  isSmall
                  onClick={() => {
                    updateOffer();
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
