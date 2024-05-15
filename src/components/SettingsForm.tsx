"use client";
import { SettingsSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { updateProfile } from "@/actions/authActions";
import { toast } from "sonner";

interface Props {
  user: User;
}

const SettingsForm = ({ user }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user && user.name ? user.name : "",
    },
    mode: "all",
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    console.log("values", values);
    updateProfile(values, user.id)
      .then((res) => {
        if (res.success) {
          // router.push("/");
          return toast.success(res.message);
        } else {
          return toast.error(res.error);
        }
      })
      .catch((err) => {
        return toast.error(err.message);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[40%]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
