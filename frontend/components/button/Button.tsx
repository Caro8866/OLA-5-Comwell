import "@/app/globals.css";

type Props = {
  color: "charcoal" | "sea" | "sand" | "earth" | "blank";
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isFullWidth?: boolean;
  isSmall?: boolean;
};

function Button({
  color,
  children,
  onClick,
  isActive,
  isFullWidth,
  isSmall,
}: Props) {
  const variants = {
    charcoal: "bg-charcoal-80 text-slate-50 hover:brightness-150",
    earth: "bg-earth-80 text-slate-50 hover:brightness-150",
    sea: "bg-sea-80 text-slate-50 hover:brightness-150",
    sand: "bg-sand-80 text-slate-50 hover:brightness-150",
    blank: "bg-transparent text-charcoal-100",
  };

  return (
    <span
      className={`${
        isSmall ? "py-1.5" : "py-4"
      } px-10 box-border block transition ${isFullWidth ? "w-full" : "w-max"} ${
        isActive ? variants[color] : "bg-gray-500 text-slate-50"
      } rounded-full text-normal font-semibold font-sans tracking-wide ${
        isActive && onClick && "cursor-pointer"
      }`}
      onClick={onClick && isActive ? onClick : () => {}}
    >
      {children}
    </span>
  );
}

export default Button;
