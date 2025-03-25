import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, UserIcon, CalendarIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { FaGoogle, FaFacebook, FaCheck } from "react-icons/fa";
import airplaneRegister from "../assets/images/airplaneRegister.png";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    console.log("Formulario enviado:", formData);
  };

  return (
    <section className="register-section flex flex-col items-center justify-center min-h-screen p-[5%]">
      {/* Contenedor principal para el formulario y la imagen */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
        {/* Sección del formulario */}
        <div className="w-full md:w-2/5 bg-white p-8 rounded shadow-2xl mb-8 md:mb-0 md:mr-4 min-h-[700px] flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full p-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-black">
              ¿Listo para encontrar tu próxima <span className="text-[#2C395B]">oportunidad?</span> <span className="wave">👋</span>
            </h1>

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

            {/* Campos del formulario */}
            <div className="relative mb-4 overflow-hidden">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder=" "
                value={formData.firstName}
                onChange={handleChange}
                className={`peer w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.firstName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
              <label
                htmlFor="firstName"
                className="absolute left-3 top-3 text-gray-500 text-base flex items-center gap-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
              >
                <UserIcon className="h-6 w-6 text-blue-500" /> Nombre
              </label>
            </div>

            <div className="relative mb-4 overflow-hidden">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder=" "
                value={formData.lastName}
                onChange={handleChange}
                className={`peer w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.lastName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
              <label
                htmlFor="lastName"
                className="absolute left-3 top-3 text-gray-500 text-base flex items-center gap-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
              >
                <UserIcon className="h-6 w-6 text-blue-500" /> Apellido
              </label>
            </div>

            <div className="relative mb-4 overflow-hidden">
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={`peer w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.birthDate ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
              <label
                htmlFor="birthDate"
                className="absolute left-3 top-3 text-gray-500 text-base flex items-center gap-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
              >
                <CalendarIcon className="h-6 w-6 text-blue-500" /> Fecha de Nacimiento
              </label>
            </div>

            <div className="relative mb-4 overflow-hidden">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                className={`peer w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-gray-500 text-base flex items-center gap-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
              >
                <EnvelopeIcon className="h-6 w-6 text-blue-500" /> Correo Electrónico
              </label>
            </div>

            <div className="relative mb-4 overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                className={`peer w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-3 text-gray-500 text-base flex items-center gap-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
              >
                <LockClosedIcon className="h-6 w-6 text-blue-500" /> Contraseña
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-blue-500 flex items-center"
              >
                {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
              </button>
            </div>

            <div className="relative mb-4 overflow-hidden">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`peer w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 top-3 text-gray-500 text-base flex items-center gap-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
              >
                <LockClosedIcon className="h-6 w-6 text-blue-500" /> Confirmar Contraseña
              </label>
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
          {/* Beneficio 1 */}
          <div className="flex flex-col">
            <div>
              <h3 className="text-[#FFBA08] font-bold text-lg mb-2">
                Registro y creación del perfil personal
              </h3>
              <p className="text-gray-600">
                Loren, ipsum dolor sit amet, consectettieradolscing etit Loren, 1psum dc4or sit met consectetuer adlpiscing elit Aenean commode ligula eget dole.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <FaCheck className="text-[#2C395B] text-7xl" />
            </div>
          </div>

          {/* Beneficio 2 */}
          <div className="flex flex-col">
            <div>
              <h3 className="text-[#FFBA08] font-bold text-lg mb-2">
                Guardar oportunidades
              </h3>
              <p className="text-gray-600">
                Loren, ipsum dolor sit amet, consectettieradolscing etit Loren, 1psum dc4or sit met consectetuer adlpiscing elit Aenean commode ligula eget dole.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <FaCheck className="text-[#2C395B] text-7xl" />
            </div>
          </div>

          {/* Beneficio 3 */}
          <div className="flex flex-col">
            <div>
              <h3 className="text-[#FFBA08] font-bold text-lg mb-2">
                Recomendaciones personalizadas
              </h3>
              <p className="text-gray-600">
                Loren, ipsum dolor sit amet, consectettieradolscing etit Loren, 1psum dc4or sit met consectetuer adlpiscing elit Aenean commode ligula eget dole.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <FaCheck className="text-[#2C395B] text-7xl" />
            </div>
          </div>

          {/* Beneficio 4 */}
          <div className="flex flex-col">
            <div>
              <h3 className="text-[#FFBA08] font-bold text-lg mb-2">
                Contenido exclusivo
              </h3>
              <p className="text-gray-600">
                Loren, ipsum dolor sit amet, consectettieradolscing etit Loren, 1psum dc4or sit met consectetuer adlpiscing elit Aenean commode ligula eget dole.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <FaCheck className="text-[#2C395B] text-7xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}