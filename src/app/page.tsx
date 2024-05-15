import ClientUser from "@/components/ClientUser";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className="flex flex-col items-center gap-6 px-3 py-10">
      <h1 className="text-center text-4xl font-bold">Next-Auth V5 Tutorial</h1>
      <h2 className="text-center text-2xl font-semibold">Users</h2>

      <div className="mt-10 gap-5">
        {users.map((user) => (
          <Link
            href={`/user/${user.id}`}
            key={user.id}
            className="font-semibold text-lg hover:underline"
          >
            {user.name}
          </Link>
        ))}
      </div>
      <ClientUser />
    </main>
  );
}
