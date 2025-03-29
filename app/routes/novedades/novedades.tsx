import { json, redirect } from "@remix-run/node";
import { tokenCookie } from "~/utils/cookies";
import Oportunidades from "~/components/Novedades";

import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = await tokenCookie.parse(cookieHeader);
  if (!token) return redirect("/ingreso");
  return json({ isAuthenticated: true });
};

export default function OportunidadesRoute() {
  return <Oportunidades />;
}
