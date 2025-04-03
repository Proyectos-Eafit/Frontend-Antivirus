import { Outlet } from "@remix-run/react";
import Oportunidades from "../components/Oportunidades";

export default function Index() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      <Oportunidades />
    </div>
  );
}
