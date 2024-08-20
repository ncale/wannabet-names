"use client";

import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useCurrentName } from "@/lib/hooks";
import { Address } from "viem";

export default function ViewSubnameSection() {
  const { address } = useAccount();
  const { data, isLoading, isError, isSuccess } = useCurrentName(address);

  return (
    <section className="flex items-end justify-between">
      <RefreshNameButton address={address} />
      <div className="text-2xl font-semibold">
        {isLoading && "Loading..."}
        {isError && "No record found"}
        {isSuccess && `${data.name}.wannabet.eth`}
      </div>
    </section>
  );
}

function RefreshNameButton({ address }: { address?: Address }) {
  const queryClient = useQueryClient();

  return (
    <div className="flex items-center space-x-2">
      <Button
        size="icon"
        variant="outline"
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["current-subname", address],
          });
        }}
      >
        <ReloadIcon />
      </Button>
      <div>Current record:</div>
    </div>
  );
}
