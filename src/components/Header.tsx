import Link from "next/link";
import AuthButton from "./AuthButton";

const Header = async () => {
  return (
    <div className="flex items-center justify-between p-5 shadow-md">
      <Link href="/" className="text-3xl font-bold">
        AUTH V5
      </Link>

      <div className="flex gap-5 items-center">
        <AuthButton />
      </div>
    </div>
  );
};

export default Header;
