import RegisterForm from "@/app/(auth)/register/register-form";
import { ModeToggle } from "@/components/mode-tongle";

export default function LoginPage() {
  return (
    <div>
      <ModeToggle />
      <RegisterForm/>
      Đăng ký
    </div>
  );
}
