import { signIn } from "@/auth";
import { Button } from "./ui/button";

const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit">SingIn</Button>
    </form>
  );
};

export default SignInButton;
