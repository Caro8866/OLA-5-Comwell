import Header from "@/components/header/Header";
import InfoCard from "@/components/infoCard/InfoCard";
import Heading from "@/components/text/heading/Heading";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ExperienceCard from "@/components/experienceCard/ExperienceCard";
import Label from "@/components/label/Label";
import Button from "@/components/button/Button";
import Footer from "@/components/footer/Footer";
import { HotelPackage } from "@/utils/HotelPackage.types";
import Spinner from "@/components/spinner/Spinner";
import { Offer } from "@/utils/offer.types";
import { AuthContextProvider } from "@/context/AuthContext";
import SearchWidget from "@/components/searchWidget/SearchWidget";
import { BookingContextProvider } from "@/context/BookingContext";
import { BookingContext } from "@/context/BookingContext";
import { Hotel } from "@/utils/Hotel.types";
import { PeopleCount } from "@/utils/PeopleCount.types";
import BookingFormDrawer from "@/components/drawers/bookingForm/BookingFormDrawer";
import DateInputDrawer from "@/components/drawers/date/DateInputDrawer";
import HotelInputDrawer from "@/components/drawers/hotel/HotelInputDrawer";
import PeopleCountInputDrawer from "@/components/drawers/peopleCount/PeopleCountInputDrawer";

function Index() {
  const [arePkgLoading, setArePkgLoading] = useState(false);
  const [packages, setPackages] = useState<HotelPackage[]>([]);
  const [areOffersLoading, setAreOffersLoading] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [sliderRef, slider] = useKeenSlider(
    {
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3, spacing: 15 },
        },
      },
      slides: { perView: 1 },
    },
    []
  );

  useEffect(() => {
    setArePkgLoading(true);
    setAreOffersLoading(true);
    fetch("http://localhost:5000/packages")
      .then((response) => response.json())
      .then((data: HotelPackage[]) => {
        setPackages(data);
        setArePkgLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:5000/hotel-offers")
      .then((response) => response.json())
      .then((data: Offer[]) => {
        setOffers(data);
        setAreOffersLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* Drawer */
  const { bookingData, setBookingData } = useContext(BookingContext);

  const [bookingType, setBookingType] = useState("accomodation"); // ["accomodation", "conference", "banquet"]
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedPeopleCount, setSelectedPeopleCount] = useState<PeopleCount>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  // drawer states
  const [isHotelDrawerOpen, setHotelDrawerOpen] = useState(false);
  const [isPeopleCountDrawerOpen, setPeopleCountDrawerOpen] = useState(false);
  const [isDateDrawerOpen, setDateDrawerOpen] = useState(false);
  const [isBookingFormDrawerOpen, setBookingFormDrawerOpen] = useState(false);

  // drawer handlers
  const handleHotelDrawerOpen = () => {
    setHotelDrawerOpen(true);
  };

  const handleHotelDrawerClose = () => {
    setHotelDrawerOpen(false);
  };

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setBookingData({ ...bookingData, hotel: hotel });
  };

  const handlePeopleCountDrawerOpen = () => {
    setPeopleCountDrawerOpen(true);
  };

  const handlePeopleCountDrawerClose = () => {
    setPeopleCountDrawerOpen(false);
  };

  const handlePeopleCountSelect = (selectedPeopleCount: PeopleCount) => {
    setSelectedPeopleCount(selectedPeopleCount);
    setBookingData({ ...bookingData, peopleCount: selectedPeopleCount });
  };

  const handleDateDrawerOpen = () => {
    setDateDrawerOpen(true);
  };

  const handleDateDrawerClose = () => {
    setDateDrawerOpen(false);
  };

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setBookingData({ ...bookingData, startDate: startDate, endDate: endDate });
  };

  const handleSearch = () => {
    if (
      selectedHotel != null &&
      selectedPeopleCount != null &&
      selectedStartDate != null &&
      selectedEndDate != null
    ) {
      setBookingData({
        ...bookingData,
        hotel: selectedHotel,
        peopleCount: selectedPeopleCount,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });
      setBookingFormDrawerOpen(true);
    }
  };

  return (
    <>
      <AuthContextProvider>
        <BookingContextProvider>
          <Header />
          <main className={`max-w-screen overflow-hidden`}>
            <section
              id="hero"
              className={`w-full h-[calc(100vh-118px)] relative pt-[86px] z-20 `}
            >
              <div
                className={`bg-gradient-to-t from-transparent via-transparent to-[rgba(0,0,0,0.75)] h-64 w-full absolute z-10 top-0 left-0 pointer-events-none`}
              ></div>
              <div
                className={`w-full h-full z-20 relative max-w-2xl 2xl:max-w-[1600px] mx-auto flex justify-center items-center lg:justify-start lg:items-end pb-4 lg:pb-12`}
              >
                <div>
                  <SearchWidget
                    bookingType={bookingType}
                    setBookingType={setBookingType}
                    handleHotelDrawerOpen={handleHotelDrawerOpen}
                    handlePeopleCountDrawerOpen={handlePeopleCountDrawerOpen}
                    handleDateDrawerOpen={handleDateDrawerOpen}
                    handleSearch={handleSearch}
                  />
                </div>
              </div>
              <Image
                src="/img/hero.jpg"
                alt="placeholder"
                height={1000}
                width={1920}
                className={
                  "w-full brightness-90 contrast-[1.1] h-[calc(100vh-118px)] object-cover absolute top-0 left-0"
                }
              />
            </section>
            <HotelInputDrawer
              isOpen={isHotelDrawerOpen}
              onClose={handleHotelDrawerClose}
              onSelect={handleHotelSelect}
            />
            <PeopleCountInputDrawer
              isOpen={isPeopleCountDrawerOpen}
              onClose={handlePeopleCountDrawerClose}
              onSelect={handlePeopleCountSelect}
            />
            <DateInputDrawer
              isOpen={isDateDrawerOpen}
              onClose={handleDateDrawerClose}
              onSelect={handleDateSelect}
            />
            <BookingFormDrawer
              isOpen={isBookingFormDrawerOpen}
              onClose={() => setBookingFormDrawerOpen(false)}
            />

            <section
              id=""
              className={`max-w-screen-2xl 2xl:max-w-[1600px] grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 py-20 px-8 mx-auto`}
            >
              {areOffersLoading && (
                <div className={`col-span-3`}>
                  <Spinner />
                </div>
              )}
              {!areOffersLoading &&
                offers.length &&
                offers
                  .slice(-3)
                  .map((offer, index) => (
                    <InfoCard
                      key={offer._id}
                      src={offer.image}
                      title={offer.name}
                      description={offer.description}
                      label={offer.tag}
                      href={`/${offer.href}`}
                      styles={`${
                        index == 0 ? `col-span-2` : `col-span-1`
                      } md:col-span-1`}
                    />
                  ))}
            </section>
            <section className={`py-20  relative`}>
              <div
                className={`px-8 mx-auto 2xl:max-w-[1600px] mb-8 w-full flex flex-row justify-between`}
              >
                <Heading size={3}>Offers & Experiences</Heading>
                <Button
                  color="outline"
                  isActive
                  onClick={() => {
                    console.log("navigate to offers");
                  }}
                  isSmall
                >
                  See our offers and experiences
                </Button>
              </div>

              <div className={`w-screen overflow-visible`}>
                {arePkgLoading && <Spinner />}
                {packages.length > 0 && !arePkgLoading && (
                  <div
                    ref={sliderRef}
                    className={`keen-slider !overflow-visible max-w-[1600px] mx-auto px-8`}
                  >
                    {" "}
                    {packages.map((pkg, index) => {
                      return (
                        <ExperienceCard
                          key={pkg._id}
                          linkTo={`/packages/${pkg._id}`}
                          image={pkg.image}
                          title={pkg.name}
                          description={pkg.description}
                          tag={pkg.type.toUpperCase()}
                          price={pkg.price}
                          discount={
                            pkg.discount && pkg.discount > 0 ? pkg.discount : 0
                          }
                          styles={`keen-slider__slide number-slide${index}`}
                        />
                      );
                    })}{" "}
                  </div>
                )}
              </div>
            </section>
          </main>
          <Footer />
        </BookingContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default Index;
