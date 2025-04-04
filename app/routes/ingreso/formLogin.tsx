import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import loginImage from "../../assets/images/login.svg";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function FormLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cargar credenciales guardadas si "Recordar" está activado
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
        remember: true,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: false });
    setErrorMessage(null); // Limpia el mensaje de error al cambiar los campos
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos vacíos
    const newErrors = {
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setLoading(true);

    try {
      console.log("Datos enviados:", formData); // Verifica los datos enviados

      const response = await axios.post("http://localhost:5281/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Respuesta de la API:", response.data); // Verifica la respuesta de la API

      if (response.status === 200 && response.data.token) {
        console.log("Token recibido:", response.data.token); // Verifica el token recibido

        // Inicio de sesión exitoso
        Cookies.set("token", response.data.token, { expires: 1 / 72 }); // 20 minutos

        // Guarda las credenciales si "Recordar" está activado
        if (formData.remember) {
          localStorage.setItem("email", formData.email);
          localStorage.setItem("password", formData.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        // Redirige al usuario a la página de novedades
        navigate("/novedades");
      } else {
        setErrorMessage("Hubo un problema al iniciar sesión.");
      }
    } catch (error: any) {
      console.error("Error completo:", error); // Log completo del error

      if (error.response) {
        console.error("Error en la respuesta:", error.response.data); // Detalles de la respuesta
        setErrorMessage(error.response.data.message || "Credenciales incorrectas");
      } else if (error.request) {
        console.error("Error en la solicitud:", error.request); // Detalles de la solicitud
        setErrorMessage("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        console.error("Error desconocido:", error.message); // Otros errores
        setErrorMessage("Ocurrió un error inesperado. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
        {/* Imagen */}
        <div className="flex justify-center items-center h-[800px] md:w-2/5">
          <img
            src={loginImage}
            alt="Login"
            className="max-w-full h-full object-contain"
          />
        </div>

        <div className="w-full md:w-2/5 bg-white p-8 rounded shadow-2xl mb-8 md:mb-0 md:ml-4 min-h-[700px] flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full p-4">
            <h1 className="text-2xl font-bold text-center mb-2 text-black">
              Bienvenido a tu
            </h1>
            <h2 className="text-xl font-bold text-center mb-6 text-[#2C395B]">
              Banco de Oportunidades
            </h2>

            {/* Botones de ingreso con Google y Facebook */}
            <div className="flex flex-col gap-4 mb-6">
              <button
                type="button"
                className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-3 px-5 rounded hover:bg-gray-100 text-lg"
              >
                <FaGoogle className="h-6 w-6 mr-2 text-red-500" />
                Ingresa con Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-full bg-[#1877F2] text-white py-3 px-5 rounded hover:bg-[#145dbf] text-lg"
              >
                <FaFacebook className="h-6 w-6 mr-2" />
                Ingresa con Facebook
              </button>
              <div className="flex items-center justify-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">o</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>

            {/* Mensaje de error */}
            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

            {/* Campos del formulario */}
            <div className="relative mb-4 flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div className="relative mb-4 flex items-center">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Recordarme
              </label>
            </div>

            <button
              type="submit"
              className="w-3/4 bg-[#FFBA08] text-white py-3 px-5 rounded hover:bg-yellow-500 mx-auto block text-lg"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}