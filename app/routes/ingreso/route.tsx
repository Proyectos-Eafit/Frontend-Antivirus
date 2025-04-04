import FormLogin, { action as formLoginAction } from "./formLogin";

export const action = formLoginAction;

export default function IngresoPage() {
  return (
    <div>
      <FormLogin />
    </div>
  );
}