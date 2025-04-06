import { Link, useLocation } from "@remix-run/react";
import { FaSignOutAlt } from "react-icons/fa"; // Ícono de salir
import logo from "../assets/images/logo.svg";
import btnLogin from "../assets/images/btnLogin.svg";
import btnRegister from "../assets/images/btnRegister.svg";
import { useAuth } from "../utils/authCOntext"; // Importar el contexto de autenticación

export default function Navbar() {
  const location = useLocation(); // Obtiene la ruta actual
  const { isAuthenticated, role, logout } = useAuth(); // Usar el contexto de autenticación

  // Manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    window.location.href = "/ingreso"; // Redirige al usuario al inicio de sesión
  };

  // Verificar si estamos en vistas específicas
  const isNovedadesPage = location.pathname === "/novedades";
  const isLoginPage = location.pathname === "/ingreso";
  const isRegisterPage = location.pathname === "/registro";

  return (
    <div>
      <nav className="relative flex">
        <div className="absolute top-4 bg-[linear-gradient(90deg,#00266B_19.38%,#4E6291_37.55%,#5F77AB_82.93%,#708BC6_96.28%)] h-16 w-full z-0"></div>
        <ul className="flex font-raleway font-bold text-white w-5/12 justify-evenly items-center z-10">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          {!isNovedadesPage && (
            <li>
              <Link to="#oportunidades">Oportunidades</Link>
            </li>
          )}
          <li>
            <Link to="#servicios">Servicio</Link>
          </li>
          {/* Mostrar el enlace de Novedades solo si el usuario está autenticado */}
          {isAuthenticated && !isLoginPage && !isRegisterPage && (
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
              {/* Mostrar opciones solo para admin */}
              {role === "admin" && (
                <>
                  {/* Botón de Administrar Contenido */}
                  <li>
                    <Link
                      to="/admin"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Administrar Contenido
                    </Link>
                  </li>
                  {/* Botón de Gestión de Usuarios */}
                  <li>
                    <Link
                      to="/super-admin"
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                      Gestión de Usuarios
                    </Link>
                  </li>
                </>
              )}
              {/* Botón de Cerrar Sesión */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  <FaSignOutAlt className="mr-2" /> {/* Ícono de salir */}
                  Salir
                </button>
              </li>
            </>
          ) : (
            <>
              {!isLoginPage && (
                <li className="mr-16">
                  <Link to="/ingreso">
                    <img className="w-40" src={btnLogin} alt="btn" />
                  </Link>
                </li>
              )}
              {!isRegisterPage && (
                <li className="ml-16">
                  <Link to="/registro">
                    <img className="w-40" src={btnRegister} alt="btn" />
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}