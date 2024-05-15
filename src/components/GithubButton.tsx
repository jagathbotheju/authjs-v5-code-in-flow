"use server";

import { signIn } from "@/auth";
import Image from "next/image";
import { Button } from "./ui/button";

const GithubButton = () => {
  return (
    <form
      action={async () => {
        await signIn("github");
      }}
    >
      <Button type="submit" className="w-full mb-3" variant="secondary">
        <div className="relative mr-2">
          <Image
            alt="logo"
            src="/images/google-icon.svg"
            className="top-0 left-0 relative"
            width={20}
            height={20}
          />
        </div>
        Github
      </Button>
    </form>
  );
};

export default GithubButton;
