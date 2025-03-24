import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { tokenCookie } from "app/utils/cookies";
import loginImage from "../../assets/images/login.svg";

// Action function para validar y guardar la cookie del token
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }

  const response = await fetch("http://localhost:5281/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    return json({ error: "Credenciales incorrectas" }, { status: 401 });
  }
  const data = await response.json();
  const token = data.token.replace(/['"]+/g, "");
  return redirect("/admin", {
    headers: { "Set-Cookie": await tokenCookie.serialize(token) },
  });
};

export default function FormLogin() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="md:w-1/2 flex justify-center">
        <img src={loginImage} alt="Login" className="w-3/4 md:w-full" />
      </div>
      <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-welcome">Bienvenido a tu</h1>
        <h2 className="text-bank">Banco de Oportunidades</h2>
        <Form method="post">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="********"
            />
          </div>
          {actionData?.error && <p className="text-red-500 mb-4">{actionData.error}</p>}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-black">
              <input type="checkbox" className="mr-2" name="remember" />
              Recordarme
            </label>
            <a href="#" className="text-custom-color hover:underline">Olvidé mi contraseña</a>
          </div>
          <button
            type="submit"
            className="w-full bg-custom-color text-white py-2 px-4 rounded hover:bg-custom-color"
          >
            Login
          </button>
        </Form>
        <p className="text-center mt-4">
          ¿No tienes una cuenta? <a href="/registro" className="text-custom-color hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
