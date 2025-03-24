import { createCookie } from "@remix-run/node";
export const tokenCookie = createCookie("token", {
 httpOnly: true,
 secure: process.env.NODE_ENV === "production",
 sameSite: "lax",
 path: "/",
});
