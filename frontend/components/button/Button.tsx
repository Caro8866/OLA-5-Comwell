import "@/app/globals.css";

type Props = {
  color: "charcoal" | "sea" | "sand" | "earth" | "blank" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
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
    charcoal: "bg-charcoal-80 text-slate-50 hover:brightness-150",
    earth: "bg-earth-80 text-slate-50 hover:brightness-150",
    sea: "bg-sea-80 text-slate-50 hover:brightness-150",
    sand: "bg-sand-80 text-slate-50 hover:brightness-150",
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
