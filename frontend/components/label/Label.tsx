import "@/app/globals.css";

type Props = {
  color: "charcoal" | "sea" | "sand" | "earth";
  children: React.ReactNode;
};

function Label({ color, children }: Props) {
  return (
    <span
      className={`py-1 px-3 bg-${color}-100 rounded-full text-xs font-medium font-sans`}
    >
      {children}
    </span>
  );
}

export default Label;
