import { useEffect, useState } from "react";
import axios from "axios";
import Card from "~/components/Cards";
import FilterSearch from "~/components/FilterSearch";

interface Opportunity {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  location?: string;
  oportunity_type?: string;
  sector?: string;
}

export default function Novedades() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCards, setVisibleCards] = useState<number>(4);

  // Consumir la API para obtener las oportunidades
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get("http://localhost:5281/api/Opportunities");
        setOpportunities(response.data);
        setFilteredOpportunities(response.data); // Inicialmente, todas las oportunidades están visibles
      } catch (error) {
        console.error("Error al obtener las oportunidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Filtrar oportunidades en base a los filtros aplicados
  const handleFilter = (filters: {
    query: string;
    location: string;
    type: string;
    sector: string;
  }) => {
    const { query, location, type, sector } = filters;

    const filtered = opportunities.filter((opportunity) => {
      const matchesQuery =
        opportunity.name.toLowerCase().includes(query.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(query.toLowerCase());

      const matchesLocation = location ? opportunity.location === location : true;
      const matchesType = type ? opportunity.oportunity_type === type : true;
      const matchesSector = sector ? opportunity.sector === sector : true;

      return matchesQuery && matchesLocation && matchesType && matchesSector;
    });

    setFilteredOpportunities(filtered);
    setVisibleCards(4); // Reinicia el número de tarjetas visibles al aplicar un filtro
  };

  if (loading) {
    return <p className="text-center text-gray-600">Cargando oportunidades...</p>;
  }

  return (
    <div className="text-gray-800 flex flex-col items-center justify-center text-center">
      {/* Título principal */}
      <h1 className="text-[#1D1856] text-[70px] font-bold">Novedades</h1>

      {/* Filtro de búsqueda */}
      <FilterSearch onFilter={handleFilter} />

      {/* Subtítulo */}
      <h2 className="text-[#1D1856] text-[52px] font-bold">
        ¡Oportunidades para estudiar!
      </h2>

      {/* Oportunidades */}
      {filteredOpportunities.length === 0 ? (
        <p className="text-gray-500 text-lg py-10">
          No se encontraron oportunidades.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            {filteredOpportunities.slice(0, visibleCards).map((opportunity) => (
              <Card
                key={opportunity.id}
                image={opportunity.image_url || "https://via.placeholder.com/300"}
                title={opportunity.name}
                description={opportunity.description}
                buttonLink={`/oportunidades/${opportunity.id}`} // Cambia esto según tu lógica de rutas
                onClick={() => console.log("Oportunidad seleccionada:", opportunity)}
              />
            ))}
          </div>

          {/* Botón para mostrar más resultados */}
          {visibleCards < filteredOpportunities.length && (
            <button
              className="mb-6 px-6 py-3 bg-[#FAA307] text-white font-bold rounded"
              onClick={() => setVisibleCards((prev) => prev + 6)}
            >
              ▼ Mostrar más resultados
            </button>
          )}
        </>
      )}
    </div>
  );
}