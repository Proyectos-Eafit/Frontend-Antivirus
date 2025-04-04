import { Link, useLocation } from "@remix-run/react"; 
import logo from "../assets/images/logo.svg";
import btnLogin from '../assets/images/btnLogin.svg';
import btnRegister from '../assets/images/btnRegister.svg';

interface NavbarProps {
  isAuthenticated: boolean;
}

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <div>
      <nav className="relative flex">
        <div className="absolute top-4 bg-[linear-gradient(90deg,#00266B_19.38%,#4E6291_37.55%,#5F77AB_82.93%,#708BC6_96.28%)] h-16 w-full z-0"></div>
        <ul className="flex font-raleway font-bold text-white w-5/12 justify-evenly items-center z-10">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="#oportunidades">Oportunidades</Link>
          </li>
          <li>
            <Link to="#servicios">Servicio</Link>
          </li>

          {/* Mostrar "Novedades" solo si no estás en Inicio, Ingresar o Servicios */}
          {location.pathname !== "/" && location.pathname !== "/ingreso" && location.pathname !== "/registro" && (
            <li>
              <Link to="/novedades">Novedades</Link>
            </li>
          )}

        </ul>
        <div className="w-2/12 flex justify-center z-10">
          <img className="w-28" src={logo} alt="logo" />
        </div>
        <ul className="flex items-center justify-evenly z-10">
          {isAuthenticated ? (
            <>
              {/* Botón de Perfil */}
              <li>
                <Link to="/perfil" className="mr-4 text-[#1D1854]">Perfil</Link>
              </li>
              {/* Botón de Cerrar Sesión */}
              <li>
                <form method="post" action="/logout">
                  <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded">Cerrar sesión</button>
                </form>
              </li>
            </>
          ) : (
            <>
              {/* Botón de "Ingresar" */}
              <li className={`mr-16 ${location.pathname === "/ingreso" ? "invisible" : ""}`}>
                <Link to="/ingreso">
                  <img className="w-40" src={btnLogin} alt="btn" />
                </Link>
              </li>
              {/* Botón de "Registrar" */}
              <li className={`ml-16 ${location.pathname === "/registro" ? "invisible" : ""}`}>
                <Link to="/registro">
                  <img className="w-40" src={btnRegister} alt="btn" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}