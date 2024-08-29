"use client";

// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Hooks
import { useAccount } from "wagmi";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/headings";
import UploadImageButton from "./upload-image-button";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

// Lib
import { abbreviateHex, isSameAddress } from "@/lib/utils";
import { signMessage } from "@wagmi/core";
import { config } from "@/wagmi";
import { type UpdateFormType, updateFormSchema } from "@/lib/types/update-form";
import type { ApiUpdateBodyType } from "@/lib/types/api-update-body";
import type { NameStoneUser } from "@/lib/namestone";
import { toast } from "sonner";
import UserAvatar from "./user-avatar";
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard";

export default function UpdateForm({ user }: { user: NameStoneUser }) {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const isUser = useMemo(
    () => (address ? isSameAddress(user.address, address) : false),
    [address, user.address],
  );

  const form = useForm<UpdateFormType>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      avatar: user.text_records.avatar || "",
      description: user.text_records.description || "",
    },
  });
  form.watch("avatar");

  const router = useRouter();
  async function onSubmit(values: UpdateFormType) {
    console.log("submitting...", values);
    if (!address) return;

    try {
      const seed = Math.random().toString(16).substring(2, 10);
      const message = `I want to update the text records for my subname: ${user.name}.wannabet.eth\n\nseed: ${seed}`;
      const signature = await signMessage(config, { message });
      const body: ApiUpdateBodyType = {
        name: user.name,
        address: address,
        message,
        signature,
        avatar: values.avatar,
        description: values.description,
      };

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

      queryClient.invalidateQueries({ queryKey: ["current-subname", address] });
      router.refresh();
      toast.success("Records updated successfully!");
    } catch (error) {
      toast.error("Record update failed. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, console.log)}
        className="mx-auto flex w-full max-w-md flex-col items-center"
      >
        <UserAvatar user={user} urlOverride={form.getValues("avatar")} />

        <div className="mt-4">
          <UploadImageButton
            setUrl={(url: string) => {
              form.setValue("avatar", url, { shouldDirty: true });
            }}
            disabled={!isUser}
          />
        </div>

        <div className="mt-3 flex flex-col items-center space-y-1">
          <H1>{user.name}.wannabet.eth</H1>

          <CopyToClipboard>{abbreviateHex(user.address, 10)}</CopyToClipboard>
        </div>

        <div className="w-full space-y-4 pt-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Bio</FormLabel>
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
