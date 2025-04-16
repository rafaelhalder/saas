import Link from "next/link";
export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Landing Page</h1>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
