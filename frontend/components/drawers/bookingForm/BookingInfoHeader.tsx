import { peopleCountToString } from "@/components/searchWidget/SearchWidget";
import BodyText from "@/components/text/bodyText/BodyText";
import { HotelRoom } from "@/utils/types";

type BookingInfoHeaderProps = {
  bookingData: {
    startDate: Date | null;
    endDate: Date | null;
    peopleCount: { adults: number; children: number; infants: number };
    hotel: string;
    selectedRoom: HotelRoom;
  };
  prevStep: () => void;
};

function BookingInfoHeader({ bookingData, prevStep }: BookingInfoHeaderProps) {
  const startDate = bookingData.startDate?.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const endDate = bookingData.endDate?.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <header className="flex flex-row justify-start items-center py-2 px-2 gap-4">
      <button className="flex items-center rounded-full bg-charcoal-20 p-2 ml-2" onClick={prevStep}>
        <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 -960 960 960" width="8">
          <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>
      <div className="flex flex-row justify-start items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-[16px] w-[16px]">
            <path fill="#161616" d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5Zm0 16.5h-15V9h15v10.5Zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3v3Z"></path>
          </svg>
          <BodyText color="black" styles="font-light text-xs" size={2}>
            {startDate} - {endDate}
          </BodyText>
        </div>

        <div className="self-stretch bg-charcoal-20 w-[1px]" />

        <div className="flex flex-row items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-[16px] w-[16px]">
            <path
              fill="#161616"
              d="M12.5 3a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0-1.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM20 22.5h-1.5v-3.75A3.75 3.75 0 0 0 14.75 15h-4.5a3.75 3.75 0 0 0-3.75 3.75v3.75H5v-3.75a5.25 5.25 0 0 1 5.25-5.25h4.5A5.25 5.25 0 0 1 20 18.75v3.75Z"
            ></path>
            <path fill="#000" d="M19 21v1.5H6V21z"></path>
          </svg>
          <BodyText color="black" styles="font-light text-xs" size={2}>
            {peopleCountToString(bookingData.peopleCount)}
          </BodyText>
        </div>

        <div className="self-stretch bg-charcoal-20 w-[1px]" />

        <div className="flex flex-row items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-[16px] w-[16px]">
            <g fill="currentColor">
              <path d="M12 13.5A3.75 3.75 0 1 1 12 6a3.75 3.75 0 0 1 0 7.5zm0-6a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z"></path>
              <path d="m12 22.5-6.327-7.462a26.911 26.911 0 0 1-.26-.338A8.167 8.167 0 0 1 3.75 9.75a8.25 8.25 0 1 1 16.5 0 8.163 8.163 0 0 1-1.661 4.948l-.001.002s-.225.296-.259.335zm-5.39-8.704s.174.231.214.281L12 20.181l5.183-6.113.209-.274A6.676 6.676 0 0 0 18.75 9.75a6.75 6.75 0 0 0-13.5 0 6.68 6.68 0 0 0 1.36 4.046z"></path>
            </g>
          </svg>
          <BodyText color="black" styles="font-light text-xs" size={2}>
            {bookingData.hotel}
          </BodyText>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start">
        {/*    
              <BodyText color="black" styles="font-light text-xs" size={2}>
          1 room
        </BodyText>
      <BodyText color="black" styles="font-light text-xs" size={2}>
          {bookingData.selectedRoom.price ? bookingData.selectedRoom.price : "0 kr."}
        </BodyText> */}
      </div>
    </header>
  );
}

export default BookingInfoHeader;
