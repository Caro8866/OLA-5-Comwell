import "@/app/globals.css";

type Props = {
  color: "charcoal" | "sea" | "sand" | "earth" | "blank" | "white";
  children: React.ReactNode;
  onClick?: () => void;
  styles?: string;
};

function Label({ color, children, onClick, styles }: Props) {
  const variants = {
    charcoal: "bg-charcoal-80 text-slate-50",
    earth: "bg-earth-80 text-slate-50",
    sea: "bg-sea-80 text-slate-50",
    sand: "bg-sand-80 text-slate-50",
    blank: "bg-transparent text-charcoal-100",
    white: "bg-slate-50 text-charcoal-100",
  };

  return (
    <span
      className={`py-1 px-3 ${
        variants[color]
      } rounded-full text-xs font-semibold font-sans tracking-wide ${
        styles ? styles : ""
      }`}
      onClick={onClick && onClick}
    >
      {children}
    </span>
  );
}

export default Label;
