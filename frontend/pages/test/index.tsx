import "@/app/globals.css";
import InputSelect from "@/components/formField/InputSelect";
import Header from "@/components/header/Header";
import { log } from "console";
import { useState } from "react";

function test() {
  const [myValue, setMyValue] = useState("Test");

  return (
    <>
      <Header
        menuOnClick={() => {
          console.log("menu");
        }}
        profileOnClick={() => {
          console.log("profile");
        }}
        locationsOnClick={() => {
          console.log("locations");
        }}
      />
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
      <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div>
    </>
  );
}

export default test;
