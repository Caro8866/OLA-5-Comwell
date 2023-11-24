export default function InputError({
  message,
  conditionPassed = true,
}: {
  message: string | undefined;
  conditionPassed: boolean;
}) {
  return (
    !conditionPassed && (
      <div className="flex gap-1 -mt-3 text-errorRed w-96">
        <svg
          className="w-[16px] min-w-[16px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm.507 2.75h-1v5.5h1v-5.5Zm-1.25 7.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p>{message}</p>
      </div>
    )
  );
}
