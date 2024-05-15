import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/login?callbackUrl=/admin");
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="container mx-auto">
        <div className="mt-10 bg-red-100 rounded-md flex flex-col gap-5 p-10">
          <p className="text-2xl font-semibold">Not Authorized</p>
          <Link href="/" className={`${buttonVariants()} w-fit`}>
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-10">Admin</h1>
    </div>
  );
};

export default AdminPage;
