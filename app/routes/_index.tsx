import { Outlet } from "@remix-run/react";
import ServiciosSection from "app/routes/Servicios/ServiciosSection";
import Oportunidades from "~/components/Oportunidades";
export default function Index() {
  return (
    <div>
      <div>
      
      <ServiciosSection />
      <Outlet />
        
      </div>
      <Oportunidades/>
    </div>
  );
}
