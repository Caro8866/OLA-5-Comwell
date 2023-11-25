import "@/app/globals.css";

function Spinner() {
  return (
    <div className={`flex w-full h-full items-center justify-center`}>
      <span
        className={`animate-spin w-12 h-12 flex rounded-full border-[6px] border-slate-100 border-t-sea-80 self-center justify-self-center`}
      >
        {" "}
      </span>
    </div>
  );
}

export default Spinner;
