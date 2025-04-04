import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { tokenCookie } from "~/utils/cookies";
import "./tailwind.css";
import { lazy, Suspense } from "react";
import LoadingComponent from "./components/Loading.component";

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || null;

  return json({ isAuthenticated: !!token });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<{ isAuthenticated?: boolean }>() || {};
  const isAuthenticated = data.isAuthenticated ?? false;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#fafafa]">
        <Suspense fallback={<LoadingComponent />}>
          <Navbar isAuthenticated={isAuthenticated} />
        </Suspense>

        {children}
        <ScrollRestoration />
        <Scripts />
        <Suspense fallback={<LoadingComponent />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}