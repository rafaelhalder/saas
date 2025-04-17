import { auth } from "../lib/auth"
import { handleAuth } from "../actions/handle-auth";
import Link from "next/link";
export default async function Dashboard() {
const session = await auth();
  return(
    <div className="flex h-screen items-center gap-10 justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Protected Dashboard</h1>
      <p>Email do usuario: {session?.user?.email ? session?.user?.email : "Usuario não encontrado"}</p>
      {session?.user?.email &&(
      <form action={handleAuth}>
        <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer">Logout</button>
      </form>
      )}
      <Link href="/pagamentos">Pagamentos</Link>
    </div>
  )
}