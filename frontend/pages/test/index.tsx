import "@/app/globals.css";
import InputSelect from "@/components/formField/InputSelect";
import Header from "@/components/header/Header";
import { useState } from "react";

function test() {
  const [myValue, setMyValue] = useState("Test");

  return (
    <>
      <Header />
      {/* <div className={"px-4 py-4"}>
        <InputSelect
          label="Label text"
          onClick={() => {
            console.log("test");
          }}
          value={myValue}
        />
      </div> */}
    </>
  );
}

export default test;
