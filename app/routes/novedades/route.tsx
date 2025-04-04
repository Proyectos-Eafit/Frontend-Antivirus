import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { cards } from "~/assets/data/novedades_loader";
import Cards from "~/components/Cards";
import Carousel from "~/components/CarouselNovedades";
import FilterSearch from "~/components/FilterSearch";

type CardProps = {
  image: string;
  title: string;
  description: string;
  buttonLink: string;
  location: string;
  oportunity_type: string,
  sector: string,
};

export const loader: LoaderFunction = async () => {
  return json(cards);
};

export default function NovedadesLayout() {
  const cards = useLoaderData<CardProps[]>();
  const [filteredCards, setFilteredCards] = useState<CardProps[]>(cards);

  const handleFilter = (filters: {
    query: string;
    location: string;
    type: string;
    sector: string;
  }) => {
    const { query, location, type, sector } = filters;

    const filtered = cards.filter((card) => {
      const matchesQuery =
        card.title.toLowerCase().includes(query.toLowerCase()) ||
        card.description.toLowerCase().includes(query.toLowerCase());

      const matchesLocation = location ? card.location === location : true;
      const matchesType = type ? card.oportunity_type === type : true;
      const matchesSector = sector ? card.sector === sector : true;

      return matchesQuery && matchesLocation && matchesType && matchesSector;
    });

    setFilteredCards(filtered);
  };


  return (
    <div className="text-gray-800 flex flex-col items-center justify-center text-center">
      <h1 className="text-[#1D1856] text-[70px] font-bold">Novedades</h1>
      {/* <div className="max-w-screen-md w-full"> */}

      <div>
        <Carousel></Carousel>
      </div>

      <FilterSearch onFilter={handleFilter} />

      <h2 className="text-[#1D1856] text-[52px] font-bold">
        ¡Oportunidades para estudiar!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">

        {filteredCards.map((card, index) => (
          <Cards
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            buttonLink={card.buttonLink}
          />
        ))}
      </div>

    </div>
  );
}