import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	// using server-side rendering to get the session
	const session = await auth();

	if (!session) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-10 items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">Protected Dashboard</h1>
			<p>
				{session?.user?.email ? session?.user?.email : "User not authenticated"}
			</p>
			{session.user?.email && (
				<form action={handleAuth}>
					<button
						type="submit"
						className="border rounded-md px-2 hover:cursor-pointer"
					>
						Logout
					</button>
				</form>
			)}
			<Link href="/payments">Payments</Link>
		</div>
	);
}
