import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { auth, signOut } from "@/auth";
import { Lock, LogOut, Settings } from "lucide-react";
import { buttonVariants } from "./ui/button";

const AuthButton = async () => {
  const session = await auth();
  const user = session?.user as User;

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link
            href={`/profile/${user.id}`}
            className="font-bold underline underline-offset-2 decoration-2 hover:decoration-sky-500"
          >
            {user.name}
          </Link>

          {user.role === "ADMIN" && (
            <Link href="/admin" className={buttonVariants()}>
              ADMIN
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                <AvatarImage
                  src={user.image ? user.image : "/images/blank-profile.svg"}
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 dark:bg-slate-700">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>

              {user.role === "ADMIN" && (
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/admin">
                    <Lock className="mr-2 h-4 w-4" />
                    <span>ADMIN</span>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild className="cursor-pointer">
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <button type="submit">SignOut</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Link className={buttonVariants()} href="/auth/login">
            Log In
          </Link>
          <Link className={buttonVariants()} href="/auth/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButton;
