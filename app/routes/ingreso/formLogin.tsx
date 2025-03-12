import { useNavigate } from "@remix-run/react";

export default function FormLogin() {
  const navigate = useNavigate();

  return (
    <div>
        {/* en vez del div va un form con su logica de ingreso desde el servidor */}
      <div>
        <div>
            <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" />
        </div>
        <div>
        <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password"/>
        </div>
        <div>
          <button onClick={() => navigate("/admin")}>ingresar</button>
        </div>
      </div>
    </div>
  );
}
