import "@/app/globals.css";
import Button from "@/components/button/Button";

function test() {
  return (
    <div>
      test
      <Button
        color="charcoal"
        isActive={true}
        onClick={() => {
          console.log("test");
        }}
      >
        lorem ipsum
      </Button>
    </div>
  );
}

export default test;
