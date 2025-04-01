import { redirect } from "@remix-run/node";
import { tokenCookie } from "~/utils/cookies";

// Loader para GET: redirige a "/ingreso"
export const loader = async () => {
  return redirect("/ingreso");
};

// Action para POST: elimina la cookie y redirige
export const action = async () => {
  return redirect("/ingreso", {
    headers: {
      "Set-Cookie": await tokenCookie.serialize("", { maxAge: 0 }),
    },
  });
};
