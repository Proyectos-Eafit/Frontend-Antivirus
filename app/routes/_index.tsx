import { Outlet } from "@remix-run/react";
import ServiciosSection from "app/routes/Servicios/ServiciosSection";

export default function Index() {
  return (
    <div>
      <div>
      
      <ServiciosSection />
      <Outlet />
        
      </div>
    </div>
  );
}
