/**
 * Realiza la solicitud de inicio de sesión a la API.
 * @param {string} correo - Correo del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<Object>} - Datos del usuario autenticado.
 */
export async function login(correo: string, password: string): Promise<{ token: string }> {
  try {
    const response = await fetch("http://localhost:5281/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: correo, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud de inicio de sesión:", error);
    throw new Error("Error de conexión con la API");
  }
}
