import ButtonRedirect from "@/app/components/ButtonRedirect";
import { ModeToggle } from "@/components/mode-tongle";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  // const isAuth = false;
  // if (!isAuth) {
  //   redirect("/login");
  // }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <ButtonRedirect />
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <ModeToggle/>
        </li>
      </ul>
    </div>
  );
}
