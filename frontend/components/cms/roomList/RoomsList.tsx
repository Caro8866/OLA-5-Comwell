import { HotelRoom } from "@/utils/HotelRoom.types";
import React from "react";
import Image from "next/image";
import Heading from "@/components/text/heading/Heading";
import Link from "next/link";

type Props = {
  rooms: HotelRoom[] | undefined;
};

function RoomsList(props: Props) {
  return (
    <div className="relative">
      <div
        className={`absolute bottom-0 left-0 w-full h-6 z-10 bg-gradient-to-b from-transparent to-slate-50`}
      ></div>
      <div
        className={`flex flex-col gap-2 pt-4 max-h-52 xl:max-h-[32rem] overflow-y-scroll relative pb-6`}
      >
        {props.rooms &&
          props.rooms.length &&
          props.rooms.map((room) => (
            <article
              className={`rounded border h-32 flex flex-row items-center border-box`}
              key={room._id}
            >
              <Image
                height={60}
                width={100}
                src={room.image}
                alt={room.name}
                className={`flex object-cover rounded-l h-auto aspect-[4/3] w-[82px]`}
              />
              <div
                className={`grid grid-cols-12 items-center justify-between w-full pr-4 md:pr-2 xl:pr-4`}
              >
                <div className={`flex flex-col gap-1 ml-2 col-span-6`}>
                  <Heading size={6}>{room.name}</Heading>
                  <p
                    className={`text-trumpet-desktop font-medium text-charcoal-60`}
                  >
                    {`${room.size} m2`}
                  </p>
                </div>
                <div
                  className={`col-span-2 flex md:text-trumpet-desktop lg:flex items-center justify-end font-medium`}
                >
                  {`${room.price} DKK`}
                </div>
                <div
                  className={`flex flex-row items-center gap-2 md:gap-4 justify-self-end col-span-4`}
                >
                  <Link
                    href={`/dashboard/rooms/${room._id}`}
                    className={`flex justify-center items-center border rounded-full p-2 group hover:bg-sea-80 hover:border-sea-80 transition`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition fill-charcoal-80 group-hover:fill-slate-50`}
                    >
                      <path d="M22.5 19.5H1.5V21H22.5V19.5Z" />
                      <path d="M19.05 6.75C19.65 6.15 19.65 5.25 19.05 4.65L16.35 1.95C15.75 1.35 14.85 1.35 14.25 1.95L3 13.2V18H7.8L19.05 6.75ZM15.3 3L18 5.7L15.75 7.95L13.05 5.25L15.3 3ZM4.5 16.5V13.8L12 6.3L14.7 9L7.2 16.5H4.5Z" />
                    </svg>
                  </Link>
                  <span
                    className={`flex justify-center items-center border rounded-full p-2 group hover:bg-sea-80 hover:border-sea-80 transition cursor-pointer`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition fill-charcoal-80 group-hover:fill-slate-50`}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15 1.5H9V3H15V1.5ZM3 4.5V6H4.5V21C4.5 21.8284 5.17157 22.5 6 22.5H18C18.8284 22.5 19.5 21.8284 19.5 21V6H21V4.5H3ZM6 21V6H18V21H6ZM9 9H10.5V18H9V9ZM15 9H13.5V18H15V9Z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}

export default RoomsList;
