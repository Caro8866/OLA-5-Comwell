import "@/app/globals.css";
import InputText from "@/components/formField/InputText";
import { useState } from "react";

function test() {
  const [myValue, setMyValue] = useState("");

  return (
    <div className={"px-4 py-4"}>
      <InputText
        label="Label text"
        onChange={(e) => {
          setMyValue(e.target.value);
        }}
        value={myValue}
      />
    </div>
  );
}

export default test;
