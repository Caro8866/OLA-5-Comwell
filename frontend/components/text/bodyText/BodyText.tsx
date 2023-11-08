type Props = {
  size: 1 | 2;
  color?: "black" | "white";
  styles?: string;
  children: React.ReactNode;
  isBold?: boolean;
};

function BodyText({ size, color, styles, children, isBold }: Props) {
  const BodySize = {
    1: "text-body-large",
    2: "text-body-small",
  };
  const BodyColor = {
    black: "text-charcoal-100",
    white: "text-white",
  };

  return (
    <span
      className={`font-sans ${isBold ? "font-semibold" : ""}${BodySize[size]} ${
        color ? BodyColor[color] : BodyColor["black"]
      } ${styles}`}
    >
      {children}
    </span>
  );
}

export default BodyText;
