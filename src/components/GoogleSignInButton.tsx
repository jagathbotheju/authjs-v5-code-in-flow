// import Image from "next/image";
import { Button } from "./ui/button";
import { signIn } from "@/auth";

const GoogleSignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="w-full mb-3" variant="secondary">
        {/* <div className="relative mr-2">
          <Image
            alt="logo"
            src="/images/google-icon.svg"
            className="top-0 left-0 relative"
            width={20}
            height={20}
          />
        </div> */}
        Google
      </Button>
    </form>
  );
};

export default GoogleSignInButton;
