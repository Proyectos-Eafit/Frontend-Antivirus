import { Link } from "@remix-run/react";

type CardProps = {
    image: string;
    title: string;
    description: string;
    buttonLink: string;
  };
  

export default function Card({ image, title, description, buttonLink }: CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-sm overflow-hidden w-80 text-center">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg" />
      <div className="flex justify-between items-center px-4 mt-4">
        <h2 className="text-xl font-semibold mt-4">{title}</h2>
        <Link to={buttonLink} className="mt-2 inline-block text-[#1D1854] py-1 px-6 border border-[#1D1854] rounded-full hover:bg-[#1D1854] hover:text-white transition">
        Guardar
        </Link>
      </div>
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
    </div>
  );
}