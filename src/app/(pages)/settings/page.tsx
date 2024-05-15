import { auth } from "@/auth";
import SettingsForm from "@/components/SettingsForm";
import { SettingsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async () => {
  const session = await auth();
  const user = session?.user as User;

  if (!user) {
    redirect("/auth/login?callbackUrl=/settings");
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-10">Settings</h1>

      <SettingsForm user={user} />
    </div>
  );
};

export default SettingsPage;
