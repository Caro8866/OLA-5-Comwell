import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function SignOutSection({
  isLoginVisible,
}: {
  isLoginVisible: boolean;
}) {
  const { onSignOutSuccess } = useContext(AuthContext);
  return (
    <section
      className={`absolute flex flex-col px-4 pt-6 pb-3 bg-slate-50 rounded-lg right-0 top-16 w-64 gap-4 ${
        isLoginVisible ? "" : "hidden"
      }`}
    >
      <Link href="#" className={`transition hover:text-charcoal-100`}>
        Comwell Club
      </Link>
      <Link href="#" className={`transition hover:text-charcoal-100`}>
        Frequently Asked Questions
      </Link>
      <Link href="#" className={`transition hover:text-charcoal-100`}>
        Club offers
      </Link>
      <Link href="#" className={`transition hover:text-charcoal-100`}>
        Notifications
      </Link>
      <Link href="#" className={`transition hover:text-charcoal-100`}>
        Profile Settings
      </Link>

      <div className="py-5 px-8 flex items-center justify-center w-full">
        <button
          className="bg-white rounded-full border border-gray-200 w-full py-4"
          onClick={async () => {
            const response = await fetch("http://localhost:5000/auth/logout", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
            if (!response.ok) {
              return false;
            } else {
              onSignOutSuccess();
            }
          }}
        >
          Sign out
        </button>
      </div>
    </section>
  );
}

//   <div className={`px-4 pt-6 pb-3 flex flex-col gap-4`}></div>
