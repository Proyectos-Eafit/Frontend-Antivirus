
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
  oportunity_type: string;
  sector: string;
};

export const loader: LoaderFunction = async () => {
  return json(cards);
};

export default function NovedadesLayout() {
  const cards = useLoaderData<CardProps[]>();
  const [filteredCards, setFilteredCards] = useState<CardProps[]>(cards);
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);
  const [visibleCards, setVisibleCards] = useState<number>(4);

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
    setVisibleCards(4);
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

      {filteredCards.length === 0 ? (
        <p className="text-gray-500 text-lg py-10">
          No se encontraron oportunidades.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            {filteredCards.slice(0, visibleCards).map((card, index) => (
              <Cards
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                buttonLink={card.buttonLink}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </div>

          {visibleCards < filteredCards.length && (
            <button
              className="mb-6 px-6 py-3 bg-[#FAA307] text-white font-bold rounded"
              onClick={() => setVisibleCards((prev) => prev + 6)}
            >
              ▼ Mostrar más resultados
            </button>
          )}
        </>
      )}

      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold">{selectedCard.title}</h2>
            <img
              src={selectedCard.image}
              alt={selectedCard.title}
              className="w-full h-40 object-cover mt-4"
            />
            <p className="mt-4">{selectedCard.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#FAA307] text-white rounded"
              onClick={() => setSelectedCard(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

