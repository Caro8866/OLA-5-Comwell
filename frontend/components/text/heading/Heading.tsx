type Props = {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  color?: "black" | "white";
  styles?: string;
  children: React.ReactNode;
};

function Heading({ size, color, styles, children }: Props) {
  const HeadingLevel: any = `h${size}`;
  const HeadingSize = {
    1: "text-heading-huge-mobile xl:text-heading-huge-desktop",
    2: "text-heading-xlarge-mobile xl:text-heading-xlarge-desktop",
    3: "text-heading-large-mobile xl:text-heading-large-desktop",
    4: "text-heading-medium-mobile xl:text-heading-medium-desktop",
    5: "text-heading-small-mobile xl:text-heading-small-desktop",
    6: "text-heading-xsmall-mobile xl:text-heading-xsmall-desktop",
    7: "text-heading-mini-mobile xl:text-heading-mini-desktop",
  };
  const HeadingColor = {
    black: "text-charcoal-100",
    white: "text-white",
  };

  return (
    <HeadingLevel
      className={`font-sans font-semibold ${HeadingSize[size]} ${
        color ? HeadingColor[color] : HeadingColor["black"]
      } ${styles}`}
    >
      {children}
    </HeadingLevel>
  );
}

export default Heading;
