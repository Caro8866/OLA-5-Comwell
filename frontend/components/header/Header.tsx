import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header
      className={`px-8 fixed top-0 w-full justify-center items-center flex z-50 h-[84px] justify-self-center right-2/4 translate-x-2/4 lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl `}
    >
      <div className={`grid grid-cols-2 lg:grid-cols-3 w-full`}>
        <section className={`flex items-center`}>
          <Link href="/">
            <Image
              src={"/img/comwell-logo.svg"}
              alt="comwell hotels logo"
              width={120}
              height={35}
              className={`max-w-fit`}
            />
          </Link>
        </section>
        <section className={`hidden lg:flex`}>{/* booking widget */}</section>
        <nav>
          <ul
            className={`flex flex-row items-center justify-end gap-4 font-sans font-semibold`}
          >
            <li>Locations</li>
            <li>Profile</li>
            <li>Menu</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
