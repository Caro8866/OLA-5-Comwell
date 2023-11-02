type Props = {
  color: string;
  children: React.ReactNode;
};

function Label({ color, children }: Props) {
  return <span className={`py-1 px-2 bg-${color}-40`}>{children}</span>;
}

export default Label;
