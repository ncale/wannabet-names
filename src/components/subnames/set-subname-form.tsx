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
import { useAccount } from "wagmi";
import { abbreviateHex } from "@/lib/utils";
import {
  subnameFormSchema,
  type SubnameFormType,
} from "@/lib/types/subname-form";
import { signMessage } from "@wagmi/core";
import { config } from "@/wagmi";
import { ApiBodyType } from "@/lib/types/subname-api-body";

export default function SetSubnameForm() {
  const form = useForm<SubnameFormType>({
    resolver: zodResolver(subnameFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { address } = useAccount();

  async function onSubmit(values: SubnameFormType) {
    try {
      console.log("submitting...", values);
      if (!address) return;

      const message =
        "I want to claim the provided subname for wannabet.eth: " + values.name;
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
      console.log("response", res);
      if (!res.ok) {
        const error = await res.json();
        console.error("error", error);
        return;
      }
    } catch (error) {
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
              <FormLabel>Subname</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormDescription>
                This name will resolve to the following connected address:{" "}
                {abbreviateHex(address, 4)}
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
