import "@/app/globals.css";
import Link from "next/link";
import Image from "next/image";
import Label from "../label/Label";

type Props = {
  linkTo: string;
  image: string;
  title: string;
  description: string;
  tag: string;
  price?: number;
  discount?: number;
};

function ExperienceCard({
  linkTo,
  image,
  title,
  description,
  tag,
  price,
  discount,
}: Props) {
  return (
    <article className={`rounded-lg border-earth-20 border overflow-hidden`}>
      <Link href={linkTo} className={`w-full h-full flex`}>
        <div className={`relative flex flex-col`}>
          <Image
            src={image}
            alt={title}
            width="450"
            height="450"
            className={`w-full aspect-[1.6/1] h-fit flex`}
          />
          <section className={`p-5 flex flex-col grow justify-between`}>
            <div className={`flex flex-col`}>
              <div>
                <Label color="sea">{tag.toUpperCase()}</Label>
              </div>
              <h3 className={`text-heading-small-desktop font-semibold mt-4`}>
                {title}
              </h3>
              <p className={`mt-2 text-earth-80 text-body-small font-medium`}>
                {description}
              </p>
            </div>
            {price && (
              <div className={`mt-4`}>
                <h3 className={`text-heading-medium-desktop font-semibold `}>
                  from{" "}
                  {discount ? (
                    <>
                      <span className={`text-earth-40 line-through mr-2`}>
                        {price}
                      </span>
                      <span>{price - price * discount}</span>
                    </>
                  ) : (
                    price
                  )}{" "}
                  kr.
                </h3>
                <p className={`text-earth-80 text-body-small font-medium mt-2`}>
                  For 1 room / 1 person, per night
                </p>
              </div>
            )}
          </section>
        </div>
      </Link>
    </article>
  );
}

export default ExperienceCard;
