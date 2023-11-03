import "@/app/globals.css";

type Props = {
  color: "charcoal" | "sea" | "sand" | "earth";
  children: React.ReactNode;
};

function Label({ color, children }: Props) {
  switch (color) {
    case "charcoal":
      return (
        <span
          className={`py-1 px-3 bg-charcoal-80 rounded-full text-xs font-medium font-sans text-slate-50`}
        >
          {children}
        </span>
      );
    case "sea":
      return (
        <span
          className={`py-1 px-3 bg-sea-80 rounded-full text-xs font-medium font-sans text-slate-50`}
        >
          {children}
        </span>
      );
    case "sand":
      return (
        <span
          className={`py-1 px-3 bg-sand-80 rounded-full text-xs font-medium font-sans text-slate-50`}
        >
          {children}
        </span>
      );
    case "earth":
      return (
        <span
          className={`py-1 px-3 bg-earth-80 rounded-full text-xs font-medium font-sans text-slate-50`}
        >
          {children}
        </span>
      );
  }
}

export default Label;
