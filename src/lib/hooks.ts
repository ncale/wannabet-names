import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import type { NameStoneUser } from "./namestone";

export function useCurrentName(address?: Address) {
  return useQuery({
    queryKey: ["current-subname", address],
    queryFn: async () => {
      const res = await fetch(`/api/subname/${address}`);
      const data = await res.json();
      return data.data as NameStoneUser;
    },
    enabled: !!address,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
