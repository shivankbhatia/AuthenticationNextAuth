import LoginForm from "@/components/loginform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import DarkModeToggle from "@/components/darkmodetoggle";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* <DarkModeToggle /> */}
      <LoginForm />
    </main>
  );
}
