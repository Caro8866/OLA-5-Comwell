import Link from "next/link";
import React from "react";

type Props = {
  bookings: any[] | undefined;
};

function BookingList(props: Props) {
  console.log(props.bookings);
  return (
    <section className={`flex flex-col gap-2 py-4 max-h-96 overflow-y-scroll`}>
      <header
        className={`grid grid-cols-12 gap-2 px-2 lg:px-4 text-charcoal-60 font-medium`}
      >
        <p className={`col-span-6 lg:col-span-5 xl:col-span-4`}>Room name</p>
        <p className={`col-span-5 lg:col-span-2 xl:col-span-3`}>Date</p>
        <p className={`col-span-1 hidden lg:flex`}>Amount</p>
        <p className={`col-span-2 hidden lg:flex flex-row justify-center`}>
          Price
        </p>
        <p className={`col-span-1 lg:col-span-2 flex flex-row justify-end`}>
          Options
        </p>
      </header>
      {props.bookings &&
        props.bookings.slice(0, 5).map((booking) => (
          <article
            key={booking._id}
            className={`grid grid-cols-12 gap-2 rounded border px-2 lg:px-4 py-2 text-charcoal-80 `}
          >
            <div
              className={`col-span-6 lg:col-span-5 xl:col-span-4 flex flex-col gap-1 justify-center`}
            >
              <p
                className={`font-medium text-mobile-xsmall-desktop md:text-heading-tiny-desktop 2xl:text-heading-xsmall-desktop`}
              >{`${booking.rooms[0].name} room`}</p>
              <p
                className={`text-charcoal-60 text-trumpet-mobile lg:text-trumpet-desktop font-medium`}
              >{`#${booking._id}`}</p>
            </div>
            <div
              className={`col-span-3 lg:col-span-2 xl:col-span-3 flex flex-row justify-start items-center text-trumpet-desktop`}
            >
              <p>{`${booking.checkInDate.slice(
                0,
                10
              )} - ${booking.checkOutDate.slice(0, 10)}`}</p>
            </div>
            <div
              className={`hidden lg:flex flex-row items-center justify-center gap-2 font-medium`}
            >
              {booking.peopleCount.adults +
                booking.peopleCount.children +
                booking.peopleCount.infants}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6`}
              >
                <path
                  d="M19.5 10.5H18V12H19.5C20.0965 12.0007 20.6685 12.2379 21.0903 12.6597C21.5121 13.0815 21.7493 13.6535 21.75 14.25V17.25H23.25V14.25C23.2488 13.2558 22.8534 12.3026 22.1504 11.5996C21.4474 10.8966 20.4942 10.5012 19.5 10.5Z"
                  fill="#252C2F"
                />
                <path
                  d="M18 3C18.445 3 18.88 3.13196 19.25 3.37919C19.62 3.62643 19.9084 3.97783 20.0787 4.38896C20.249 4.8001 20.2936 5.2525 20.2068 5.68895C20.12 6.12541 19.9057 6.52632 19.591 6.84099C19.2763 7.15566 18.8754 7.36995 18.439 7.45677C18.0025 7.54358 17.5501 7.49903 17.139 7.32873C16.7278 7.15843 16.3764 6.87004 16.1292 6.50003C15.882 6.13002 15.75 5.69501 15.75 5.25C15.75 4.65326 15.9871 4.08097 16.409 3.65901C16.831 3.23705 17.4033 3 18 3ZM18 1.5C17.2583 1.5 16.5333 1.71993 15.9166 2.13199C15.2999 2.54404 14.8193 3.12971 14.5355 3.81494C14.2516 4.50016 14.1774 5.25416 14.3221 5.98159C14.4667 6.70902 14.8239 7.3772 15.3483 7.90165C15.8728 8.4261 16.541 8.78325 17.2684 8.92795C17.9958 9.07264 18.7498 8.99838 19.4351 8.71455C20.1203 8.43072 20.706 7.95007 21.118 7.33339C21.5301 6.7167 21.75 5.99168 21.75 5.25C21.75 4.25544 21.3549 3.30161 20.6516 2.59835C19.9484 1.89509 18.9946 1.5 18 1.5Z"
                  fill="#252C2F"
                />
                <path
                  d="M17.25 22.5H15.75V21C15.7493 20.4035 15.5121 19.8315 15.0903 19.4097C14.6685 18.9879 14.0965 18.7507 13.5 18.75H10.5C9.90346 18.7507 9.33155 18.9879 8.90973 19.4097C8.48792 19.8315 8.25066 20.4035 8.25 21V22.5H6.75V21C6.75117 20.0058 7.14664 19.0527 7.84964 18.3496C8.55265 17.6466 9.5058 17.2512 10.5 17.25H13.5C14.4942 17.2512 15.4473 17.6466 16.1504 18.3496C16.8534 19.0527 17.2488 20.0058 17.25 21V22.5Z"
                  fill="#252C2F"
                />
                <path
                  d="M12 9.75C12.445 9.75 12.88 9.88196 13.25 10.1292C13.62 10.3764 13.9084 10.7278 14.0787 11.139C14.249 11.5501 14.2936 12.0025 14.2068 12.439C14.12 12.8754 13.9057 13.2763 13.591 13.591C13.2763 13.9057 12.8754 14.12 12.439 14.2068C12.0025 14.2936 11.5501 14.249 11.139 14.0787C10.7278 13.9084 10.3764 13.62 10.1292 13.25C9.88196 12.88 9.75 12.445 9.75 12C9.75 11.4033 9.98705 10.831 10.409 10.409C10.831 9.98705 11.4033 9.75 12 9.75ZM12 8.25C11.2583 8.25 10.5333 8.46993 9.91661 8.88199C9.29993 9.29404 8.81928 9.87971 8.53545 10.5649C8.25162 11.2502 8.17736 12.0042 8.32205 12.7316C8.46675 13.459 8.8239 14.1272 9.34835 14.6517C9.8728 15.1761 10.541 15.5333 11.2684 15.6779C11.9958 15.8226 12.7498 15.7484 13.4351 15.4645C14.1203 15.1807 14.706 14.7001 15.118 14.0834C15.5301 13.4667 15.75 12.7417 15.75 12C15.75 11.0054 15.3549 10.0516 14.6517 9.34835C13.9484 8.64509 12.9946 8.25 12 8.25Z"
                  fill="#252C2F"
                />
                <path
                  d="M6 10.5H4.5C3.5058 10.5012 2.55265 10.8966 1.84964 11.5996C1.14664 12.3027 0.751171 13.2558 0.75 14.25V17.25H2.25V14.25C2.25066 13.6535 2.48792 13.0815 2.90973 12.6597C3.33155 12.2379 3.90346 12.0007 4.5 12H6V10.5Z"
                  fill="#252C2F"
                />
                <path
                  d="M6 3C6.44501 3 6.88002 3.13196 7.25003 3.37919C7.62004 3.62643 7.90843 3.97783 8.07873 4.38896C8.24903 4.8001 8.29358 5.2525 8.20677 5.68895C8.11995 6.12541 7.90566 6.52632 7.59099 6.84099C7.27632 7.15566 6.87541 7.36995 6.43895 7.45677C6.0025 7.54358 5.5501 7.49903 5.13896 7.32873C4.72783 7.15843 4.37643 6.87004 4.12919 6.50003C3.88196 6.13002 3.75 5.69501 3.75 5.25C3.75 4.65326 3.98705 4.08097 4.40901 3.65901C4.83097 3.23705 5.40326 3 6 3ZM6 1.5C5.25832 1.5 4.5333 1.71993 3.91661 2.13199C3.29993 2.54404 2.81928 3.12971 2.53545 3.81494C2.25162 4.50016 2.17736 5.25416 2.32206 5.98159C2.46675 6.70902 2.8239 7.3772 3.34835 7.90165C3.8728 8.4261 4.54098 8.78325 5.26841 8.92795C5.99584 9.07264 6.74984 8.99838 7.43506 8.71455C8.12029 8.43072 8.70596 7.95007 9.11801 7.33339C9.53007 6.7167 9.75 5.99168 9.75 5.25C9.75 4.25544 9.35491 3.30161 8.65165 2.59835C7.94839 1.89509 6.99456 1.5 6 1.5Z"
                  fill="#252C2F"
                />
              </svg>
            </div>
            <div
              className={`col-span-1 lg:col-span-2 hidden lg:flex items-center justify-center`}
            >
              <p className={`font-medium`}>{`${booking.price} DKK`}</p>
            </div>
            <div
              className={`col-span-3 lg:col-span-2 flex flex-row items-center justify-end gap-2 md:gap-4`}
            >
              <Link
                href={`/dashboard/bookings/${booking._id}`}
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
          </article>
        ))}
    </section>
  );
}

export default BookingList;
