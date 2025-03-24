import { useEffect, useRef } from "react";
import ServiciosSection from "./ServiciosSection"; 

export default function ServiciosRoute() {
  const serviciosSectionRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
   
    if (window.location.hash === "#servicios" && serviciosSectionRef.current) {
      serviciosSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={serviciosSectionRef}>
      <ServiciosSection />
    </div>
  );
}