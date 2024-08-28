"use client";

// Hooks
import { useAccount } from "wagmi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";

// Lib
import { signMessage } from "@wagmi/core";
import { config } from "@/wagmi";
import type { ApiClaimBodyType } from "@/lib/types/api-claim-body";
import { toast } from "sonner";
import ConnectButton from "@/components/connect-button";

/**
 * This button assumes schema validation has already been
 * performed on the name.
 */

export default function ClaimButton({
  name,
}: // address,
{
  name: string;
  // address?: Address;
}) {
  const { address } = useAccount();

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      console.log("submitting...");
      if (!address) throw new Error("No address provided");

      const seed = Math.random().toString(16).substring(2, 10);
      const message = `I want to claim the subname: ${name}.wannabet.eth\n\nseed: ${seed}`;
      const signature = await signMessage(config, { message });
      const body = {
        name: name,
        address: address,
        message,
        signature,
      } satisfies ApiClaimBodyType;

      const res = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error);
    },
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["current-subname", address] });
      router.refresh();
      toast.success("Name claimed successfully!");
    },
    onError: (error) => {
      console.error("error");
      console.error(error);
      toast.error("Failed to claim name");
    },
  });

  return (
    <div className="flex flex-col items-center space-y-1">
      {!address ? (
        <ConnectButton />
      ) : (
        <Button onClick={() => mutate()} size="lg" disabled={isPending}>
          {isPending ? "Claiming..." : "Claim"}
        </Button>
      )}
      <p className="pt-1 font-semibold text-red-600">{error && error.message}</p>
    </div>
  );
}
