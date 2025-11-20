import Image from "next/image";
import Link from "next/link";

interface CardProps {
  image: string;
  title: string;
  description: string;
  index: number;
  category: string;
  bgColor: string;
}

export default function Card({
  image,
  title,
  description,
  index,
  bgColor,
  category,
}: CardProps) {
  return (
    <section
      className={`flex flex-col-reverse ${
        index % 2 == 0 ? "md:flex-row-reverse" : "md:flex-row"
      } items-center md:gap-8 px-4 sm:px-6 md:px-12 py-10  w-full h-[500px] rounded-2xl `}
      style={{ backgroundColor: bgColor }}
    >
      <div className="md:w-1/2 w-full text-center md:text-left space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
          <Link href={`/search?category=${category}`}>Shop Now</Link>
        </button>
      </div>

      <div className="md:w-1/2 w-full">
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-xl ">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
