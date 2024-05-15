import { z } from "zod";

export const SettingsSchema = z.object({
  name: z.string().min(1, "name is required"),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "e-mail is required")
    .email("please enter valid email address"),
  password: z
    .string()
    .min(1, "password is required")
    .min(6, "password must be at least 6 characters"),
});
