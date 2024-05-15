"use server";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { SettingsSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const loginGoogle = async (callbackUrl: string | undefined) => {
  await signIn("google", { redirectTo: callbackUrl ? callbackUrl : "/" });
};

export const loginGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const updateProfile = async (
  values: z.infer<typeof SettingsSchema>,
  id: string
) => {
  try {
    const valid = SettingsSchema.safeParse(values);
    if (!valid) {
      return {
        success: false,
        error: "Invalid data found.",
      };
    }

    const { name } = values;
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: { name },
    });

    if (updatedUser) {
      revalidatePath("/");
      return {
        success: true,
        message: "User profile updated successfully",
      };
    }

    return {
      success: false,
      error: "Could not update profile, please try later",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error, updating profile",
    };
  }
};
