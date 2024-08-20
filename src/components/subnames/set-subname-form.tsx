"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { subnameFormSchema, type SubnameFormType } from "./subname-schema";
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

export default function SetSubnameForm() {
  // 1. Define your form.
  const form = useForm<SubnameFormType>({
    resolver: zodResolver(subnameFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { address } = useAccount();

  // 2. Define a submit handler.
  function onSubmit(values: SubnameFormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
