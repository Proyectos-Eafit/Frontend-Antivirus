import { useState, useMemo, useEffect } from "react";
import ServiceCard from "./ServiceCard";

export default function ServiciosSection() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const servicios = useMemo(
    () => [
      { id: 1, title: "Pre-vocación", description: "Un programa diseñado para estudiantes que están explorando sus intereses y habilidades. Ayudamos a los jóvenes a descubrir sus talentos y posibles caminos profesionales.", imageSrc: "app/assets/images/ATV3.jpg", linkText: "LO QUIERO", linkUrl: "/ingreso" },
      { id: 2, title: "Asesoría sociopsedagógica", description: "Ofrecemos apoyo personalizado para estudiantes que enfrentan dificultades en su proceso de aprendizaje. Nuestros expertos trabajan en el desarrollo integral del estudiante.", imageSrc: "app/assets/images/ATV2.jpg", linkText: "LO QUIERO", linkUrl: "/ingreso" },
      { id: 3, title: "Test sociovocacional", description: "Evaluaciones diseñadas para identificar intereses, aptitudes y preferencias de los estudiantes. Los resultados ayudan a tomar decisiones informadas sobre su futuro académico.", imageSrc: "app/assets/images/ATV1.jpg", linkText: "LO QUIERO", linkUrl: "/ingreso" },
      { id: 4, title: "Taller 1", description: "Talleres", imageSrc: "app/assets/images/ATV3.jpg", linkText: "LO QUIERO", linkUrl: "/ingreso" },
      { id: 5, title: "Taller 2", description: "Talleres", imageSrc: "app/assets/images/ATV1.jpg", linkText: "LO QUIERO", linkUrl: "/ingreso" },
      { id: 6, title: "Taller 3", description: "Talleres", imageSrc: "app/assets/images/ATV2.jpg", linkText: "LO QUIERO", linkUrl: "/ingreso" },
    ],
    []
  );

  const cardsPerGroup = 3;
  const totalGroups = Math.ceil(servicios.length / cardsPerGroup);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const changeGroup = (newGroup: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentGroup(newGroup);
    }
  };

  const nextGroup = () => changeGroup((currentGroup + 1) % totalGroups);
  const prevGroup = () => changeGroup((currentGroup - 1 + totalGroups) % totalGroups);

  const currentServices = useMemo(
    () => servicios.slice(currentGroup * cardsPerGroup, (currentGroup + 1) * cardsPerGroup),
    [currentGroup, servicios]
  );

  return (
    <section id="servicios" className="py-16 px-6 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">Servicios</h2>

        <div className="relative overflow-x-hidden">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-500 ${isTransitioning ? "opacity-70" : "opacity-100"}`}>
            {currentServices.map((servicio) => (
              <ServiceCard key={servicio.id} {...servicio} />
            ))}
          </div>

          {servicios.length > cardsPerGroup && (
            <>
              {["prev", "next"].map((direction) => (
                <button
                  key={direction}
                  onClick={direction === "prev" ? prevGroup : nextGroup}
                  className={`absolute ${direction === "prev" ? "left-0 -ml-4" : "right-0 -mr-4"} top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors border border-gray-200`}
                  aria-label={direction === "prev" ? "Grupo anterior" : "Siguiente grupo"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                  </svg>
                </button>
              ))}
            </>
          )}
        </div>

        {servicios.length > cardsPerGroup && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: totalGroups }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeGroup(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentGroup ? "bg-indigo-900" : "bg-gray-300"}`}
                  aria-label={`Ir al grupo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}