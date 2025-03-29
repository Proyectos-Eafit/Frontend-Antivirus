import { useState } from "react";
import oportunidad1 from "../assets/images/oportunidad1.svg";
import oportunidad2 from "../assets/images/oportunidad2.svg";
import nodo from "../assets/images/nodo.svg";

const novedadesData = [
  {
    title: "Nueva funcionalidad de seguridad",
    description: "Hemos implementado una nueva funcionalidad para proteger tus datos de manera más eficiente.",
    date: "2023-10-01",
  },
  {
    title: "Actualización de la interfaz",
    description: "La interfaz de usuario ha sido rediseñada para mejorar la experiencia.",
    date: "2023-09-15",
  },
  {
    title: "Mantenimiento programado",
    description: "El sistema estará en mantenimiento el próximo sábado de 2:00 AM a 4:00 AM.",
    date: "2023-09-10",
  },
];

export default function Novedades() {
  const [showAll, setShowAll] = useState(false);

  const displayedNovedades = showAll ? novedadesData : novedadesData.slice(0, 2);

  return (
    <div className="novedades-section">
      <ul className="list-disc pl-5">
        {displayedNovedades.map((novedad, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-2xl font-semibold text-custom-color">{novedad.title}</h2>
            <p>{novedad.description}</p>
            <p className="text-gray-500 text-sm">{novedad.date}</p>
          </li>
        ))}
      </ul>
      {novedadesData.length > 2 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>
      )}
    </div>
  );
}
