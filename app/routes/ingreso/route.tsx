import FormLogin, { action as formLoginAction } from "./formLogin";

export const action = formLoginAction;

export default function ingresoLayout() {
  return (
    <div>
      <FormLogin />
    </div>
  );
}