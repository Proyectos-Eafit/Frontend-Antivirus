import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon, UserIcon, CalendarIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { FaCheck } from "react-icons/fa";
import airplaneRegister from "../assets/images/airplaneRegister.png";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [benefits, setBenefits] = useState([]); // Estado para los beneficios

  // Obtener los beneficios desde la API
  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await axios.get("http://localhost:5281/api/Benefits");
        setBenefits(response.data); // Guardar los beneficios en el estado
      } catch (error) {
        console.error("Error al obtener los beneficios:", error);
      }
    };

    fetchBenefits();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      firstName: formData.firstName.trim() === "",
      lastName: formData.lastName.trim() === "",
      birthDate: formData.birthDate.trim() === "",
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
      confirmPassword: formData.confirmPassword.trim() === "" || formData.password !== formData.confirmPassword,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const userPayload = {
      id: 0, // El backend puede ignorar este campo si no es necesario
      name: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      dateBirth: formData.birthDate,
    };

    try {
      // Consumir el endpoint de registro
      const response = await axios.post("http://localhost:5281/api/auth/register", userPayload);

      if (response.status === 200) {
        alert("Usuario registrado exitosamente.");
      } else {
        alert("Hubo un problema al registrar el usuario.");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error en la respuesta del backend:", error.response.data);
        alert(`Error: ${error.response.data.message || "Hubo un problema al registrar el usuario"}`);
      } else if (error.request) {
        console.error("No se recibió respuesta del backend:", error.request);
        alert("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        console.error("Error al configurar la solicitud:", error.message);
        alert("Ocurrió un error inesperado. Intenta nuevamente.");
      }
    }
  };

  return (
    <section className="register-section flex flex-col items-center justify-center min-h-screen p-[5%]">
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
        <div className="w-full md:w-2/5 bg-white p-8 rounded shadow-2xl mb-8 md:mb-0 md:mr-4 min-h-[700px] flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full p-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-black">
              ¿Listo para encontrar tu próxima <span className="text-[#2C395B]">oportunidad?</span> <span className="wave">👋</span>
            </h1>

            {/* Campos del formulario */}
            <div className="relative mb-4 flex items-center">
              <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.firstName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div className="relative mb-4 flex items-center">
              <UserIcon className="h-6 w-6 text-gray-500 mr-3" />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.lastName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div className="relative mb-4 flex items-center">
              <CalendarIcon className="h-6 w-6 text-gray-500 mr-3" />
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                placeholder="Fecha de Nacimiento"
                value={formData.birthDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.birthDate ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div className="relative mb-4 flex items-center">
              <EnvelopeIcon className="h-6 w-6 text-gray-500 mr-3" />
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
              <LockClosedIcon className="h-6 w-6 text-gray-500 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-blue-500 flex items-center"
              >
                {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
              </button>
            </div>

            <div className="relative mb-4 flex items-center">
              <LockClosedIcon className="h-6 w-6 text-gray-500 mr-3" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-blue-500 flex items-center"
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-3/4 bg-[#FFBA08] text-white py-3 px-5 rounded hover:bg-yellow-500 mx-auto block text-lg"
            >
              Crear Cuenta
            </button>
          </form>
        </div>

        {/* Imagen */}
        <div className="flex justify-center items-center h-[700px]">
          <img
            src={airplaneRegister}
            alt="Airplane"
            className="max-w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Sección de beneficios */}
      <div className="w-full py-8 px-4">
        <h2 className="text-2xl font-bold text-center mt-24 mb-24 text-[#2C395B]">
          ¡Obtén los siguientes beneficios!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-36 mb-20">
          {benefits.map((benefit: any) => (
            <div key={benefit.id} className="flex flex-col">
              <div>
                {/* Imagen del beneficio */}
                {benefit.image_url && (
                  <img
                    src={benefit.image_url}
                    alt={benefit.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-[#FFBA08] font-bold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
              <div className="flex justify-end mt-4">
                <FaCheck className="text-[#2C395B] text-7xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}