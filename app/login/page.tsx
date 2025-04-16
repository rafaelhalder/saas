import { handleAuth } from "../actions/handle-auth"

export default function Login() {
  return(
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Login</h1>
      <form action={handleAuth}>
        <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer">Login with Google</button>
      </form>
    </div>
  )
}