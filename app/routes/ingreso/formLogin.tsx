// import { json, redirect } from "@remix-run/node";
// import { Form, useActionData } from "@remix-run/react";
// import { tokenCookie } from "app/utils/cookies";
// import { login } from "~/services/authService";
import loginImage from "../../assets/images/login.svg";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Importa los íconos de Google y Facebook
// import { useState, useEffect } from "react";

// Action function para validar y guardar la cookie del token
/*
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }

  try {
    const normalizedEmail = email.toString().toLowerCase();
    const data = await login(normalizedEmail, password.toString());
    const token = data.token.replace(/['"]+/g, "");
    // Obtiene el valor del checkbox "Recordarme"
    const remember = formData.get("remember");
    const cookieOptions = remember ? { maxAge: 60 * 60 * 24 * 30 } : {};
    return redirect("/novedades", {
      headers: {
        "Set-Cookie": await tokenCookie.serialize(token, cookieOptions),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error de conexión con la API";
    return json({ error: errorMessage }, { status: 500 });
  }
};
*/

export default function FormLogin() {
  // const actionData = useActionData<{ error?: string }>();

  // Estados para credenciales y checkbox de "Recordarme"
  /*
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rememberChecked, setRememberChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("rememberedCredentials");
    if (stored) {
      try {
        const creds = JSON.parse(stored);
        if (creds.email) setEmailValue(creds.email);
        if (creds.password) setPasswordValue(creds.password);
        setRememberChecked(true);
      } catch (e) {
        console.error("Error parsing remembered credentials:", e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (rememberChecked) {
      localStorage.setItem("rememberedCredentials", JSON.stringify({ email: emailValue, password: passwordValue }));
    } else {
      localStorage.removeItem("rememberedCredentials");
    }
  };
  */

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
          <form method="post" className="w-full p-4">
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

            {/* Campos del formulario */}
            <div className="relative mb-4 flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo Electrónico"
                className="w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative mb-4 flex items-center">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                className="w-full px-4 py-3 border rounded bg-[#ececec] text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="remember"
                />
                Recordarme
              </label>
              <a href="#" className="text-custom-color hover:underline">Olvidé mi contraseña</a>
            </div>

            <button
              type="submit"
              className="w-3/4 bg-[#FFBA08] text-white py-3 px-5 rounded hover:bg-yellow-500 mx-auto block text-lg"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}