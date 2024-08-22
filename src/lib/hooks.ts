import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import type { NameStoneUser } from "./namestone";
import { useEffect, useState } from "react";

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

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
