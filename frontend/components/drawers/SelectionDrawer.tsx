import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import Heading from "../text/heading/Heading";
import Button from "../button/Button";

type SelectionDrawerProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
};

function SelectionDrawer({
  title,
  children,
  isOpen,
  onClose,
  onSelect,
}: SelectionDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      className={`rounded-l-xl relative !w-screen lg:!w-[30vw] 2xl:!w-[30vw] overflow-hidden z-80`}
    >
      <div className="h-full flex flex-col px-4 ">
        <header className="flex flex-row justify-between items-center py-2">
          <Heading size={3} color="black" styles="font-light pt-6">
            {title}
          </Heading>
          <button
            onClick={onClose}
            className="flex items-center rounded-full bg-charcoal-20 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
              className="w-[16px] h-[16px]"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M2.62 13.38 12.99 3.01M13.38 13.38 3.01 3.01"
              ></path>
            </svg>
          </button>
        </header>
        <div className="h-full overflow-y-auto">{children}</div>
        <footer className="flex flex-row justify-end items-center py-4 mb-0 mt-auto border-t border-charcoal-20">
          <Button
            color="sea"
            isFullWidth={true}
            isActive={/* if selected value is selected */ true}
            onClick={onSelect}
          >
            Select
          </Button>
        </footer>
      </div>
    </Drawer>
  );
}

export default SelectionDrawer;
