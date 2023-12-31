import "@/app/globals.css";

type Props = {
  color: "charcoal" | "sea" | "sand" | "earth" | "blank" | "outline";
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  isActive?: boolean;
  isFullWidth?: boolean;
  isSmall?: boolean;
  styles?: string;
};

function Button({
  color,
  children,
  onClick,
  isActive,
  isFullWidth,
  isSmall,
  styles,
}: Props) {
  const variants = {
    charcoal: "bg-charcoal-100 text-slate-50 hover:bg-charcoal-80 ",
    earth: "bg-earth-100 text-slate-50 hover:bg-earth-80 ",
    sea: "bg-sea-100 text-slate-50 hover:bg-sea-80 ",
    sand: "bg-sand-100 text-slate-50 hover:bg-sand-80 ",
    blank: "bg-transparent text-charcoal-100",
    outline:
      "bg-transparent text-charcoal-100 border-2 hover:bg-sea-100 hover:text-slate-50 hover:border-sea-100",
  };

  return (
    <button
      className={`${
        isSmall ? "py-1.5" : "py-4"
      } px-10 box-border block transition ${
        isFullWidth ? "w-full text-center" : "w-max"
      } ${
        isActive ? variants[color] : "bg-gray-400 text-slate-50"
      } rounded-full font-semibold font-sans tracking-wide ${
        isActive && onClick ? "cursor-pointer" : "cursor-not-allowed"
      } ${styles}`}
      onClick={onClick && isActive ? onClick : () => {}}
    >
      {children}
    </button>
  );
}

export default Button;
