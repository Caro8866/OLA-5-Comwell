import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardWrapper from "@/components/cms/dashboardWrapper/DashboardWrapper";
import Heading from "@/components/text/heading/Heading";
import InputField from "@/components/formField/InputField";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/button/Button";
import Link from "next/link";
import { User } from "@/utils/user.types";

function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("update");
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [formData, setFormData] = useState({
    _id: "",
    email: "",
    fullName: "",
    zipCode: 0,
    phone: 0,
    gender: "Prefer not to say",
    dateOfBirth: "",
    roles: "",
  });

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    setIsUserDataLoading(true);
    const fetchData = async () => {
      fetch(`http://localhost:5000/users/${slug}`)
        .then((response) => response.json())
        .then((data: User) => {
          setUserData(data);
          setFormData(data);
          setIsUserDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  function updateUser() {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        roles:
          formData.roles.length === 1
            ? formData.roles
            : formData.roles.split(", "),
      }),
    };
    fetch(`http://localhost:5000/users/${slug}`, options)
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
    fetch(`http://localhost:5000/users/${slug}`, options)
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
    fullName: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        fullName: value,
      })),

    email: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        email: value,
      })),

    zipCode: (value: number) =>
      setFormData((prevState) => ({
        ...prevState,
        zipCode: Number(value),
      })),

    phone: (value: number) =>
      setFormData((prevState) => ({
        ...prevState,
        phone: Number(value),
      })),

    gender: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        gender: value,
      })),

    dateOfBirth: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        dateOfBirth: value,
      })),

    roles: (value: string) =>
      setFormData((prevState) => ({
        ...prevState,
        roles: value,
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
                href={"/dashboard/users"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to users
              </Link>
            </div>
          )}
          {modalContent === "delete" && (
            <div className={`flex flex-row gap-4 items-center justify-center`}>
              <Link
                href={"/dashboard/offers"}
                className={`flex px-6 py-2 rounded-full bg-sea-80 hover:bg-sea-100 transition text-slate-50`}
              >
                Back to users
              </Link>
            </div>
          )}
        </section>
      </div>
      <DashboardWrapper active="users">
        <div>
          <div className={`flex flex-row justify-between py-4 items-center`}>
            <Heading
              size={3}
              styles="col-span-full mb-8"
            >{`${userData?.fullName} user`}</Heading>
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
                Delete user
              </span>
            </Button>
          </div>
          <form
            className={`gap-2 md:gap-4`}
            onSubmit={(e) => e.preventDefault()}
          >
            <section
              className={`w-full bg-slate-50 rounded-lg px-2 lg:px-4 py-4 flex flex-col gap-4`}
            >
              {isUserDataLoading ? (
                <Spinner></Spinner>
              ) : (
                <>
                  <Heading size={5} styles="mb-4">
                    User details
                  </Heading>

                  <InputField
                    label="Full name"
                    name="user_name"
                    id="user_name"
                    value={formData.fullName}
                    onChange={(e) => {
                      update.fullName(e.target.value);
                    }}
                  />
                  <InputField
                    label="Email"
                    name="user_email"
                    id="user_email"
                    value={formData.email}
                    onChange={(e) => {
                      update.email(e.target.value);
                    }}
                  />
                  <InputField
                    label="Zip code"
                    name="user_zip"
                    id="user_zip"
                    value={formData.zipCode}
                    onChange={(e) => {
                      update.zipCode(e.target.value);
                    }}
                  />
                  <InputField
                    label="Phone"
                    name="user_phone"
                    id="user_phone"
                    value={formData.phone}
                    onChange={(e) => {
                      update.phone(e.target.value);
                    }}
                  />
                  <InputField
                    label="Date of birth"
                    name="user_dateOfBirth"
                    id="user_dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth.split("T")[0]}
                    onChange={(e) => {
                      update.dateOfBirth(e.target.value);
                    }}
                  />

                  <div
                    className={`flex max-content flex-col border-2 rounded border-gray-300 px-3 py-4 relative transition hover:border-gray-400 `}
                  >
                    <select
                      name="gender"
                      className="bg-inherit text-medium font-semibold pt-2.5"
                      value={formData.gender}
                      onChange={(e) => {
                        update.gender(e.target.value);
                      }}
                    >
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>

                    <label
                      htmlFor={"gender"}
                      className="font-sans absolute bottom-2/4 transition translate-y-[-15%] text-gray-600 font-medium"
                    >
                      Gender
                    </label>
                  </div>
                  <InputField
                    label="Roles"
                    name="user_roles"
                    id="user_roles"
                    value={formData.roles}
                    onChange={(e) => {
                      update.roles(e.target.value);
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
                  href="/dashboard/users"
                  className="bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100 px-10 box-border block transition py-1.5 rounded-full"
                >
                  Cancel
                </Link>
                <Button
                  color="sea"
                  isActive
                  isSmall
                  onClick={() => {
                    updateUser();
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
