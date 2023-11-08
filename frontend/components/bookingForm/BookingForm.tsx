"use client";
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

interface People {
  adults: number;
  children: number;
  infants: number;
}

const BookingForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [hotel, setHotel] = useState("");
  const [rooms, setRooms] = useState("");
  const [people, setPeople] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const openDrawer = (field: string) => {
    setCurrentField(field);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleSelectOption = (option: string) => {
    switch (currentField) {
      case "hotel":
        setHotel(option);
        break;
      case "rooms":
        setRooms(option);
        break;
      case "people":
        setPeople(Number(option));
        break;
      case "checkIn":
        setCheckIn(option);
        break;
      case "checkOut":
        setCheckOut(option);
        break;
      default:
        break;
    }
    closeDrawer();
  };

  // Define the hotel options array
  const hotelOptions = ["Hotel A", "Hotel B", "Hotel C", "Hotel D"];

  // Define the room options array
  const roomOptions = ["Single Room", "Double Room", "Suite"];

  return (
    <>
      <button onClick={() => openDrawer("hotel")}>Hotel: {hotel}</button>
      <button onClick={() => openDrawer("rooms")}>Rooms: {rooms}</button>
      <button onClick={() => openDrawer("people")}>People: {people}</button>
      <button onClick={() => openDrawer("checkIn")}>Check In: {checkIn}</button>
      <button onClick={() => openDrawer("checkOut")}>Check Out: {checkOut}</button>
      <Drawer open={isOpen} onClose={closeDrawer} direction="right">
        {currentField === "hotel" &&
          hotelOptions.map((option) => (
            <button key={option} onClick={() => handleSelectOption(option)}>
              {option}
            </button>
          ))}
        {currentField === "rooms" &&
          roomOptions.map((option) => (
            <button key={option} onClick={() => handleSelectOption(option)}>
              {option}
            </button>
          ))}
      </Drawer>
    </>
  );
};

export default BookingForm;
