// En components/Navbar.tsx
import { Link, useLocation } from "@remix-run/react";
import logo from "../assets/images/logo.svg";
import btnLogin from '../assets/images/btnLogin.svg';
import btnRegister from '../assets/images/btnRegister.svg';
import { useEffect } from "react";

export default function Navbar() {
  const location = useLocation();

  // Función para manejar el scroll a servicios
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Si ya estamos en la página principal, scroll suave
    if (location.pathname === "/" || location.pathname === "") {
      const serviciosSection = document.getElementById('servicios');
      if (serviciosSection) {
        serviciosSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Si no estamos en la página principal, navegamos a /#servicios
      window.location.href = "/#servicios";
    }
  };

  return (
    <div>
      <nav className="relative flex ">
        <div className="absolute top-4 bg-[linear-gradient(90deg,#00266B_19.38%,#4E6291_37.55%,#5F77AB_82.93%,#708BC6_96.28%)] h-16 w-full z-0"></div>
        <ul className="flex font-raleway font-bold text-white w-5/12 justify-evenly items-center z-10">
          <li>
            <Link to="#inicio">Inicio</Link>
          </li>
          <li>
            <Link to="#oportunidades">Oportunidades</Link>
          </li>
          <li>
            <a 
              href="#servicios" 
              onClick={handleScrollToServices}
              className="font-raleway font-bold text-white"
            >
              Servicio
            </a>
          </li>
          <li>
            <Link to="/novedades">Novedades</Link>
          </li>
        </ul>
        <div className="w-2/12 flex justify-center z-10">
          <img className="w-28" src={logo} alt="logo" />
        </div>
        <ul className="flex text-[#1D1854] text- w-5/12 justify-evenly items-center z-10">
          <li>
            <Link to="/ingreso">
                <img className="w-36" src={btnLogin} alt="btn" />
            </Link>
          </li>
          <li>
            <Link to="/registro">
                <img className="w-40" src={btnRegister} alt="btn" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}