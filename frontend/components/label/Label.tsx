import "@/app/globals.css";

type Props = {
  color: "charcoal" | "sea" | "sand" | "earth" | "blank";
  children: React.ReactNode;
  onClick?: () => void;
};

function Label({ color, children, onClick }: Props) {
  const variants = {
    charcoal: "bg-charcoal-80 text-slate-50",
    earth: "bg-earth-80 text-slate-50",
    sea: "bg-sea-80 text-slate-50",
    sand: "bg-sand-80 text-slate-50",
    blank: "bg-transparent text-charcoal-100",
  };

  return (
    <span
      className={`py-1.5 px-5 ${variants[color]} rounded-full text-xs font-semibold font-sans tracking-wide`}
      onClick={onClick && onClick}
    >
      {children}
    </span>
  );
}

export default Label;
