import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import type { NameStoneUser } from "./namestone";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useCurrentName() {
  const { address } = useAccount();
  return useQuery({
    queryKey: ["current-subname", address],
    queryFn: async () => {
      const res = await fetch(`/api/get/${address}`);
      const data = await res.json();
      return data.data as NameStoneUser;
    },
    enabled: !!address,
    // staleTime: Infinity,
    // gcTime: Infinity,
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

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
