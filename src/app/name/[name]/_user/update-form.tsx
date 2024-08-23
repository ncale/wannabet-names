"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { abbreviateHex, isSameAddress } from "@/lib/utils";
import { signMessage } from "@wagmi/core";
import { config } from "@/wagmi";
import type { ApiUpdateBodyType } from "@/lib/types/api-update-body";
import { type UpdateFormType, updateFormSchema } from "@/lib/types/update-form";
import { H1 } from "@/components/headings";
import { Textarea } from "@/components/ui/textarea";
import type { NameStoneUser } from "@/lib/namestone";
import { useAccount } from "wagmi";
import UserAvatar from "./user-avatar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

export default function UpdateForm({ user }: { user: NameStoneUser }) {
  const { address } = useAccount();

  const isUser = useMemo(
    () => (address ? isSameAddress(user.address, address) : false),
    [address, user.address]
  );

  const form = useForm<UpdateFormType>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      avatarUrl: user.text_records.avatar_url || "",
      bio: user.text_records.bio || "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: UpdateFormType) {
    console.log("submitting...", values);
    if (!address) return;

    const message = `I want to update the text records for my subname: ${user.name}.wannabet.eth`;
    const signature = await signMessage(config, { message });
    const body: ApiUpdateBodyType = {
      name: user.name,
      address: address,
      message,
      signature,
      avatarUrl: values.avatarUrl,
      bio: values.bio,
    };

    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const resJson = await res.json();
        throw new Error(resJson.error);
      }

      router.refresh();
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, console.log)}
        className="space-y-2 flex flex-col items-center w-full max-w-md mx-auto"
      >
        <UserAvatar user={user} />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Avatar URL</FormLabel>
              <FormControl>
                <Input
                  disabled={true || !isUser}
                  placeholder="Avatar URL"
                  className="text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <H1 className="pt-4">{user.name}.wannabet.eth</H1>
        <p>Owner: {abbreviateHex(user.address, 4)}</p>
        <div className="w-full space-y-4 pt-6">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">Bio</FormLabel>
                <FormControl>
                  <AutosizeTextarea
                    disabled={!isUser}
                    placeholder="Tell everyone about yourself"
                    className="text-base"
                    minHeight={70}
                    maxHeight={100}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isUser && (
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
