import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";
import Heading from "@/components/text/heading/Heading";
import BodyText from "@/components/text/bodyText/BodyText";
import Button from "@/components/button/Button";

type AddonsProps = {
  onNext: () => void;
};

function Addons({ onNext }: AddonsProps) {
  const { bookingData, setBookingData } = useContext(BookingContext);

  const handleAddonChange = (
    addon: {
      name: string;
      price: number;
      description?: string;
      image?: string;
    },
    isChecked: boolean
  ) => {
    if (isChecked) {
      setBookingData({
        ...bookingData,
        selectedAddons: [...bookingData.selectedAddons, addon],
      });
    } else {
      setBookingData({
        ...bookingData,
        selectedAddons: bookingData.selectedAddons.filter(
          (a) => a.name !== addon.name
        ),
      });
    }
  };

  return (
    <div className={`h-full flex flex-col pr-4`}>
      <Heading size={3} color="black" styles="font-light mb-6">
        Select Addons
      </Heading>
      <section className={`grid grid-cols-2 gap-4`}>
        {bookingData.hotel &&
          bookingData.hotel.addons.map(
            (
              addon: {
                name: string;
                price: number;
                description?: string;
                image?: string;
              },
              index
            ) => (
              <div
                className={`border rounded-lg flex flex-col p-4 group hover:border-charcoal-80 ${
                  bookingData.selectedAddons.includes(addon)
                    ? `border-charcoal-80`
                    : ""
                }`}
                onClick={(e) => {
                  let isAlreadySelected = false;
                  if (bookingData.selectedAddons.includes(addon)) {
                    isAlreadySelected = true;
                  }
                  handleAddonChange(addon, !isAlreadySelected);
                }}
                key={index}
              >
                {/* <input
                  type="checkbox"
                  onChange={(e) => handleAddonChange(addon, e.target.checked)}
                /> */}
                <div
                  className={`flex flex-row justify-between mb-2 gap-4 relative`}
                >
                  <div
                    className={`flex flex-col md:flex-row justify-between w-full md:mr-12`}
                  >
                    <Heading size={5}>{addon.name}</Heading>{" "}
                    <Heading size={5}>{`${addon.price} kr.`}</Heading>
                  </div>
                  <span
                    className={`min-w-[24px] min-h-[24px] border-box border rounded-full group-hover:border-charcoal-80 flex justify-center items-center p-[1px] absolute right-0 top-0 ${
                      bookingData.selectedAddons.includes(addon)
                        ? `!bg-charcoal-80 border-charcoal-80`
                        : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      className={`w-3/4 opacity-0 fill-slate-50 w-[18px] h-[18px] ${
                        bookingData.selectedAddons.includes(addon)
                          ? `!opacity-100`
                          : ""
                      }`}
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  </span>
                </div>
                <BodyText size={1} styles={`tracking-tighter text-charcoal-80`}>
                  {addon.description}
                </BodyText>
              </div>
            )
          )}
      </section>
      <div className={`flex grow`}></div>
      <section
        className={`flex flex-row self-end w-full mb-0 py-6 border-t justify-end`}
      >
        <Button color={"sea"} isActive onClick={onNext} styles="flex">
          Next
        </Button>
      </section>
    </div>
  );
}

export default Addons;
