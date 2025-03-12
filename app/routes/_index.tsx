import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
