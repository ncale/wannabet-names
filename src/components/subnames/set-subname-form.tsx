"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { abbreviateHex } from "@/lib/utils";
import {
  subnameFormSchema,
  type SubnameFormType,
} from "@/lib/types/subname-form";
import { signMessage } from "@wagmi/core";
import { config } from "@/wagmi";
import { ApiBodyType } from "@/lib/types/subname-api-body";
import { Address } from "viem";
import { useQueryClient } from "@tanstack/react-query";

export default function SetSubnameForm({
  address,
  defaultValues,
}: {
  address?: Address;
  defaultValues: SubnameFormType;
}) {
  const queryClient = useQueryClient();

  const form = useForm<SubnameFormType>({
    resolver: zodResolver(subnameFormSchema),
    defaultValues,
  });

  async function onSubmit(values: SubnameFormType) {
    try {
      console.log("submitting...", values);
      if (!address) return;

      const message = `I want to claim the provided subname: ${values.name}.wannabet.eth`;
      const signature = await signMessage(config, { message });
      const body: ApiBodyType = {
        name: values.name,
        address: address,
        message,
        signature,
      };

      const res = await fetch("/api/subname", {
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
      form.reset();
      console.log("success");
    } catch (error) {
      if (error instanceof Error) {
        form.setError("name", {
          message: `An error occurred: ${error.message}`,
        });
      }
      console.error("error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, console.log)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What name do you want to claim? *</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormDescription>
                This name will resolve to the following connected address:{" "}
                {abbreviateHex(address, 4)}
              </FormDescription>
              <FormDescription>
                * Note: This action will revoke any existing subname you have
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
