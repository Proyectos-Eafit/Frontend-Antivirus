import { json } from "@remix-run/node";
import { login } from "~/services/authService";

export const loader = async () => {
  try {
    // Cambia estos valores por credenciales válidas para la prueba
    const email = "test@example.com";
    const password = "password123";

    const response = await login(email, password);
    return json({ success: true, token: response.token });
  } catch (error) {
    return json({ success: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

export default function TestAuth() {
  return (
    <div>
      <h1>Prueba de Servicio de Autenticación</h1>
      <p>Revisa la respuesta en la consola del navegador o en las herramientas de red.</p>
    </div>
  );
}
